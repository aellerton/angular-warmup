import { Component, OnInit } from '@angular/core';

import { Quote } from './quotes.model';
import { QuotesService } from './quotes.service';


@Component({
  selector: 'protected-quote',
  templateUrl: './protected-quote.component.html',
  styleUrls: ['./protected-quote.component.css']
})
export class ProtectedQuoteComponent implements OnInit {
  running: boolean = false;
  showStructure: boolean = false;
  quote: Quote = null;

  constructor(private quotesService: QuotesService) { }

  ngOnInit() {
    this.another();
  }

  another() {
    if (this.running) return; // if a request is in-flight, don't start another one.
    this.running = true;

    this.quotesService.getProtectedRandomRemoteQuote().subscribe(v => {
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
