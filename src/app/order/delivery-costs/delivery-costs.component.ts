import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mt-delivery-costs',
  templateUrl: './delivery-costs.component.html'
})
export class DeliveryCostsComponent implements OnInit {

  @Input() delivery: number;
  @Input() itemsValue: number;

  constructor() { }

  ngOnInit() {
  }

  /**
     * Returns the sum of delivery and itemsValue
     * 
     * @returns the sum of delivery and itemsValue
     */
  total(): number {
    return this.delivery + this.itemsValue;
  }

  
}
