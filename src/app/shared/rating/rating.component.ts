import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mt-rating',
  templateUrl: './rating.component.html'
})
export class RatingComponent implements OnInit {

  rates: number[] = [1, 2, 3, 4, 5];

  rate: number = 0;

  previousRate: number;

  @Output() rated = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  /**
   * Sets rate to r
   * 
   * @param r: number
   */
  setRate(r: number) {
    this.rate = r;
    this.previousRate = undefined;
    this.rated.emit(this.rate);
  }

  /**
   * Sets a temporary rate on mouse enter
   * 
   * @param r: number
   */
  setTemporaryRate(r) {
    if (this.previousRate === undefined) {
      this.previousRate = this.rate;
    }
    this.rate = r;
  }

  clearTemporaryRate() {
    if (this.previousRate !== undefined) {
      this.rate = this.previousRate;
      this.previousRate = undefined;
    }
  }

}
