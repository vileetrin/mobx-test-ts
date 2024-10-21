import {observer} from 'mobx-react-lite';
import css from './CartItem.module.css';
import {useMemo} from 'react';
import CartItemVM from '../../ViewModels/CartItemVM.ts';
import {ICartItem} from '../../store/CartItem.ts';
import {useStore} from '../../../../infrastructure/StoreContext.ts';
import CartModel from '../../Models/CartModel.ts';
import {untracked} from "mobx";

const CartItem = observer(({cart}: { cart: CartModel }) => {
    const {productsStore} = useStore();

    const vm = useMemo(() => new CartItemVM(productsStore, cart), []);

    const cartItems = untracked(() => cart.items)
    const name = untracked(() => cart.name)

    return (
        <div className={css.container} id={name}>
            <h1>{name}</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <ul className={css.list}>
                        {cartItems.map((product: ICartItem) => {
                            const image = untracked(() => vm.getProductById(product.productId).image);
                            const name = untracked(() => vm.getProductById(product.productId).name);
                            const price = untracked(() => vm.getProductById(product.productId).price);
                            return (
                                <li key={product.productId} className={css.item}>
                                    <img src={image}
                                         alt={name} className={css.img}/>
                                    <h3>{name}</h3>
                                    <div className={css.amountContainer}>
                                        <p>Кількість:</p>
                                        <div className={css.btnContainer}>
                                            <button onClick={() => vm.decreaseQuantity(product.productId)}
                                                    className={css.btn}>
                                                -
                                            </button>
                                            <p>{product.amount}</p>
                                            <button onClick={() => vm.increaseQuantity(product.productId)}
                                                    className={css.btn}>
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <p>Price: {price}$</p>
                                    <button onClick={() => vm.removeFromCart(product.productId)}
                                            className={css.button}>
                                        Видалити з кошика
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                    <div className={css.priceContainer}>
                        <h2>{cart.name} Total Price:
                            ${vm.totalPriceWithDiscount.toFixed(2)}</h2>
                        <p>Discount applied: {(vm.discount * 100).toFixed(0)}%</p>
                        <button className={css.button} onClick={() => alert(vm.handleCheckout())}>
                            Оформити замовлення
                        </button>
                    </div>
                </>
            )}
        </div>
    );
});

export default CartItem;