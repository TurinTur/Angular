import { PostDataService } from './../services/post-with-data.service';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { BadInputError } from '../common/bad-input';

@Component({
  selector: 'posts-optimistic',
  templateUrl: './posts-optimistic.component.html',
  styleUrls: ['./posts-optimistic.component.css']
})

// Clase basada en 'posts-with-service' pero con optimistic updates en vez de pessimistic
export class PostsOptimisticComponent implements OnInit {

  posts: any[];

  ngOnInit(): void {
      this.service.getAll()
      .subscribe(
        posts => this.posts = posts                 // v. nueva. recibe solo el json.
        );                                // He quitado la sección de error porque ahora lo manejo con AppErrorHandler

  }

  constructor(private service: PostDataService) {       //private ya lo transforma en una propiedad privada de la clase
    }

  createPost(input : HTMLInputElement){
     let post = { title: input.value};
     this.posts.splice(0,0,post);         //el nuevo post es puesto en el array directamente, sin esperar
     input.value = '';

     this.service.create(post)      // HTTP.POST (CREACION)
      .subscribe ( newPost => {
         post['id'] = newPost.id;
         console.log(newPost) ;
       }, (error: AppError) => {
         this.posts.splice(0,1);         // Si falló, tenemos que hacer un rollback, borrando el primero elemento

         if (error instanceof BadInputError){
           alert('Error 400 ' + error.originalError);
         }
         else throw error;  //re-throw error, llegará a app-error-handler (que es el error handler global)
      });
  }

  updatePost (post ){
     let element= { isRead: true};
     this.service.update(post)
      .subscribe ( updatedPost => {
          console.log(updatedPost);                // ahora recibo el objeto json directamente
       });
  }

  deletePost (post) {                               // Manejamos los errores ahora en el servicio post
    let index = this.posts.indexOf(post);
    this.posts.splice(index,1);

    this.service.delete(post.id)                    // HTTP.DELETE   borrar post.id y poner un numero > 100 para que falle
    .subscribe ( null, (error:AppError) => {        // en vez de poner () =>, se puede poner null
      this.posts.splice(index,0,post);              // rollback
       if (error instanceof NotFoundError ){
         alert('This post has been deleted already.')
       }
       else
       {
          throw error;
       }
    });
  }

  deletePostPromise (post) {                    // Solo un ejemplo de como se convierte un observable a una promesa
    let index = this.posts.indexOf(post);
    this.posts.splice(index,1);

    this.service.deleteWithPromise(post.id);    //funciona directamente

  }
}
