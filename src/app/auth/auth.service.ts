import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscriber } from 'rxjs/Subscriber';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

import { JwtHelper, tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  private sessionCreateUrl = "/sessions/create";

  // authenticationStarted is invoked when the authentication call to the
  // server has completed but before the housekeeping on the client-side is ready.
  private authenticationStarted: Subject<any> = new Subject<any>()

  // authenticationOk is invoked when the user has been logged in and all housekeeping
  // needed to "log in" on the client-side has been done.
  private authenticationOk: Subject<any> = new Subject<any>()

  // authenticationEnded is invoked when the user has logged out and all housekeeping
  // (e.g. localStorage) to clean up has been done.
  private authenticationEnded: Subject<any> = new Subject<any>()

  // authenticationFailed is invoked when authentication fails for some reason, e.g.
  // 1. when attempting to log in but with bad credentials, or
  // 2. when a user is logged in but an API call comes back with 401, incidicating that
  //    the previously valid session has expired. In this case the display could show
  //    an "uh-oh you need to log in" screen.
  private authenticationFailed: Subject<any> = new Subject<any>()

  private jwtHelper = new JwtHelper();

  // TODO: delete
  //isLoggedIn: boolean = false;

  // store the URL so we can redirect after logging in
  // TODO: should this be a parameter to login()?
  redirectUrl: string;

  constructor(private http: Http) { 

    this.authenticationStarted.subscribe((id_token) => {
      if (id_token) {
        console.log("decoded jwt:", this.jwtHelper.decodeToken(id_token));
      }
      console.log("authenticationStarted event", id_token)
      localStorage.setItem('id_token', id_token);
      //this.isLoggedIn = true;
      this.authenticationOk.next(id_token);
    })

    this.authenticationOk.subscribe((v) => {
      console.log("authenticationOk event", v)
    })

    this.authenticationEnded.subscribe((v) => {
      console.log("authenticationEnded event", v)
    })

    this.authenticationFailed.subscribe((v) => {
      console.log("authenticationFailed event", v)
    })
  }

  isLoggedIn(): boolean {
    // TODO: put some cache logic around this, like do the real check at most once a minute.
    // TODO: for that matter, put a timer to send an "expire" event.
    return tokenNotExpired();
  }
  pretendLogin(): Observable<boolean> {
    // var headers = new Headers();
    // headers.append('Content-Type', 'application/json; charset=utf-8');

    return Observable.of(true).delay(1000).do(val => {
      // fake the "housekeeping" to indicate logged in
      // TODO this.isLoggedIn = val
      this.authenticationOk.next();
    });
  }

  pretendLogout(): void {
    // TODO this.isLoggedIn = false;
    this.authenticationEnded.next();
  }

  login(username, password): Observable<boolean> {
    // TODO:
    // if this.isLoggedIn fail

    // var headers = new Headers();
    // headers.append('Content-Type', 'application/json; charset=utf-8');

    // let headers = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: headers });
    // return this.http.post(this.heroesUrl, { name }, options)
    //                 .map(this.extractData)
    //                 .catch(this.handleError);

    //return Observable.of(true).delay(1000).do(val => this.isLoggedIn = val);

    let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
    });

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('username', username);
    urlSearchParams.append('password', password);
    //let body = urlSearchParams.toString()

    // $ http POST :3001/sessions/create username=lena password=ppm
    return this.http
      .post(
        this.sessionCreateUrl, 
        //JSON.stringify({ email, password }),
        urlSearchParams.toString(), 
        { headers }
      )
      .map(v => this.extractData(v)) // NOTE: must do lambda notion or `this.extractData` gets wrong 'this'.
      // .map(res => res.json())
      // .map((res) => {
      //   console.log("finished login", res)
      //   if (res.success) {
      //     localStorage.setItem('id_token', res.id_token);
      //     this.isLoggedIn = true;
      //   }

      //   return res.success;
      // });
      .catch(v => this.handleError(v))
      ;
  }

  logout(): void {
    //this.isLoggedIn = false;
    localStorage.removeItem('id_token');
    this.authenticationEnded.next();
  }

  private extractData(res: Response): boolean {
    console.log("auth.service:extractData 1: res=", res)
    let res2 = res.json();
    //console.log("auth.service:extractData 2: json-res=", res2)
    if (res2.id_token) {
      this.authenticationStarted.next(res2.id_token);
      // localStorage.setItem('id_token', res2.id_token);
      // this.isLoggedIn = true;
      // this.authenticationOk.next(res2.id_token);
    } else {
      console.log("auth.service:extractData: fail: hmm res2 not success")
    }
    console.log("auth.service:extractData 3: id_token=", res2.id_token)
    //console.log("auth.service:extractData 4: this", this)
    
    return this.isLoggedIn();
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let result: Object;
    if (error instanceof Response) {
      //console.log("response error", error)
      if (error.status===401) {
        result = {message: "Could not log in with those details", code: error.status};
      } else {
        result = {message: `There was a problem logging in, code=${error.status}.`, code: error.status, res: error};
      }

      // JSON error handling
      // const body = error.json() || '';
      // const err = body.error || JSON.stringify(body);
      // errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      //errMsg = error.message ? error.message : error.toString();
      result = {message: error.message ? error.message : error.toString()}
    }
    this.authenticationFailed.next(result);

    // works but trying Subjects instead
    return Observable.throw(result);
    
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/