import { Component, OnInit } from '@angular/core';
import { GithubFollowersService } from "../services/github-followers.service";
import { PostDataService }        from '../services/post-with-data.service';
import { ActivatedRoute } from "@angular/router";
//import { Observable } from 'rxjs/Observable';     // version 5?
import { Observable } from 'rxjs';                 // version 6
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { map, switchMap  } from 'rxjs/operators';  //Cambiado en version 6, ahora se hace asi.


@Component({
  selector: 'github-followers',
  templateUrl: './github-followers.component.html',
  styleUrls: ['./github-followers.component.css']
})
export class GithubFollowersComponent implements OnInit {

  followers: any[];

  constructor(
    private route: ActivatedRoute,
    private service: GithubFollowersService) { }


  ngOnInit(): void {

    /*this.service.getAll()
    .subscribe(
      followers => {
        this.followers = followers;
        console.log("followers: " + this.followers);
      });
    */

    //this.route.snapshot.queryParamMap.get('page'); //para obtener parametro opcional page, pero mejor usar subscribe


    Observable.combineLatest([    // queremos subscribirnos a dos observables, y actuar cuando recibimos respuesta en los dos, no antes (uno para los param. obligatorios, otro para las opcionales)
      this.route.paramMap,        // se soluciona creando un observable nuevo al que nos subscribimos, el cual combina los observables que queremos
      this.route.queryParamMap
    ])


    //1ª version
    /*.subscribe(combined => {         // la entrada es una array de objetos de respuesta, el 0 es el primero, el 1 es el segundo...
      let id = combined[0].get('id');       //de paramMap
      let page = combined[1].get('page');   //de queryParamMap. Esto es un ejemplo, en verdad no estoy haciendo nada ni con id ni con page...

      this.service.getAll().subscribe(
                              followers => this.followers = followers);
    });*/

    //2ª versión, usando SwitchMap, para evitar un subscribe dentro de otro, y obtener un followers[] como resultado final
    .switchMap(combined => {            //devuelve Observable<any> , por eso es usado
      let id = combined[0].get('id');       //de paramMap
      let page = combined[1].get('page');   //de queryParamMap

      return this.service.getAll();     //en verdad este ejemplo es algo tramposo, porque lo que switchMap devuelve el el service.getAll, que no tiene nada que ver con la entrada combined
    })
    .subscribe(followers => { this.followers=followers})

    /*.pipe(                            // Versión con Pipe, de rjxs 6
      switchMap(combined => {
        let id = combined[0].get('id');       //de paramMap
        let page = combined[1].get('page');   //de queryParamMap

      return this.service.getAll();
      })
    )
    .subscribe(followers => { this.followers=followers})*/

  }

}
