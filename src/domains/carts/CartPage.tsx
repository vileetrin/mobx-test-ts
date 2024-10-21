import {observer} from 'mobx-react-lite';
import {useStore} from '../../infrastructure/StoreContext.ts';
import css from './CartPage.module.css';
// import Summary from "./components/Summary/Summary.tsx";
import {useMemo} from 'react';
import {CartPageVM} from './ViewModels/CartPageVM.ts';
import CartItem from './components/CartItem/CartItem.tsx';
import {untracked} from "mobx";

const CartPage = observer(() => {
    const {cartsStore, productsStore} = useStore();

    const vm = useMemo(() => {
        return new CartPageVM(cartsStore, productsStore);
    }, []);

    const carts = vm.carts;

    return (
        <div className={css.container}>
            <ul className={css.navigation}>
                {carts.map((cart) => {
                    const name = cart.name;
                    return (
                        <li className={css.navlink} key={name}>
                            <a href={`#${name}`} className={css.link}>{name}</a>
                        </li>
                    );
                })}
            </ul>
            <ul className={css.list}>
                {carts.map(cart => {
                    const name = untracked(() => cart.name)
                    return (
                        <li key={name} className={css.item}>
                            <CartItem cart={cart}/>
                        </li>
                    )
                })}
            </ul>
            <div className={css.summaryContainer}>
                {/*<Summary summary={vm.getSummary} />*/}
                <div className={css.priceContainer}>
                    <h2>Total Price: ${vm.totalPriceWithDiscount.toFixed(2)}</h2>
                    <p>Discount applied: {(vm.discount * 100).toFixed(0)}%</p>
                    {/*<button*/}
                    {/*    onClick={() => alert(vm.handleCheckout())}*/}
                    {/*    disabled={vm.carts.every(cart => cart.items.length === 0)}*/}
                    {/*    className={css.button}*/}
                    {/*>*/}
                    {/*    Оформити замовлення*/}
                    {/*</button>*/}
                </div>
            </div>
        </div>
    );
});

export default CartPage;
