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

}
