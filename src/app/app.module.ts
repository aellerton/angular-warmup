import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';
// import { RouterModule }   from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

// App Root
import { AppComponent } from './app.component';

// Feature Modules
import { CoreModule }       from './core/core.module';
import { QuotesModule } from './quotes/quotes.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { LoginRoutingModule }   from './login-routing.module';

// App Routing 
import { AppRoutingModule }     from './app-routing.module';

// "Local" modules (refactor?)
import { AboutComponent } from './about.component';
import { HomeComponent } from './home.component';
import { LoginComponent } from './login.component';
import { PageNotFoundComponent } from './pagenotfound.component';
import { NavComponent } from './nav.component';

@NgModule({
  imports: [
    BrowserModule,
    // FormsModule,
    // HttpModule,
    //RouterModule.forRoot(routes),
    CoreModule,
    QuotesModule,
    LoginRoutingModule,
    DashboardModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    AboutComponent,
    LoginComponent,
    NavComponent,
    // ProfileComponent,
    // DashboardComponent,
    // DashboardHomeComponent
  ],
  providers: [],
  //providers: [{provide: APP_BASE_HREF, useValue: '/dashboard'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
