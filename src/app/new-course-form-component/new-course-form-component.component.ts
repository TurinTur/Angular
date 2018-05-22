import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'new-course-form-component',
  templateUrl: './new-course-form-component.component.html',
  styleUrls: ['./new-course-form-component.component.css']
})
export class NewCourseFormComponentComponent{

  form = new FormGroup({
    topics: new FormArray([])       // array de form controls, se insertan abajo
  });

  addTopic(topic: HTMLInputElement){    //el tipo realmente no hace falta, se ha puesto para que quede claro que es topic
      if (topic.value != "")
         this.topics.push(new FormControl(topic.value))     //se castea a FormArray porque si no, no tenemos el push
      topic.value='';
  }

  get topics() {                                      //getter opcional
    return this.form.get('topics')  as FormArray
  }

  removeTopic(topic: FormControl) {
      let index= this.topics.controls.indexOf(topic);   //tengo que meterme en .controls. para encontrar el topic exacto dentro del array
      this.topics.removeAt (index);                     //pero una vez sé el numero, puedo borrar directamente desde el array
  }

  constructor(fb: FormBuilder ){      // Form Builder sirve para cosnstruir forms de una forma un poco mas ligera, sin new formGroup, new formArray, etc:
    fb.group({
        name: ['', Validators.required],
        contact: fb.group({
            email: [],
            phone: []
        }),
        topics: fb.array([])
    });
  }
}
