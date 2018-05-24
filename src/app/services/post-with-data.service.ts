import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable()
export class PostDataService extends DataService{

  constructor(http: Http) {

    super('https://jsonplaceholder.typicode.com/posts', http);      //lamamos al constructor heredado

  }


}
