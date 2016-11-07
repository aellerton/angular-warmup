import { Component }        from '@angular/core';
import { Router,
         NavigationExtras } from '@angular/router';
import { AuthService }      from './auth/auth.service';
import { Urls } from './app.constants';

@Component({
   selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  running: boolean = false;
  message: string;

  constructor(public authService: AuthService, public router: Router) {
    this.setMessage();
  }

  setMessage() {
    this.message = 'You are currently logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  pretendLogin() {
    this.message = 'Trying to log in ...';
    this.running = true;

    this.authService.pretendLogin().subscribe((v) => {
      console.log("login.component:pretendLogin, subscribe param=", v, "isLoggedIn=", this.authService.isLoggedIn)
      this.running = false;
      this.setMessage();
      if (this.authService.isLoggedIn) {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : Urls.defaultAfterLogin;

        // Set our navigation extras object
        // that passes on our global query params and fragment
        let navigationExtras: NavigationExtras = {
          preserveQueryParams: true,
          preserveFragment: true
        };

        // Redirect the user
        this.router.navigate([redirect], navigationExtras);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.setMessage();
  }

  login(event, username, password) {
    event.preventDefault(); // needed?
    this.running = true;
    console.log("go twonk", username, password);
    //setTimeout(() => this.running=false, 1000);

    this.authService.login(username, password).subscribe(v=>this.loginSuccess(v), e=>this.loginFailure(e))
  }
  
  loginSuccess(v) {
    console.log("login.component:loginSuccess(): subscribe 1, v: ", v)
    this.running = false;
    this.setMessage();

    let token = localStorage.getItem('auth_token')
    console.log("login.component:loginSuccess(): localStorage.getItem auth_token=", token, "isLoggedIn=", this.authService.isLoggedIn)

    console.log("login.component:loginSuccess", this.authService)
    if (this.authService.isLoggedIn) {
      

      // Get the redirect URL from our auth service
      // If no redirect has been set, use the default
      let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : Urls.defaultAfterLogin;

      // Set our navigation extras object
      // that passes on our global query params and fragment
      let navigationExtras: NavigationExtras = {
        preserveQueryParams: true,
        preserveFragment: true
      };

      // Redirect the user
      this.router.navigate([redirect], navigationExtras);
    } else {
      console.log("login.component:loginSuccess(): authService says NOT logged in")
    }
  }

  loginFailure(e) {
    this.running = false;
    this.message=e.message ? e.message : "Login failure"
    console.error("login.component:loginFailure", e);
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/