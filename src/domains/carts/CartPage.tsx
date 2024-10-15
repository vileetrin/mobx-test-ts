import { observer } from 'mobx-react-lite';
import { useStore } from '../../infrastructure/StoreContext.ts';
import css from './CartPage.module.css';
// import FirstCart from "./components/FirstCart/FirstCart.tsx";
// import SecondCart from "./components/SecondCart/SecondCart.tsx";
// import ThirdCart from "./components/ThirdCart/ThirdCart.tsx";
// import Summary from "./components/Summary/Summary.tsx";
import {useMemo} from "react";
import {CartPageVM} from "./ViewModels/CartPageVM.ts";
import CartItem from "./components/CartItem.tsx"

const CartPage = observer(() => {
    const { cartModel } = useStore();

    const vm = useMemo(() => {
        return new CartPageVM([cartModel])
    }, [])

    // const handleCheckout = () => {
    //     const orderDetails: string = cartStore.getMainCart
    //         .map(
    //             (item): string =>
    //                 `Name: ${item.name}, Price: $${item.price}, Quantity: ${item.amount}`
    //         )
    //         .join('\n');
    //     const details = `Order details:\n${orderDetails}\nTotal Price: $${cartStore.totalPriceWithDiscount('main').toFixed(2)}`
    //     alert(details);
    // };

    return (
        <div className={css.container}>
            <ul className={css.navigation}>
                <li className={css.navlink}>
                    <a href="#firstCart" className={css.link}>Cart №1</a>
                </li>
                <li className={css.navlink}>
                    <a href="#secondCart" className={css.link}>Cart №2</a>
                </li>
                <li className={css.navlink}>
                    <a href="#thirdCart" className={css.link}>Cart №3</a>
                </li>
            </ul>
            <ul>
                {vm.getCarts().map((cart) => (
                    <li key={cart.cartId} className={css.item}>
                        <CartItem cart={cart} />
                    </li>
                ))}
            </ul>
            {/*<ul className={css.list}>*/}
            {/*    <FirstCart/>*/}
            {/*    <SecondCart/>*/}
            {/*    <ThirdCart/>*/}
            {/*</ul>*/}
            {/*<div className={css.summaryContainer}>*/}
            {/*    <Summary/>*/}
            {/*    <div className={css.priceContainer}>*/}
            {/*<h2>Total Price: ${cartStore.totalPriceWithDiscount('main').toFixed(2)}</h2>*/}
            {/*<p>Discount applied: {cartStore.discount('main') * 100}%</p>*/}
            {/*<button onClick={handleCheckout} disabled={cartStore.getMainCart.length === 0} className={css.button}>*/}
            {/*    Оформити замовлення*/}
            {/*</button>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
});

export default CartPage;
