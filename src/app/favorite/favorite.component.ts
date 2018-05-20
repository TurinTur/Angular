import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css'],
  inputs: ['isFavorite']              // 2ª forma de hacerlo. no muy recomendable porque se puede romper con una refactorización
})
export class FavoriteComponent implements OnInit {
  @Input('is-favorite') isFavorite: boolean;   // decimos que esta propiedad va a ser accesible como parametro. Es 1 forma de hacerlo
                                                // is-favorite es opcional, es como un alias
  @Output() change = new EventEmitter();      // parametro de salida, se asocia a un evento al cual clases están suscritos (app.component).
  
  constructor() { }

  ngOnInit() {
  }

  onClick(){
    this.isFavorite=!this.isFavorite;
    this.change.emit(this.isFavorite);                // cuando emit se ejecuta, se ejecutará cualquier función asociada, se pasará el argumento como dato del evento
    this.change.emit ({ newValue: this.isFavorite});  //usando un objecto en el argumento
  }

  
}

export interface FavoriteChangedEventArgs {
  newValue: boolean
}