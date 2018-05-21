import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {

  formSignup = new FormGroup({          //vamos a crear por código una estructura de formulario mediante formGroup y formControl, en vez de usar ngModel. 
    username: new FormControl('',[
      Validators.required,
      Validators.minLength(4)
    ]),  //JS hint: si el nombre tuviese algun caracter raro, como user-name, habría que poenrlo entre literales: 'user-name'
    password: new FormControl('', Validators.required)
  })
 
  get username(){
    return this.formSignup.get('username');   //propiedad creada para simplicar el codigo de la validación en el template
  }


}
