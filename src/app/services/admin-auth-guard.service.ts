import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private router: Router, private AutheService: AuthService) { }

  canActivate() {

      const user = this.AutheService.currentUser;
      if (user && user.admin ) { return true; }   // user &&... porque queremos comprobar que currentUser exista y no sea null, anets de comprobar user.admin

      this.router.navigate(['/no-access']);
      return false;
  }
}
