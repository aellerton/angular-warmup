import { Component, OnInit } from '@angular/core';

import { Quote } from './quotes.model';
import { QuotesService } from './quotes.service';

@Component({
  selector: 'random-quote',
  templateUrl: './random-quote.component.html',
  styleUrls: ['./random-quote.component.css'],
  providers: [ QuotesService ],
})
export class RandomQuoteComponent implements OnInit {
  running: boolean = false;
  quote: Quote = null;

  constructor(private quotesService: QuotesService) { }

  ngOnInit() {
    this.another();
  }

  another() {
    if (this.running) return; // if a request is in-flight, don't start another one.
    this.running = true;

    this.quotesService.getRandomQuote().subscribe(v => {
      this.running = false
      this.quote = v
    }, err => {
      // Show the error somehow. A better solution might be to hide the whole
      // quote block.
      this.quote = new Quote(err, "System Overlord")
      this.running = false
    });
  }
}
