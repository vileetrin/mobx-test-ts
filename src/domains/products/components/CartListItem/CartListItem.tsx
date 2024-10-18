import CartModel from "../../../carts/Models/CartModel.ts";

const CartListItem = ({cart, onAddedToCart, productId}: {productId: number, cart: CartModel, onAddedToCart: () => void}) => {
    const _onAddedToCart = () => {
        cart.addToCart(productId)
        onAddedToCart()
    }

    return <button onClick={_onAddedToCart}>{cart.name}</button>

}

export default CartListItem;