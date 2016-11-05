import { Component, OnInit } from '@angular/core';
import { Router,
         NavigationExtras } from '@angular/router';
import { AuthService }      from './auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  title = 'Angular 2 Demo';

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit() {
  }

}
