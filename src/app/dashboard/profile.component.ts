import { Component, OnInit } from '@angular/core';

import { AuthService }      from '../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  data = {foo: 'bar', 'honk':'twonk'};

  constructor(private authService: AuthService) {
    this.data = this.authService.decodeToken();
   }

  ngOnInit() {
  }

}
