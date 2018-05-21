import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-directive',
  templateUrl: './directive.component.html',
  styleUrls: ['./directive.component.css']
})
export class DirectiveComponent {

  constructor() { }
  
  title = 'app';
  post = {
    title: "Title",
    isFavorite: false
  }
  courses = [1,2];
  viewMode = 'map';



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

  canSave =false;

  task={
    title: 'review applications',
    asignee: {
      name: null      //Safe Traversal Operator test
    }
  }
}
