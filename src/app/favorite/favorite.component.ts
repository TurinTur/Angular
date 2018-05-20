import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  //template: '',                                       // hay que usar una forma de template o la otra, no ambas
  styleUrls: ['./favorite.component.css'],            // 1ª forma de añadir css, con este array
  styles: [``],                                       // 2ª forma de añadir css, directamente entre ``. el que tiene prioridad es el último que se ejecuta (styles, en este caso)
    inputs: ['isFavorite']              // 2ª forma de añadir un input. no muy recomendable porque se puede romper con una refactorización
})
export class FavoriteComponent {
  @Input('is-favorite') isFavorite: boolean;   // decimos que esta propiedad va a ser accesible como parametro. Es 1 forma de hacerlo
                                                // is-favorite es opcional, es como un alias, igual que 'change' abajo
  @Output('change') change = new EventEmitter();      // parametro de salida, se asocia a un evento al cual clases están suscritos (app.component).
  

  onClick(){
    this.isFavorite=!this.isFavorite;
    this.change.emit(this.isFavorite);                // cuando emit se ejecuta, se ejecutará cualquier función asociada, se pasará el argumento como dato del evento
    this.change.emit ({ newValue: this.isFavorite});  //usando un objecto en el argumento
  }

  
}

export interface FavoriteChangedEventArgs {
  newValue: boolean
}