import { PostService } from './../services/post.service';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { BadInputError } from '../common/bad-input';

@Component({
  selector: 'app-posts-service',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsWithServiceComponent implements OnInit {   // tecnicamente la clase no necesita implements onInit para que ngOnInit funcione, solo es para que el compilar lo compruebe

  posts: any[];


  ngOnInit(): void {
      this.service.getPosts()
      .subscribe(response => {
        this.posts = response.json();
      //console.log(response.json());
     });                                // He quitado la sección de error porque ahora lo manejo con AppErrorHandler
     /*,error => {                                    // manejo de errores inesperados
       alert('An unexpected error ocurred.');
       console.log(error);  //deberia subirse al servidor
     });*/
  }

  constructor(private service: PostService) {       //private ya lo transforma en una propiedad privada de la clase
    }

  createPost(input : HTMLInputElement){
     let body = { title: input.value};
     input.value = '';
     this.service.CreatePost(body)      // HTTP.POST (CREACION)
      .subscribe ( response => {
        //body.id = response.json().id;     // este sitio web no hace lo normal (devolverte el objeto entero), solo la id. Pero nuestro body no tiene id en nuestra declaración,
        body['id'] = response.json().id;    // se puede arreglar poniendo arriba let body: any ó... llamando id asi. id así se agrega como nuevo key/value
        this.posts.splice(0,0,body);
        console.log(response.json()) ;
        console.log(body);
       }, (error: AppError) => {
         if (error instanceof BadInputError){
           //this.form.setErrrors(error.originalError());    //Esto es lo que haríamos si tuviesemos un form
          alert('Error 400 ' + error.originalError);
         }
         else {
          throw error;  //re-throw error, llegará a app-error-handler (que es el error handler global)
         }

      });
  }

  updatePost (post ){
     let element= { isRead: true};
     this.service.UpdatePost(post,element)
      .subscribe ( response => {
          console.log(response.json());
       });
       /*, error => {
        alert('An unexpected error ocurred.');
        console.log(error);  //deberia subirse al servidor
      });*/

    //this.http.put(this.url, JSON.stringify({post}));              // HTTP.PUT envia el objeto entero para actualizarlo en el servidor
  }

  /*deletePost (post) {
    this.service.deletePost(post.id)                    // HTTP.DELETE
    .subscribe ( response => {
        let index = this.posts.indexOf(post);
        this.posts.splice(index,1);
        console.log(response.json());
     }, (error: Response) => {        // lo casteamos a Response para tener acceso a status
       if (error.status === 404 ){    // sin embargo no deberiamos manejar errores de http aqui, si no en el post.service.
         alert('This post has been deleted already.')
       }
       else
       {
        alert('An unexpected error ocurred.');
        console.log(error);  // deberia subirse al servidor
       }
    });
  }*/

  deletePost (post) {                               // Manejamos los errores ahora en el servicio post
    this.service.deletePost(post.id)                    // HTTP.DELETE
    .subscribe ( response => {
        let index = this.posts.indexOf(post);
        this.posts.splice(index,1);
        console.log(response.json());
     }, (error:AppError) => {        // lo casteamos a Response para tener acceso a status
       if (error instanceof NotFoundError ){
         alert('This post has been deleted already.')
       }
       else
       {
          throw error;    //re-throw error, llegará a app-error-handler (que es el error handler global)
       }
    });
  }


}

