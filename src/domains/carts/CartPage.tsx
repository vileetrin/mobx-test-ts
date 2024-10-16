import { observer } from 'mobx-react-lite';
import { useStore } from '../../infrastructure/StoreContext.ts';
import css from './CartPage.module.css';
// import Summary from "./components/Summary/Summary.tsx";
import { useMemo } from "react";
import { CartPageVM } from "./ViewModels/CartPageVM.ts";
import CartItem from "./components/CartItem/CartItem.tsx";

const CartPage = observer(() => {
    const { cartsStore } = useStore();

    const vm = useMemo(() => {
        return new CartPageVM(cartsStore);
    }, [cartsStore]);

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
            <ul className={css.list}>
                {vm.getCarts().map(cart => (
                    <li key={cart.name} className={css.item}>
                        <CartItem cart={cart} />
                    </li>
                ))}
            </ul>
            <div className={css.summaryContainer}>
                {/*<Summary summary={vm.getSummary} />*/}
                {/*<div className={css.priceContainer}>*/}
                {/*    <h2>Total Price: ${vm.totalPriceWithDiscount().toFixed(2)}</h2>*/}
                {/*    <p>Discount applied: {vm.mainDiscount() * 100}%</p>*/}
                {/*    <button onClick={() => alert(vm.handleCheckout())} disabled={vm.getCarts().every(cart => cart.items.length === 0)} className={css.button}>*/}
                {/*        Оформити замовлення*/}
                {/*    </button>*/}
                {/*</div>*/}
            </div>
        </div>
    );
});

export default CartPage;
