import { MenuItem } from '../menu-item/menu-item.model';

export class CartItem {

    constructor(private menuItem: MenuItem, private quantity = 1) { }

    getMenuItem() {
        return this.menuItem;
    }

    getQuantity() {
        return this.quantity;
    }

    setQuantity(quantity) {
        return this.quantity += quantity;
    }

    value(): number {
        return parseFloat(this.menuItem.price) * this.quantity;
    }
}
