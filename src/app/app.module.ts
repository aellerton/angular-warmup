import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/toPromise';

//import { routes } from './app.routes';

import { AppComponent } from './app.component';
import { AppRoutingModule }     from './app-routing.module';

import { AboutComponent } from './about.component';
import { HomeComponent } from './home.component';
import { LoginComponent } from './login.component';
import { PageNotFoundComponent } from './pagenotfound.component';
// import { ProfileComponent } from './dashboard/profile.component';
// // import { DashboardComponent } from './dashboard/dashboard.component';
// // import { DashboardHomeComponent } from './dashboard/dashboard-home.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { LoginRoutingModule }   from './login-routing.module';
import { NavComponent } from './nav.component';
import { RandomQuoteComponent } from './quotes/random-quote.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    AboutComponent,
    LoginComponent,
    NavComponent,
    RandomQuoteComponent
    // ProfileComponent,
    // DashboardComponent,
    // DashboardHomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    //RouterModule.forRoot(routes),
    LoginRoutingModule,
    DashboardModule,
    AppRoutingModule,
  ],
  providers: [],
  //providers: [{provide: APP_BASE_HREF, useValue: '/dashboard'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
