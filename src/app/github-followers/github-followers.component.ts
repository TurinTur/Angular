import { Component, OnInit } from '@angular/core';
import { GithubFollowersService } from "../services/github-followers.service";
import { PostDataService }        from '../services/post-with-data.service';
import { ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';


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
        console.log("f3 " + this.followers);
      });    
    */
      //this.route.snapshot.queryParamMap.get('page'); //para obtener parametro opcional page, pero mejor usar subscribe

    Observable.combineLatest([    // queremos subscribirnos a dos observables, y actuar cuando recibimos respuesta en los dos, no antes (uno para los param. obligatorios, otro para las opcionales)
      this.route.paramMap,        // se soluciona creando un observable nuevo al que nos subscribimos, el cual combina los observables que queremos
      this.route.queryParamMap
    ])
    .subscribe(combined => {         // la entrada es una array de objetos de respuesta, el 0 es el primero, el 1 es el segundo...
      let id = combined[0].get('id');       //de paramMap
      let page = combined[1].get('page');   //de queryParamMap. Esto es un ejemplo, en verdad no estoy haciendo nada ni con id ni con page...

      this.service.getAll().subscribe(
                              followers => this.followers = followers);
    });

      /*.switchMap(combined => {          // la entrada es una array de objetos de respuesta, el 0 es el primero, el 1 es el segundo...
        let id = combined[0].get('id');       //de paramMap
        let page = combined[1].get('page');   //de queryParamMap

        return this.service.getAll();
      })
      .subscribe(followers => this.followers = followers);*/

  }

}
