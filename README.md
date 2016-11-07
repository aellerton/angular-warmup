# AngularStorm

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.19-3.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to Github Pages

Run `ng github-pages:deploy` to deploy to Github Pages.

## Further help

To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Pretend Auth Server

Clone https://github.com/auth0-blog/nodejs-jwt-authentication-sample

Set up and run:

    npm install
    node server.js

Prove basic API call works:

    http GET :3001/api/random-quote

In another window create a user:

    $ http POST :3001/users username=lena password=ppm extra=classic
    HTTP/1.1 201 Created
    Access-Control-Allow-Origin: *
    Connection: keep-alive
    Content-Length: 200
    Content-Type: application/json; charset=utf-8
    Date: Fri, 04 Nov 2016 12:38:26 GMT
    ETag: W/"c8-q3S3xI6ftCSM16FSgCgGLQ"
    X-Powered-By: Express
    
    {
        "id_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImxlbmEiLCJleHRyYSI6ImNsYXNzaWMiLCJpZCI6MiwiaWF0IjoxNDc4MjYzMTA2LCJleHAiOjE0NzgyODExMDZ9.6a1hLhvbTyNybHFoKPPb-pg-8Vg7YMDh_kGWYoVRTpw"
    }
    


Then "log in" creating a session:

    $ http POST :3001/sessions/create username=lena password=ppm
    HTTP/1.1 201 Created
    Access-Control-Allow-Origin: *
    Connection: keep-alive
    Content-Length: 200
    Content-Type: application/json; charset=utf-8
    Date: Fri, 04 Nov 2016 12:39:05 GMT
    ETag: W/"c8-pnjSKyCI65bft4jQgMRihA"
    X-Powered-By: Express
    
    {
        "id_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImxlbmEiLCJleHRyYSI6ImNsYXNzaWMiLCJpZCI6MiwiaWF0IjoxNDc4MjYzMTQ1LCJleHAiOjE0NzgyODExNDV9.HDMQtWFZGgvdreJZXTV3kGysHjbo2jm5wbG07GFtWL4"
    }


Prove that a restricted ("logged in") API call works:

    $ http GET :3001/api/protected/random-quote "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImxlbmEiLCJleHRyYSI6ImNsYXNzaWMiLCJpZCI6MiwiaWF0IjoxNDc4MjYzMTA2LCJleHAiOjE0NzgyODExMDZ9.6a1hLhvbTyNybHFoKPPb-pg-8Vg7YMDh_kGWYoVRTpw"
    HTTP/1.1 200 OK
    Access-Control-Allow-Origin: *
    Connection: keep-alive
    Content-Length: 126
    Content-Type: text/html; charset=utf-8
    Date: Fri, 04 Nov 2016 12:42:09 GMT
    ETag: W/"7e-HgAyrxMJ0ujZf7dZDU/qvQ"
    X-Powered-By: Express
    
    Chuck Norris once got bit by a rattle snake........ After three days of pain and agony ..................the rattle snake died


## Very useful

JWT's are simple in concept but I was fortunate to find this excellent
module that saved me a lot of work:

https://github.com/auth0/angular2-jwt


