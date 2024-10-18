import { observer } from 'mobx-react-lite';
import css from './CartItem.module.css';
import { useMemo } from 'react';
import CartItemVM from '../../ViewModels/CartItemVM.ts';
import {ICartItem} from "../../store/CartItem.ts";
import {useStore} from "../../../../infrastructure/StoreContext.ts";
import CartModel from "../../Models/CartModel.ts";

const CartItem = observer(({ cart } : { cart: CartModel }) => {
    const {productsStore} = useStore();

    const vm = useMemo(() => new CartItemVM(productsStore), []);

    return (
        <div className={css.container} id={cart.name}>
            <h1>{cart.name}</h1>
            {cart.items.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <ul className={css.list}>
                        {cart.items.map((cartItem: ICartItem) => {
                            // --- cartItem
                            // productId: number
                            // amount: number;
                            // --- product
                            // id: number;
                            // name: string;
                            // price: number;
                            // image: string;

                            const product = vm.getProductById(cartItem.productId)
                            return (
                                <li key={cartItem.productId} className={css.item}>
                                        <img src={product.image} alt={product.name} className={css.img}/>
                                        <h3>{product.name}</h3>
                                        <div className={css.amountContainer}>
                                            <p>Кількість:</p>
                                            <div className={css.btnContainer}>
                                                <button onClick={() => cart.decreaseQuantity(cartItem.productId)} className={css.btn}>
                                                    -
                                                </button>
                                                <p>{cartItem.amount}</p>
                                                <button onClick={() => cart.increaseQuantity(cartItem.productId)} className={css.btn}>
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <p>Price: {product.price}$</p>
                                        <button onClick={() => cart.removeFromCart(cartItem.productId)} className={css.button}>
                                            Видалити з кошика
                                        </button>
                                </li>
                            );

                        })}
                        {/*<div className={css.priceContainer}>*/}
                        {/*    <h2>{cart.name} Total Price:*/}
                        {/*        ${cartStore.totalPriceWithDiscount(cart.cartId).toFixed(2)}</h2>*/}
                        {/*    <p>Discount applied: {cartStore.discount(cart.cartId) * 100}%</p>*/}
                        {/*    <button className={css.button} onClick={() => alert(vm.handleCheckout())}>*/}
                        {/*        Оформити замовлення*/}
                        {/*    </button>*/}
                        {/*</div>*/}
                    </ul>


                </>
            )}
        </div>
    );
});

export default CartItem;
