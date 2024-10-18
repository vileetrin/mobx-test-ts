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
    console.log(vm.getProductsById(cart.items), cart.name)
    // console.log(cart.name, cart.items)
    return (
        <div className={css.container} id={cart.name}>
            <h1>{cart.name}</h1>
            {cart.items.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <ul className={css.list}>
                        {cart.items.map((product: ICartItem) => {
                            return (
                                <li key={product.productId} className={css.item}>
                                        <img src={vm.getProductById(product.productId).image} alt={vm.getProductById(product.productId).name} className={css.img}/>
                                        <h3>{vm.getProductById(product.productId).name}</h3>
                                        <div className={css.amountContainer}>
                                            <p>Кількість:</p>
                                            <div className={css.btnContainer}>
                                                <button onClick={() => cart.decreaseQuantity(product.productId)} className={css.btn}>
                                                    -
                                                </button>
                                                <p>{product.amount}</p>
                                                <button onClick={() => cart.increaseQuantity(product.productId)} className={css.btn}>
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <p>Price: {vm.getProductById(product.productId).price}$</p>
                                        <button onClick={() => cart.removeFromCart(product.productId)} className={css.button}>
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
