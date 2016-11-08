import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';

//import { CoreComponent } from './core.component';
//import { QuotesModule } from '../quotes/quotes.module';
import { IfEmptyPipe } from './if-empty.pipe';
import { UnixTimestampPipe } from './unix-timestamp.pipe';


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    IfEmptyPipe,
    UnixTimestampPipe,
  ],
  exports: [
    // RandomQuoteComponent,
    // ProtectedQuoteComponent,
    //QuotesModule,
    IfEmptyPipe,
    UnixTimestampPipe,
    CommonModule,
    FormsModule,
  ],
  providers: [
  ],
})
export class SharedModule {}
