import { observer } from 'mobx-react-lite';
import { useStore } from '../../infrastructure/StoreContext.ts';
import css from './CartPage.module.css';
import Summary from "./components/Summary/Summary.tsx";
import { useMemo } from "react";
import { CartPageVM } from "./ViewModels/CartPageVM.ts";
import CartItem from "./components/CartItem/CartItem.tsx";

const CartPage = observer(() => {
    const { cartStore } = useStore();

    const vm = useMemo(() => {
        return new CartPageVM(cartStore);
    }, [cartStore]);

    const handleCheckout = () => {
        const orderDetails: string = vm.getCarts()
            .flatMap(cart => cart.items.map(item => `Name: ${item.name}, Price: $${item.price}, Quantity: ${item.amount}`))
            .join('\n');

        const details = `Order details:\n${orderDetails}\nTotal Price: $${vm.getCarts().reduce((sum, cart) => sum + cart.totalPriceWithDiscount, 0).toFixed(2)}`;
        alert(details);
    };

    return (
        <div className={css.container}>
            <ul className={css.navigation}>
                <li className={css.navlink}>
                    <a href="#cart1" className={css.link}>Cart №1</a>
                </li>
                <li className={css.navlink}>
                    <a href="#cart2" className={css.link}>Cart №2</a>
                </li>
                <li className={css.navlink}>
                    <a href="#cart3" className={css.link}>Cart №3</a>
                </li>
            </ul>
            <ul>
                {vm.getCarts().map(cart => (
                    <li key={cart.cartId} className={css.item}>
                        <CartItem cart={cart} />
                    </li>
                ))}
            </ul>
            <div className={css.summaryContainer}>
                <Summary />
                <div className={css.priceContainer}>
                    <h2>Total Price: ${vm.getCarts().reduce((sum, cart) => sum + cart.totalPriceWithDiscount, 0).toFixed(2)}</h2>
                    <p>Discount applied: {vm.getCarts().reduce((sum, cart) => sum + cart.discount * 100, 0)}%</p>
                    <button onClick={handleCheckout} disabled={vm.getCarts().every(cart => cart.items.length === 0)} className={css.button}>
                        Оформити замовлення
                    </button>
                </div>
            </div>
        </div>
    );
});

export default CartPage;
