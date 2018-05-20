import {Component} from '@angular/core';
import { CoursesService } from './courses.services';

@Component ({           // decorator
    selector: 'courses',  // <courses> => selector sería "courses". <div class="courses"> => seria ".courses". <div id="courses"> => "#courses"
    //template: '<h2>{{"Title: " + title + " " + getTitle()}}</h2>'      //Interpolación. Se puede poner JS basico
    template: `
            <h2> {{ title}}</h2>                        <!-- Interpoloación de text es traducida en compilación a prop. binding -->
            <h2 [textContent]="title"></h2>             <!-- Esto es lo mismo que arriba, pero no se suele usar porque es mas largo. TextContext es prop de DOM -->
            <img [src]="imgUrl"/>                        <!-- PROPERY BINDING -->
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

            <input (keyup)="onKeyUp($event)"/>
            <input (keyup.enter)="onKeyUpFiltro()"/>            <!-- Usando filtro de eventos -->
            <br>
            <input #email (keyup.enter)="onKeyUpTemplate(email.value)" />   <!-- template variable. #email asocial el input a una var llamada email -->
            <input [(ngModel)]="email2" (keyup.enter)="onKeyUpTwoWay()" /> <!-- TWO WAY BINDING -->
            <br/>
            {{ course.title | uppercase | lowercase }}  <br/>        <!-- PIPES se pueden encadenar -->
            {{ course.students  }}          <br/>                    <!-- number: le pone una coma -->
            {{ course.rating | number:'1.2-2' }}     <br/>           <!-- pipes con argumento, minimo y maximo de 2 decimales -->
            {{ course.price | currency:'EUR':symbol:'3.2-2'}} <br/>  <!--  por defecto es $ -->
            {{ course.releaseDate | date:'shortDate' }} <br/>
            {{ text  | summary:11 }}
            ` 

})
export class CoursesComponent {
    title ="List of courses";
    imgUrl = "https://www.google.es/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png";
    courses;
    colspan=2;
    isActive=true;
    email2 = "me@expample.com";
    text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

    course = {
        title: "The complete Angular Course",
        rating: 8.3212,
        students: 33.1,
        price: 183.33,
        releaseDate: new Date(2018,1,1)
    }


    constructor (service: CoursesService){                   //
        //let service = new CoursesService();                // esto está mal, no estamos usando iny. dependencias. 
        this.courses = service.getCourses();
    }

    getTitle (){
        return this.title;
    }

    onSave ($event) {                                   // $event es un objeto de JS estándar con toda la info del evento
        $event.stopPropagation();                       // método que evita que el evento siga emitiendose, pasando por toda la estructura DOM
        console.log ("Button was clicked", $event);
        console.log ("value", $event.target.value);     // valor que se ha escrito
    }

    onKeyUp($event) {
        if ($event.keyCode===13) console.log("Enter was pressed");      // forma tradicional de filtrar un evento (segun el keycode)
    }

    onKeyUpFiltro(){
        console.log("Enter was pressed");
    }

    onKeyUpTemplate(email){
        console.log("Email " + email);
    }

    onKeyUpTwoWay(){
        
        console.log("Email " + this.email2);
    }
}
