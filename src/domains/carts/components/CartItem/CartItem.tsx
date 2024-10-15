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

    return (
        <div className={css.container} id="firstCart">
            <h1>Cart {cart.cartId}</h1>
            {cart.items.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <ul className={css.list}>
                        {cart.items.map((product) => {
                            const vm = useMemo(() => new CartItemVM(cartStore, cart.cartId, product), [cartStore, cart.cartId, product]);

                            return (
                                <li key={product.id} className={css.item}>
                                    <img src={product.image} alt={product.name} className={css.img} />
                                    <h3>{product.name}</h3>
                                    <div className={css.amountContainer}>
                                        <p>Кількість:</p>
                                        <div className={css.btnContainer}>
                                            <button onClick={() => vm.decreaseQuantity()} className={css.btn}>
                                                -
                                            </button>
                                            <p>{product.amount}</p>
                                            <button onClick={() => vm.increaseQuantity()} className={css.btn}>
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <p>Price: {vm.totalPrice.toFixed(2)}$</p>
                                    <button onClick={() => vm.removeFromCart()} className={css.button}>
                                        Видалити з кошика
                                    </button>
                                </li>
                            );
                        })}
                    </ul>

                    {/*<h2>Cart №1 Total Price: ${cartStore.totalPriceWithDiscount(cart.cartId).toFixed(2)}</h2>*/}
                    {/*<p>Discount applied: {cartStore.discount(cart.cartId) * 100}%</p>*/}
                    {/*<button onClick={() => handleCheckout()} className={css.button}>*/}
                    {/*    Оформити замовлення*/}
                    {/*</button>*/}
                </>
            )}
        </div>
    );
});

export default CartItem;
