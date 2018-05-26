import { environment } from './../../environments/environment';   //cuando hagamos build --prod esto cambiará automaticamente a /enviroment.prod
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  backgroundColor = environment.navBarBaackgroundColor;

  constructor() { }

  ngOnInit() {
  }

}
