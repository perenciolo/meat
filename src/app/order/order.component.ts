import { Component, OnInit } from '@angular/core';
import { RadioOption } from '../shared/radio/radio-option.model';
import { OrderService } from './order.service';
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';
import { Order, OrderItem } from './order.model';
import { Router } from '@angular/router';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  delivery: number = 8;

  paymentOptions: RadioOption[] = [
    { label: 'Dinheiro', value: 'MON' },
    { label: 'Cartão de Débito', value: 'DEB' },
    { label: 'Cartão de Crédito', value: 'REF' }
  ];

  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit() {
  }

  /**
     *  Returns the value of the items
     * 
     * @returns the value of the items
     */
  itemsValue() {
    return this.orderService.itemsValue();
  }

  /**
     *  Returns an array of cartItems
     * 
     * @returns an array of cartItems
     */
  cartItems(): CartItem[] {
    return this.orderService.cartItems();
  }

  /**
     * Push the item in the array CartItem
     * 
     * @param item:  CartItem
     */
  increaseQty(item: CartItem) {
    this.orderService.increaseQty(item);
  }

  /**
     * Slice the item in the array CartItem
     * 
     * @param item:  CartItem
     */
  decreaseQty(item: CartItem) {
    this.orderService.decreaseQty(item);
  }

  /**
     * Remove the item from the array CartItem
     * 
     * @param item:  CartItem
     */
  remove(item: CartItem) {
    this.orderService.remove(item);
  }

  /**
     *  Returns an object that contains an order and the order items 
     * 
     * @returns an object that contains an order and the order items 
     */
  checkOrder(order: Order) {
    order.orderItems = this.cartItems().map((item: CartItem) => new OrderItem(item.getQuantity(), item.getMenuItem().id));
    this.orderService.checkOrder(order).subscribe((orderId: string) => {
      this.router.navigate(['/order-summary']);
      console.log(`Compra concluída: ${orderId}`);
      this.orderService.clear();
    });
    console.log(order);
  }
}
