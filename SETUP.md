# Setup

You can run the Angular front-end without a back-end but none of the
good stuff will work. For that you'll need the back-end. Read on.


## Front-end Setup

First clone the repo and nsure these are installed: 
- ``npm``
- ``ng-cli``

then

    cd /wherever/repo/is
    npm install

To run the front-end:

    ng serve

Open a browser to [http://localhost:4200/](http://localhost:4200/) to see the site.

Note: although this will (or should) work, the back-end isn't running so login and the
random quote components won't work. For that, you'll need to set up the back-end.


## Back-end Setup

You don't "have" to use a back-end with the demo but you won't be able to do anything
that needs API calls (random quotes, log in) without it.

If you see the message "Uh-oh. Looks like you're not running a real quote server back-end?"
you know you haven't got the back-end up and running.

The front-end needs a back-end API that provides:

- an API endpoint with no unauthentication (in this case, random quotes)
- an API endpoint to "log in" and create a session
- an API endpoint requiring authentication ("protected" random quotes)

One of the articles I read contained a link to a 
[perfect starter backend]((https://github.com/auth0-blog/nodejs-jwt-authentication-sample)
(more details further down).

Clone the repo then set up with:

  cd /wherever/you/put/nodejs-jwt-authentication-sample
  npm install

then run with:

  node server.js

The back-end is running and available at [http://localhost:3001](http://localhost:3001).
You can test it with [httpie](https://httpie.org/)) like:

    $ http GET :3001/api/random-quote
    HTTP/1.1 200 OK
    Access-Control-Allow-Origin: *
    Connection: keep-alive
    Content-Length: 90
    Content-Type: text/html; charset=utf-8
    Date: Tue, 08 Nov 2016 04:54:39 GMT
    ETag: W/"5a-Rur5PRx98GRv64U6liRAwQ"
    X-Powered-By: Express

    When Chuck Norris does a pushup, he isn't lifting himself up, he's pushing the Earth down.

Similarly, prove that the "protected" API doesn't work:

    $ http GET :3001/api/protected/random-quote
    HTTP/1.1 401 Unauthorized
    Access-Control-Allow-Origin: *
    Connection: keep-alive
    Content-Length: 53
    Content-Type: text/html; charset=utf-8
    Date: Tue, 08 Nov 2016 04:55:24 GMT
    X-Content-Type-Options: nosniff
    X-Powered-By: Express

    UnauthorizedError: No Authorization header was found


You can create a user:

    $ http POST :3001/users username=lena password=ppm extra=classic
    HTTP/1.1 201 Created
    ...
    {
        "id_token": "eyJ0eXAiOiJKV1...Tpw"
    }

However, the back-end ships with a built-in user/password so you don't have to bother,
and can cut straight to authenticating:

    $ http POST :3001/sessions/create username=gonto password=gonto
    HTTP/1.1 201 Created
    ...

    {
        "id_token": "eyJ0...ij8"
    }

Sending a "protected" API call with the bearer token works:

    $ http GET :3001/api/protected/random-quote "Authorization: Bearer eyJ...ij8"
    HTTP/1.1 200 OK
    ...
    
    Chuck Norris once got bit by a rattle snake... After three days of pain and agony... the rattle snake died


The back-end is ready but running on a different port. There's a few options at this point
but my view is that development should approximate production. In production I'd run ``nginx``
to serve the Angular static files and reverse proxy the API calls through to the back-end.

We could run ``nginx`` in development too - it works great - but I prefer a lighter weight 
solution - and [``devd`` is brilliant](https://github.com/cortesi/devd).

Installing from the go source is straightforward, and on a Mac you
 can do ``brew install devd``, and .


Here's how to run ``devd`` as a facade proxying to localhost:3001 for the API and
localhost:4200 for the webpack-generated static files:

    $ devd --debug \
        /api/=http://localhost:3001/api \
        /sessions/=http://localhost:3001/sessions \
        /users=http://localhost:3001/users \
        /=http://localhost:4200

(Ideally, the back-end would only need URIs starting with ``/api/`` but that's a nice-to-have
for another day.)

The above command is wrapped up in a short shell script:

    /wherever/repo/is/ $ ./tools/runproxy
    13:02:24: Listening on http://devd.io:8000 (127.0.0.1:8000)

So, browse to [http://devd.io:8000](http://devd.io:8000) and the site should look like this:

TODO screenshot


