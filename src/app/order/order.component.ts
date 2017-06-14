import { Component, OnInit } from '@angular/core';
import { RadioOption } from '../shared/radio/radio-option.model';
import { OrderService } from './order.service';
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';
import { Order, OrderItem } from './order.model';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  orderForm: FormGroup;
  delivery = 8;
  emailPatern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  numberPatern = /^[0-9]*$/;

  paymentOptions: RadioOption[] = [
    { label: 'Dinheiro', value: 'MON' },
    { label: 'Cartão de Débito', value: 'DEB' },
    { label: 'Cartão de Crédito', value: 'REF' }
  ];

  constructor(
    private orderService: OrderService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }


  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPatern)]),
      emailConfirmation: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPatern)]),
      address: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      number: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPatern)]),
      optionalAddress: this.formBuilder.control(''),
      paymentOption: this.formBuilder.control('', [Validators.required])
    }, { validator: OrderComponent.equalsTo });
  }

  static equalsTo(group: AbstractControl): { [key: string]: boolean } {
    const email = group.get('email');
    const emailConfirmation = group.get('emailConfirmation');
    if (!email || !emailConfirmation) {
      return undefined;
    };
    if (email.value !== emailConfirmation.value) {
      return { emailsNotMatch: true };
    }

    return undefined;
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
