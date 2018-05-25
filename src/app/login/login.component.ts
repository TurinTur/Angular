import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidLogin : boolean;
  constructor(private router: Router, private AuthService: AuthService) { }

  ngOnInit() {
  }

  signIn (credentials){
    this.AuthService.login(credentials)   //utilizo mi servicio de auth para logearme
      .subscribe( result => {             // me subsccribo a su respuesta (era realmente la respuesta de un http.post, ahora mapeada a boolean)
        if (result) 
          this.router.navigate(['/']);
        else
          this.invalidLogin= true;
      })
  }
}
