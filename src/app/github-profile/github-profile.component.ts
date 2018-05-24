import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'github-profile',
  templateUrl: './github-profile.component.html',
  styleUrls: ['./github-profile.component.css']
})
export class GithubProfileComponent implements OnInit {

  constructor( private route: ActivatedRoute)
    //private router: Router)
    {  }

 /* submit() {
    this.router.navigate(['/followers'], {
      queryParams: {page: 1, order: 'newest'}
    })
  }*/

  ngOnInit(): void {          // Si se redirige de la pagina actual a la misma pagina con un enlance nuevo, ngonInnit no se ejecuta, porque el componente no se crea de nuevo.
    console.log("on innit");  // Sin embargo si ha cambiado la ruta, nuestro observador se dará cuenta y actuará.
    this.route.paramMap       // esta propiedad observable nos dará todos los parámetros de esta ruta
      .subscribe( params => { // tienen un objeto 'keys' con un array de con pares tipo 0:username y un obj params con un array de pares tipo username:"1111"
          //console.log(params);
          let id= +params.get('id');    //es un string, el + lo convierte a number
          console.log(id);
          //params.keys  // obtiene todas las keys
          //params.get(name)  // obtiene un valor de un parametro con su nombre
          //params.getAll() // obtiene todos los parametros
          //bool=params.has(name)  // obtiene 
       });

       let id= this.route.snapshot.paramMap.get('id');  // si estamos seguro que no se va a llegar al componente actual desde la misma pagina, podemos prescindir del observable
       console.log(id);                                 // y simplemente usar snapshot, con la ruta actual
  }
}
