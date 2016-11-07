import { BrowserModule } from '@angular/platform-browser';
import { NgModule }       from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule }   from '@angular/common';

import { RandomQuoteComponent } from './random-quote.component';
import { ProtectedQuoteComponent } from './protected-quote.component';
import { QuotesService } from './quotes.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  declarations: [
    RandomQuoteComponent,
    ProtectedQuoteComponent,
    //QuotesService,
  ],
  exports: [
    RandomQuoteComponent,
    ProtectedQuoteComponent,
  ],
  providers: [
    QuotesService,
  ]
})
export class QuotesModule {}

