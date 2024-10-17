import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../infrastructure/StoreContext.ts';
import css from './CartItem.module.css';
import { useMemo } from 'react';
import CartItemVM from '../../ViewModels/CartItemVM.ts';
import {ICartItem} from "../../store/CartItem.ts";

interface CartProps {
    cart: {
        cartId: string;
        items: ICartItem[];
    };
}

const CartItem = observer(({ cart }: CartProps) => {
    const { cartStore } = useStore();

    const vm = useMemo(() => new CartItemVM(cartStore, cart.cartId), []);

    const handleCheckout = () => {
        const orderDetails: string = vm.getCartByName(cart.cartId)
            .map(
                (item): string =>
                    `Name: ${item.name}, Price: $${item.price}, Quantity: ${item.amount}`
            )
            .join('\n');

        alert(`Order details:\n${orderDetails}\nTotal Price: $${cartStore.totalPriceWithDiscount(cart.cartId).toFixed(2)}`);
    };


    return (
        <div className={css.container} id={cart.cartId}>
            <h1>{cart.cartId}</h1>
            {cart.items.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <ul className={css.list}>
                        {cart.items.map((product) => {
                            return (
                                <li key={product.id} className={css.item}>
                                        <img src={product.image} alt={product.name} className={css.img}/>
                                        <h3>{product.name}</h3>
                                        <div className={css.amountContainer}>
                                            <p>Кількість:</p>
                                            <div className={css.btnContainer}>
                                                <button onClick={() => vm.decreaseQuantity(product.id)} className={css.btn}>
                                                    -
                                                </button>
                                                <p>{product.amount}</p>
                                                <button onClick={() => vm.increaseQuantity(product.id)} className={css.btn}>
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <p>Price: {product.price}$</p>
                                        <button onClick={() => vm.removeFromCart(product.id)} className={css.button}>
                                            Видалити з кошика
                                        </button>
                                </li>
                            );

                        })}
                        <div className={css.priceContainer}>
                            <h2>{cart.cartId} Total Price:
                                ${cartStore.totalPriceWithDiscount(cart.cartId).toFixed(2)}</h2>
                            <p>Discount applied: {cartStore.discount(cart.cartId) * 100}%</p>
                            <button className={css.button} onClick={handleCheckout}>
                                Оформити замовлення
                            </button>
                        </div>
                    </ul>


                </>
            )}
        </div>
    );
});

export default CartItem;
