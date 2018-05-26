import { HttpClient } from '@angular/common/http';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class OrderService {

  constructor(private http: Http) {  }
  //constructor(private http: HttpClient) {  }      

  getOrders() {               //Hay una forma mas breve de hace todo esto, con HttpClient, ver https://www.npmjs.com/package/@auth0/angular-jwt "Any requests sent using Angular's 
  // HttpClient will automatically have a token attached as an Authorization header." Pero me interfiere con el fakeBacked que intercepta solamente http, no httpClient, y httpClient.get funciona de forma ligeramente distinta.

    let headers = new Headers();
    let token = localStorage.getItem('token');
    headers.append('Authorization','Bearer '+ token);

    let options = new RequestOptions({ headers: headers});    //hace falta importar Headers de angular/http para que coja bien el tipo

    return this.http.get('/api/orders',options)     //esto no funciona sin el options porque la api espera un auth. header con un token, por eso lo creo arriba
      .map(response => response.json());

    //return this.http.get<tipo>('/api/orders');     
      
  }
}

