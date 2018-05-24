import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable()
export class GithubFollowersService extends DataService{

  constructor(http: Http) {

    //super('https://jsonplaceholder.typicode.com/posts', http);      //lamamos al constructor heredado
    super('https://api.github.com/users/mosh-hamedani/followers', http);
  }


}
