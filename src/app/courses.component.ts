import {Component} from '@angular/core';
import { CoursesService } from './courses.services';

@Component ({           // decorator
    selector: 'courses',  // <courses> => selector sería "courses". <div class="courses"> => seria ".courses". <div id="courses"> => "#courses"
    //template: '<h2>{{"Title: " + title + " " + getTitle()}}</h2>'      //Interpolación. Se puede poner JS basico
    template: `
            <h2> {{ title}}</h2>                        <!-- Interpoloación de text es traducida en compilación a prop. binding -->
            <h2 [textContent]="title"></h2>             <!-- Esto es lo mismo que arriba, pero no se suele usar porque es mas largo. TextContext es prop de DOM -->
            <img [src]="imgUrl"/>                        <!-- Property binding -->
            <ul>
                <li *ngFor="let course of courses">                <!-- Directiva for. * indicate que se añaden o eliminan elementos de DOM-->
                    {{ course}}
                </li>
            </ul>
            <table>
                <tr>
                    <td [attr.colspan]="colspan"></td>      <!-- Colspan no existe en DOM, asi que no se puede modificar directamente. Indicamos que es un atributo de elemento html con attr. para hacerlo -->
                </tr>
            </table>
            <button class="btn btn-primary" [class.active]="isActive">Save</button> <!--CLASS BINDING añade active a clase del botón si la condición es true -->
            <button class="btn btn-primary" [style.backgroundColor]="isActive ? 'blue' : 'white' ">Save2</button>  <!-- STYLE BINDING -->
            <button class="btn btn-primary" (click)="onSave($event)">Save Event</button>     <!-- EVENT BINDING -->
            ` 

})
export class CoursesComponent {
    title ="List of courses";
    imgUrl = "https://www.google.es/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png";
    courses;
    colspan=2;
    isActive=true;
    constructor (service: CoursesService){                   //
        //let service = new CoursesService();                // esto está mal, no estamos usando iny. dependencias. 
        this.courses = service.getCourses();
    }

    getTitle (){
        return this.title;
    }

    onSave ($event) {
        console.log ("Button was clicked");
    }
}
