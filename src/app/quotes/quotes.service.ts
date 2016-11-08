import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Subscriber }     from 'rxjs/Subscriber';

import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/distinctUntilChanged';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/toPromise';

import { Quote } from './quotes.model';

@Injectable()
export class QuotesService {
  private timePercentage = 0.2;
  private randomQuoteUrl = '/api/random-quote';
  private protectedRandomQuoteUrl = '/api/protected/random-quote';

  constructor(private http: Http, private authHttp: AuthHttp) { }

  getRandomQuote(): Observable<Quote> {
    if (Math.random() < this.timePercentage) {
      return this.getTimeAsQuote();
    } else {
      return this.getRandomRemoteQuote();
    }
  }

  getRandomRemoteQuote(): Observable<Quote> {
    return this.http.get(this.randomQuoteUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  // getProtectedRandomRemoteQuote returns a "protected" quote, meaning only an 
  // authorised user can access it. Without auth a 401 will be returned. 
  getProtectedRandomRemoteQuote(): Observable<Quote> {
    return this.authHttp.get(this.protectedRandomQuoteUrl)
                    .map(this.extractData)
                    .map((data: any) => {
                      data.protected=true
                      return data;
                    })
                    .catch(this.handleError);
  }

  getTimeAsQuote(): Observable<Quote> {
    return new Observable<Quote>((observer: Subscriber<Quote>) => {
      setTimeout(() => {
        let q=new Quote(`The time is ${new Date().toString()}`, "Time Lord");
        console.log(q);
        observer.next(q)
      }, 1000);
    });
  }

  private extractData(res: Response): Quote {
    let ct = res.headers.get("Content-Type")

    if (ct.toLowerCase().indexOf("application/json") >= 0) {
      // assume it's the right 'shape' for Quote for now
      return res.json()
    }

    // The default back-end server returns content-type ``text/html`` even though it
    // should be plain text. However, if the user isn't running a back-end server
    // then invoking the quotes endpoint will invoke Angular itself, also yielding HTML.
    // Differentiate by looking for a "<" at the start.
    let t = res.text()

    if (t.match(/^\s*</)) {
      return new Quote(
        "Uh-oh. Looks like you're not running a real quote server back-end?",
        "The Angular Police")
    }
    
    return new Quote(t, 'Chuck Norris Fan') // if here, the service doesn't give an attribution
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      //console.log("response error", error)
      errMsg = `Hmm, something went wrong: status="${error.statusText}" (${error.status})`

      // JSON error handling
      // const body = error.json() || '';
      // const err = body.error || JSON.stringify(body);
      // errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }
}
