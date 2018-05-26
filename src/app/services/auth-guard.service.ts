import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {     // AuthGard es una clase estándar que vigila si alguien puede entrar en una pagina o no

  
  constructor(private authService : AuthService, private router: Router) { }

  canActivate(route, state: RouterStateSnapshot){     //el snapshot contiene la ruta de donde he venido
     if (this.authService.isLoggedIn())   return true;  // Si se cumplen las condiciones necesarias, se devuelve true

      // this.router.navigate(['/login']); si no se cumplen porque el usuario no está logeado, redirigo a /login y devuelvo false

     this.router.navigate(['/login'], {queryParams: { returnUrl: state.url}});   // voy a pasarle por paremtro opcional la url de donde he venido, para redigirgir ahi.          
     return false;
  }
  
}
