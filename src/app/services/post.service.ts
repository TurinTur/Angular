import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private url='https://jsonplaceholder.typicode.com/posts';

  constructor(private http: Http) { 


  }

  getPosts(){
      return this.http.get(this.url) ;    // HTTP.GET
  }

  CreatePost (body){
    return this.http.post(this.url, JSON.stringify(body)) 
  }

  UpdatePost (post,element){
    return this.http.patch(this.url+"/" + post.id, JSON.stringify(element)) 
  }

  deletePost (id) {
    return  this.http.delete(this.url+"/" + id)  
  }
}
