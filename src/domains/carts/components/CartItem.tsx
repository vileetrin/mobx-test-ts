import {observer} from 'mobx-react-lite';
import {useStore} from '../../../infrastructure/StoreContext.ts';
import css from './FirstCart.module.css';
import {useMemo} from "react";
import {CartPageVM} from "../ViewModels/CartPageVM.ts";

const CartItem = observer(({cart}) => {
    const {cartModel} = useStore();

    const vm = useMemo(() => {
        return new CartPageVM([cartModel])
    }, [])

    // const handleCheckout = () => {
    //     const orderDetails: string = cartModel.getCart1
    //         .map(
    //             (item): string =>
    //                 `Name: ${item.name}, Price: $${item.price}, Quantity: ${item.amount}`
    //         )
    //         .join('\n');
    //
    //     alert(`Order details:\n${orderDetails}\nTotal Price: $${cartStore.totalPriceWithDiscount('cart1').toFixed(2)}`);
    // };

    return (
        <div className={css.container} id="firstCart">
            <h1>Cart {cart.cartId}</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <ul className={css.list}>
                        {cart.map((cart) => (
                            <li key={cart.cartId} className={css.item}>
                                <img src={cart.image} alt={cart.name} className={css.img}/>
                                <h3>{cart.name}</h3>
                                {/*<div className={css.amountContainer}>*/}
                                {/*    <p>Кількість:</p>*/}
                                {/*    <div className={css.btnContainer}>*/}
                                {/*        <button*/}
                                {/*            onClick={() => cartStore.decreaseQuantity(product.id, 'cart1')}*/}
                                {/*            className={css.btn}*/}
                                {/*        >*/}
                                {/*            -*/}
                                {/*        </button>*/}
                                {/*        <p>{product.amount}</p>*/}
                                {/*        <button*/}
                                {/*            onClick={() => cartStore.increaseQuantity(product.id, 'cart1')}*/}
                                {/*            className={css.btn}*/}
                                {/*        >*/}
                                {/*            +*/}
                                {/*        </button>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                {/*<p>Price: {product.price}$</p>*/}
                                {/*<button*/}
                                {/*    onClick={() => cartStore.removeFromCart(product.id, 'cart1')}*/}
                                {/*    className={css.button}*/}
                                {/*>*/}
                                {/*    Видалити з кошика*/}
                                {/*</button>*/}
                            </li>
                        ))}
                    </ul>

                    {/*<h2>Cart №1 Total Price: ${cartStore.totalPriceWithDiscount('cart1').toFixed(2)}</h2>*/}
                    {/*<p>Discount applied: {cartStore.discount('cart1') * 100}%</p>*/}
                    {/*<button onClick={handleCheckout} className={css.button}>*/}
                    {/*    Оформити замовлення*/}
                    {/*</button>*/}
                </>
            )}
        </div>
    );
});

export default CartItem;

