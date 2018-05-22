import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent  {

  posts: any[];
  private url='https://jsonplaceholder.typicode.com/posts';

  constructor(private http: Http) {       //private ya lo transforma en una propiedad privada de la clase

    http.get(this.url)                   // HTTP.GET
      .subscribe(response => {
        this.posts = response.json();
        //console.log(response.json());
      });

  }

  createPost(input : HTMLInputElement){    
     let body = { title: input.value};    
     input.value = '';
     this.http.post(this.url, JSON.stringify(body))    // HTTP.POST (CREACION)
      .subscribe ( response => {
        //body.id = response.json().id;     // este sitio web no hace lo normal (devolverte el objeto entero), solo la id. Pero nuestro body no tiene id en nuestra declaración, 
        body['id'] = response.json().id;    // se puede arreglar poniendo arriba let body: any ó... llamando id asi. id así se agrega como nuevo key/value
        this.posts.splice(0,0,body);
        console.log(response.json()) ;
        console.log(body);
       });   
  }

  updatePost (post ){
    this.http.patch(this.url+"/" + post.id, JSON.stringify({ isRead: true}))  // HTTP.PATCH solo modifica parte de un objeto que ya está en el servidor (solo esta prop isRead)
      .subscribe ( response => {
          console.log(response.json());
       });   
    
    //this.http.put(this.url, JSON.stringify({post}));              // HTTP.PUT envia el objeto entero para actualizarlo en el servidor
  }

  deletePost (post) {
    this.http.delete(this.url+"/" + post.id)                       // HTTP.DELETE 
    .subscribe ( response => {
        let index = this.posts.indexOf(post);
        this.posts.splice(index,1);
        console.log(response.json());
     });   
  }
}

