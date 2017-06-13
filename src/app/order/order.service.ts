import { Injectable } from '@angular/core';
import { ShoppingCartService } from '../restaurant-detail/shopping-cart/shopping-cart.service';
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Order, OrderItem } from './order.model';
import { MEAT_API } from '../app.api';

@Injectable()
export class OrderService {
    constructor(private cartService: ShoppingCartService, private http: Http) { }

    itemsValue(): number {
        return this.cartService.total();
    }

    /**
     * Returns the items into a CartItem array
     */
    cartItems(): CartItem[] {
        return this.cartService.items;
    }

    /**
     * Increases the quantity of items in the array CartItem
     * 
     * @param item: CartItem
     */
    increaseQty(item: CartItem) {
        this.cartService.increaseQty(item);
    }

    /**
     * Decreases the quantity of items in the array CartItem
     * 
     * @param item: CartItem
     */
    decreaseQty(item: CartItem) {
        this.cartService.decreaseQty(item);
    }

    /**
     * Remove the quantity from CartItems array
     * 
     * @param item: CartItem
     */
    remove(item: CartItem) {
        this.cartService.removeItem(item);
    }

    /**
     * HTTP post sending the order
     * 
     * @param order: Order
     * 
     * @returns response: json
     */
    checkOrder(order: Order): Observable<string> {
        const headers = new Headers();
        headers.append('Content-type', 'application/json');
        return (
            this.http
                .post(`${MEAT_API}/orders`,
                JSON.stringify(order),
                new RequestOptions({ headers }))
                .map(response => response.json())
                .map(order => order.id)
        );
    }

    /**
     * Empty the CartItem array items 
     * 
     */
    clear() {
        this.cartService.clear();
    }
}