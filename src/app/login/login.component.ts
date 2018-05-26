import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidLogin : boolean;

  constructor(private router: Router, private AuthService: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  signIn (credentials){
    this.AuthService.login(credentials)   //utilizo mi servicio de auth para logearme
      .subscribe( result => {             // me subsccribo a su respuesta (era realmente la respuesta de un http.post, ahora mapeada a boolean)
        if (result) {
          //this.router.navigate(['/']);
          let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');  // uso snapshot aqui porque no voy a tener un botón o enlace que navegue a la misma pagina, si no tendria que hacer un subscribe
          this.router.navigate([returnUrl || '/']);       //ir a returnUrl, o a la pagina de inicio si no hay returnUrl
        }
          
        else
          this.invalidLogin= true;
      })
  }
}
