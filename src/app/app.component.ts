import { FavoriteChangedEventArgs } from './favorite/favorite.component';
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  //encapsulation: ViewEncapsulation.Emulated // Emulated es por defecto, por lo que no hace falta ponerlo. Encapsulation hace que los estilos se aplican solamente a este componante
})
export class AppComponent {
  title = 'app';
  post = {
    title: "Title",
    isFavorite: false
  }
  courses = [1,2];
  viewMode = 'map';

  /*onFavoriteChanged(isFavorite){                         // con un argumento normal
    console.log("Favorite Changed: ", isFavorite);
  }*/

  /*onFavoriteChanged(eventArgs: {newValue:boolean}){        // con un objeto, especifico el tipo en inline para que el compilador e intellisense lo reconozcan
    console.log("Favorite Changed: ", eventArgs);
  }*/

  onFavoriteChanged(eventArgs: FavoriteChangedEventArgs){    // igual que arriba, pero usando un interface exportado
    console.log("Favorite Changed: ", eventArgs);
  }

  arrayCourses = [
    { id:1, name : 'course1'},
    { id:2, name : 'course2'},
    { id:3, name : 'course3'},
  ]

  onAdd (){
    this.arrayCourses.push({id:4,name:'course4'});
  }

  onRemove(course){
    let index = this.arrayCourses.indexOf(course);
    console.log(index);
    this.arrayCourses.splice(index, 1);
  }

  loadCourses(){                      // cada vez que se cargan los cursos, Angular tiene que recontruir esa parte del DOM, incluso si son los mismos objetos con los mismos valores.
    this.arrayCourses = [             // se puede evitar eso, optimizando el sitio web, con trackBy. ver trackBy: trackCourse en el for del html
      { id:1, name : 'course1'},
      { id:2, name : 'course2'},
      { id:3, name : 'course3'},
    ]
  }

  trackCourse(index, course){
      course ? course.id : undefined;   //como el id es el mismo, el botón loadCourses dejará de re-renderizar la lista de cursos
  }

}
