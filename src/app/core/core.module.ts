import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { RouterModule }   from '@angular/router';

import { AUTH_PROVIDERS } from 'angular2-jwt';
//import { CoreComponent } from './core.component';
import { QuotesModule } from '../quotes/quotes.module';

// import { RandomQuoteComponent } from '../quotes/random-quote.component';
// import { ProtectedQuoteComponent } from '../quotes/protected-quote.component';

// See https://angular.io/docs/ts/latest/guide/ngmodule.html#!#shared-module
// constructor(@Optional() config: UserServiceConfig) {
//   if (config) { this._userName = config.userName; }
// }

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    //-- UP TO HERE -- consider CORE vs SHARED. Should QuotesModule import Core?
    //QuotesModule,
  ],
  declarations: [
    //CoreComponent, // TODO remove?
    // RandomQuoteComponent,
    // ProtectedQuoteComponent,
  ],
  exports: [
    // RandomQuoteComponent,
    // ProtectedQuoteComponent,
    //QuotesModule,
  ],
  providers: [
    AUTH_PROVIDERS
  ],
})
export class CoreModule { 
  // See https://angular.io/docs/ts/latest/guide/ngmodule.html#!#shared-module
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
  if (parentModule) {
    throw new Error(
      'CoreModule is already loaded. Import it in the AppModule only');
  }
}
}
