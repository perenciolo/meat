import { CartItem } from './cart-item.model';
import { MenuItem } from '../menu-item/menu-item.model';


export class ShoppingCartService {
    items: CartItem[] = [];

    /**
     * Empty a CartItem array items 
     * 
     */
    clear() {
        this.items = [];
    }

    /**
     * Add a given item in the array CartItem
     * 
     * @param item:  MenuItem
     */
    addItem(item: MenuItem) {
        let foundItem = this.items.find((mItem) => mItem.getMenuItem().id === item.id);

        if (foundItem) {
            foundItem.setQuantity(1);
            return;
        }

        this.items.push(new CartItem(item));
    }

    /**
     * Remove a given item in the array CartItem
     * 
     * @param item: CartItem
     */
    removeItem(item: CartItem) {
        this.items.splice(this.items.indexOf(item), 1);
    }

    /**
     * Increases by 1 the quantity of items in the array CartItem
     * 
     * @param item: CartItem
     */
    increaseQty(item: CartItem) {
        item.setQuantity(1);
    }

    /**
     * Decreases by 1 the quantity of items in the array CartItem
     * 
     * @param item: CartItem
     */
    decreaseQty(item: CartItem) {
        if (item.getQuantity() < 2) {
            this.removeItem(item);
            return;
        }

        item.setQuantity(-1);
    }

    /**
     * Increases the quantity of items in the array CartItem
     * 
     * @returns an array of the total amount of the list
     */
    total(): number {
        return (
            this.items
                .map(item => item.value())
                .reduce((prev, value) => prev + value, 0)
        );
    }
}