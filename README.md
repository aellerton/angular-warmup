# Angular 2 Demo

Angular 2 starter site with brochure area, login and user dashboard.

## Mission

As a developer I have two modes:

1. I need to get something built
2. I need to learn something

In both modes I find it useful to have real examples that I can refer to.

The Angular documentation is ok - the authors are doing an amazing job.

But ... I couldn't find an example that does the full first set of work every new site 
I ever see needs:

1. A brochure area
2. A login area
3. A logged-in-user-only area
4. Ideally, an admin-user-only area.

Now, in fairness, all of these are covered in different parts of the Angular documentation
and in some amazing ``plunkr``'s. But I want it in one place. Something I can study, copy,
modify, throw away, start again.


## Highlights

- Demonstrates routing and content with an anonymous user and an authenticated user
- Uses JWTs
- Uses HTTP calls to a back-end (i.e. not mocked HTTP calls)
- Uses basic Bootstrap 4
- Uses WebPack


## Wanted

Contributions to make it look better and do more!


## Setup

See [SETUP.md](./SETUP.md).

## The Good

Covers some good stuff:

- Brochure / landing page area

  Note: I'm not saying that a real site should use angular, or if it does, then it
  should use the same angular repo as the user app. Arguably, it makes more sense to
  have the brochure area as static files, or as a separate angular (or react, etc) repo.

  What I'm saying is that it's useful to see it done, all in one place.

- Shows routing in both the anonymous brochure area and the dashboard area.

- Basic use of Bootstrap 4. Layout only. No JavaScript replacement

- Demonstrates unauthenticated HTTP call service and component with random quotes.

- Demonstrates authenticated HTTP calls to log in and get "restricted" random quotes.

- Shows a simple login using HTTP calls to a back-end, using JWT's to manage the session info.
  No cookies required.

- Shows the contents of the JWT in the ``dashboard > profile`` area, including some custom
  pipes.

- A core module is used to keep a singleton of the ``AuthService``

- A shared module is used to make some common components available. 

- Brochure nav changes depending on whether the user is logged in or not.

- Router handles a "404"-like request gracefully.

## The Bad

- This is a work in progress, which is to say that it isn't the cleanest code I've written.
  There's lots of ``console.log`` statements, and a lot of cleanup work yet.

- There's a number of core areas not covered, including...

- Haven't shown a parent component passing data to a child component

- Haven't got a form demonstrating ``ngModel`` (the login form uses field names)

- The login form doesn't do validation beyond the default browser "field must be required". 

- No automatic log out. So, if a token expires, the next time the user navigates somewhere it 
  will redirect to log in. Not bad, but not a smooth experience.

## The Ugly

- It's literally ugly. I'm not trying to win design awards here. I welcome pull requests ;)
- There's lots missing. Examples...
- Dashboard is really minimal with only the top nav links doing anything
- No user registration
- No admin area
- No dropdown menus - haven't got to integrating dynamic Bootstrap stuff.
- Some of the early components (login, nav, general brochure stuff) should come out of the root
  directory and into a module of it's own.

## What would be nice to do

- Fix all "the bad" and "the ugly" above

## Steps to get here

Sometimes it's useful to build a project like this from the ground-up yourself. Here's how 
I did it:

1. Build a basic working site 

   I used ``ng-cli`` to build a skeleton project. The latest version uses webpack which,
   although a bit more "magic" and opaque than I'd like, works well and lays the foundation 
   for quality production releases.

   Outcome: "it works" is displayed.

2. Get basic routes on the static ("brochure") site

   See the link in the next section.

   Outcome: can navigate to an "about" page and back to the landing page.

3. Get a "pretend" login working

   Two documents were key to this.

   The [angular router guide](https://angular.io/docs/ts/latest/guide/router.html) is a 
   surprisngly great starting point for getting login working. I came to the page looking
   only to understand the router and got a lot more.
   
   There's a ``plunkr`` on the page that has a mocked client-side login mechanism.
   It's straightforward to read and is worth spending time on.

   The other is [this medium article on Angular authentication](https://medium.com/@blacksonic86/angular-2-authentication-revisited-611bf7373bf9#.b1pldpbd1).

   I found myself going back and forth between them. The Angular doc will, by definition, always
   be more up to date and has the working ``plunkr``, but the article above has narrative and context
   that the Angular docs often miss.

   Working through the pages I gradually added a mocked up ``AuthService`` to the project.

   Outcome: I can click "login" and see a dashboard. I can click "logout" and dashboard isn't 
   available.  

4. Refined that a bit
   
   I spent some time integrating Bootstrap, making the brochure nav slightly different if the user
   is logged in (I always like to know if I'm logged in, even on the landing page, but few sites 
   show it differently).

   Outcome: Brochure, Login and Dashboard, but a bit prettier.

5. Added a simple HTTP service

   I'm working toward having authentication done by HTTP but I try to follow a "one step
   at a time" rule. The project had no HTTP integrated so trying to integrate HTTP with 
   authentication (and the paraphrenalia that comes with it like services and providers)
   would have been too many points of potential failure.

   I wanted something simple and easy and found this [handy sample service](https://github.com/auth0-blog/nodejs-jwt-authentication-sample)
   mentioned on the Medium article above.
   
   At this stage I used only the random quote API (``http GET :3001/api/random-quote`` via 
   [httpie](https://httpie.org/)) but it has all the user registration and session management
   API endpoints I needed too - score.
   
   Outcome: the brochure landing page features a random quote!

   Code:

         <random-quote>Random quote loads here (but you never see this text)</random-quote>

   Which looks like:

   TODO

6. Added login via HTTP service 

   The demo server above has a basic but workable API for creating users, authenticating a 
   user, creating a session and returning a JWT.

   I started with the authentication in the project (which worked but used no HTTP), 
   added a new ``AuthService`` (using the same service approach used in the random quote module)
   and after a while, got it all connected.

   Outcome: authentication works using HTTP API call.

7. Embraced JWTs

   The above was great but was still using a hackky ``isLoggedIn=true`` approach.

   The back-end returns a JWT, so time to embrace it.
   
   I hadn't fully appreciated how awesome a JWT is until now. In ye olden days, meaning a year
   or two ago, the conventional approach was for a successful authentication to return a cookie 
   that the browser would set and then send on each subsequent request.

   JWTs make that a thing of the past. It's a big shift, if you think about it. The front-end
   of a modern web app is all static files. The dynamic part can now be entirely back-end API
   calls.

   It's almost "so good it can't be true".

   Cookies aren't /that bad/ but if it can be avoided with local storage and a JWT, why not?

   Pattern:
   - check if logged in by looking in local storage for a token
   - if not, a user can log in by sending an HTTP API call
   - if the call succeeds, the headers include a JWT 
   - the front-end can store the JWT in local storage  
   - subsequent "restricted" API calls pull the JWT from local storage and send
     it as a header. 

   Outcome: JWTs used, session stays in place until JWT expires. 


8. Dumped the mock login 

   Didn't need the mock login any more so removed it.

   Outcome: less cruft.


9. Added "restricted" HTTP API component

   Now that a user is logged in, I wanted to prove that making an authenticated or 
   "restricted" API call worked. The default back-end comes with an API to test this.
   
   The ``/api/protected/random-quote`` endpoint also returns a random quote but only
   if the JWT provided in a header is valid.

   I started down a path of adding logic to retrieve the JWT from local storage, add it
   as a header - and then happily stumbled on 
   [this excellent angular2-jwt module](https://github.com/auth0/angular2-jwt).

   All I wanted was something to unpack the JWT but was really happily surprised by
   the functionality in the module. 

   I thought that every service wanting to call an authenticated API would need to
   inject the ``AuthService``, but no, with ``angular2-jwt`` all I need is ``AuthHttp`.

   Normal API call:

       return this.http.get(this.randomQuoteUrl)

   Authenticated API call:

       return this.authHttp.get(this.protectedRandomQuoteUrl)
  
   #awesome.

   Outcome: when a user is logged in, the front-end can issue authenticated API requests
   that work.


10. Updated the profile page

   Shows the content of the JWT. Wanted to show the JWT expiry and issue info in a human-friendly
   way so added two pipes, ``ifEmpty`` and ``unixTimestamp``. They are handy to have everywhere so
   I added a ``SharedModule``.

11. Cleanups and improvements

   Well, "some" cleanups and improvements.
