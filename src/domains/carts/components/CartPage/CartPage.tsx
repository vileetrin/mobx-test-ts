import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../infrastructure/StoreContext.ts';
import css from './CartPage.module.css';
import FirstCart from "../FirstCart/FirstCart.tsx";
import SecondCart from "../SecondCart/SecondCart.tsx";
import ThirdCart from "../ThirdCart/ThirdCart.tsx";
import Summary from "../Summary/Summary.tsx";

const CartPage = observer(() => {
    const { cartStore } = useStore();

    const handleCheckout = () => {
        const orderDetails: string = cartStore.getMainCart
            .map(
                (item): string =>
                    `Name: ${item.name}, Price: $${item.price}, Quantity: ${item.amount}`
            )
            .join('\n');
        const details = `Order details:\n${orderDetails}\nTotal Price: $${cartStore.totalPriceWithDiscount('main').toFixed(2)}`
        alert(details);
    };

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
            <ul className={css.list}>
                <FirstCart/>
                <SecondCart/>
                <ThirdCart/>
            </ul>
            <div className={css.summaryContainer}>
                <Summary/>
                <div className={css.priceContainer}>
            <h2>Total Price: ${cartStore.totalPriceWithDiscount('main').toFixed(2)}</h2>
            <p>Discount applied: {cartStore.discount('main') * 100}%</p>
            <button onClick={handleCheckout} disabled={cartStore.getMainCart.length === 0} className={css.button}>
                Оформити замовлення
            </button>
                </div>
            </div>
        </div>
    );
});

export default CartPage;
