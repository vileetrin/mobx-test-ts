import CartModel from "../domains/carts/store/CartModel.ts";

const CARTS_AMOUNT = 4;

const CartsArray: CartModel[] = []

export function handleCartsArray(){
    for (let i = 0; i < CARTS_AMOUNT; i++) {
        const cart = new CartModel();
        cart.cartId = i;
        CartsArray.push(cart)
    }
    return CartsArray;
}
