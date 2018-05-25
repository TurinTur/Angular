import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
import { catchError, map, retry  } from 'rxjs/operators';  //Cambiado en version 6, ahora se hace asi.
import { Observable, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable(
 
)
export class AuthService {
 
  constructor(private http: Http, private jwtHelper: JwtHelperService) {}  //uso una libreria llamada @auth0/angular-jwt

  get currentUser(){
    let token = localStorage.getItem('token');
    if (!token) return null;

    return this.jwtHelper.decodeToken(token);
  }

  login(credentials)  {
    return this.http.post('/api/authenticate', JSON.stringify(credentials))
    .map(response => {
      //console.log(response.json());   //recibiremos el JWT hardcodeado en fake-backend.ts, o null si el login es incorrecto
      let result = response.json();
      if (result && result.token){        // si fue exitoso y tiene una propiedad especificamente llamada token...
        localStorage.setItem('token', result.token);         // guardamos el JWT en el almacenamiento local del navegador (JS)
        return true;                      // Map: mapea del tipo response al tipo boolean
      }
      return false
    });
  }

  logout () {
    localStorage.removeItem('token');    // eliminamos el JWT del local storage
  }

  isLoggedIn() {
    //let jwtHelper = new JwtHelperService();   
    let token =localStorage.getItem('token');
    /*
    if (!token){
      console.log("sin token");
      return false;
    }
      
    //console.log(this.jwtHelper.decodeToken(token));
    //console.log(!this.jwtHelper.isTokenExpired(token));
    return !this.jwtHelper.isTokenExpired(token);       // Si el token no tiene expiration date, da false. Debería ser !jwtHelper.istokenExpired, depende de si el token está expirado o no
    */

    return token != null && !this.jwtHelper.isTokenExpired(token);   //forma abreviada
  }


}
