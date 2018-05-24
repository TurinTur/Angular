import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
//import 'rxjs/add/operator/catch';       // Necesario para importar el catch. Tuve que ejecutar npm install rxjs@6 rxjs-compat@6 --save para que funcionase
import { catchError, map, retry  } from 'rxjs/operators';  //Cambiado en version 6, ahora se hace asi.
import { Observable, throwError } from 'rxjs';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { BadInputError } from '../common/bad-input';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  constructor(private url: string,private http: Http) {}

  getAll(){
      return this.http.get(this.url)           // HTTP.GET
      //.pipe(catchError(this.handleError));
      .pipe(
        map(response => response.json()),  // Map es un operador para transformar los resultados de un observable. ahora en vez de pasar un response que
        catchError(this.handleError),      // es de observable, le paso algo mas sencillo, el json.
        
      )
      
  }


  create (resource){
    return this.http.post(this.url, JSON.stringify(resource))
    .pipe(
      map(response => response.json()),
      catchError(
        (this.handleError)
        )
    );
  }

  update (resource){
    return this.http.patch(this.url+"/" + resource.id, JSON.stringify(resource))
    .pipe(map(response => response.json()),
          catchError(this.handleError));
  }

  delete (id) {
    return  this.http.delete(this.url+"/" + id)
    .pipe(
      map(response => response.json()),
      catchError(this.handleError));          // Ahora el Error lo manejo aparte en handleError, abajo
  }

  deleteWithPromise (id){                         // Solo un ejemplo de como se convierte un observable a una promesa
    return  this.http.delete(this.url+"/" + id)   // Promesas se ejecutan inmediatamente, observables esperan hasta que haya un .subscribe()
    .pipe(
      map(response => response.json()),
      retry(3),                                   // ej de otro operador util, retry, que reintentará la operación él solo si falla
      catchError(this.handleError)).toPromise();
  }

  private handleError (error:Response){
      console.log(error.json());
    if (error.status === 400 )
      return throwError(new BadInputError());
    if (error.status === 404 ){
      return throwError(new NotFoundError());           // forma nueva en rxjs 6
    }
    return throwError(new AppError(error));
    }

}
