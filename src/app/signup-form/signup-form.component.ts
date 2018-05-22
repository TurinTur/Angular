import { UsernameValidators } from './username.validators';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {

  formSignup = new FormGroup({          //vamos a crear por código una estructura de formulario mediante formGroup y formControl, en vez de usar ngModel. 
    account: new FormGroup({            // grupo creado para mostrar como funcionan grupos anidados
      username: new FormControl('',[    //JS hint: si el nombre tuviese algun caracter raro, como user-name, habría que poenrlo entre literales: 'user-name'
        Validators.required,
        Validators.minLength(4),
        UsernameValidators.cannotContainSpace,       // custom validator
      ]), 
      // UsernameValidators.shouldBeUnique)       // Async validator en el tercer parámetro!
      password: new FormControl('', Validators.required)
  })
});

  get username(){
    return this.formSignup.get('account.username');   //propiedad creada para simplicar el codigo de la validación en el template
  }

  login(){
    //let isValid= authService.login(this.formSignup.value);      //Comentando porque realmente no tenemos ningún servicio real de auth.
    //if (!isValid){
      this.formSignup.setErrors({
        invalidLogin: true              // Esto va a provocar un mensaje de error siempre
      });    //errors al nivel de form
    //}
  }

}
