import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
//import 'rxjs/add/operator/catch';       // Necesario para importar el catch. Tuve que ejecutar npm install rxjs@6 rxjs-compat@6 --save para que funcionase
import { catchError  } from 'rxjs/operators';  //Cambiado en version 6, ahora se hace asi.
import { Observable, throwError } from 'rxjs';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { BadInputError } from '../common/bad-input';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private url='https://jsonplaceholder.typicode.com/posts';

  constructor(private http: Http) {}

  getPosts(){
      return this.http.get(this.url)           // HTTP.GET
      .pipe(catchError((this.handleError)));
  }

  CreatePost (body){
    return this.http.post(this.url, JSON.stringify(body))
    .pipe(
      catchError(
        (this.handleError)
        )
    );
  }

  UpdatePost (post,element){
    return this.http.patch(this.url+"/" + post.id, JSON.stringify(element))
    .pipe(catchError(this.handleError));
  }

  deletePost (id) {
    return  this.http.delete(this.url+"/" + id)
    .pipe(
      catchError(this.handleError));          // Ahora el Error lo manejo aparte en handleError, abajo
      /*catchError(
        (error: Response)=> {                   // Pipe es obligatorio en rxjs 6
          if (error.status === 404 ){
            //return Observable.throw(new NotFoundError());   //forma antigua
            return throwError(new NotFoundError());           // forma nueva en rxjs 6
          }
          else {
            return throwError(new AppError(error));    // tenemos que devolver algun tipo de  observable, porque el componente se espera un observable
          }           //en vez de envia un error http, enviamos un objeto error unico a nuestra app
        }
      )
    )*/
  }

  private handleError (error:Response){
    if (error.status === 400 )
      return throwError(new BadInputError());
    if (error.status === 404 ){
      //return Observable.throw(new NotFoundError());   //forma antigua, rxjs4-5
      return throwError(new NotFoundError());           // forma nueva en rxjs 6
    }
    return throwError(new AppError(error));    // tenemos que devolver algun tipo de  observable, porque el componente se espera un observable
            //en vez de envia un error http, enviamos un objeto error unico a nuestra app
  }

}
