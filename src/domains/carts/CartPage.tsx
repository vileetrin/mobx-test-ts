import {observer} from 'mobx-react-lite';
import {useStore} from '../../infrastructure/StoreContext.ts';
import css from './CartPage.module.css';
// import Summary from "./components/Summary/Summary.tsx";
import {useMemo} from 'react';
import {CartPageVM} from './ViewModels/CartPageVM.ts';
import CartItem from './components/CartItem/CartItem.tsx';

const CartPage = observer(() => {
    const {cartsStore, productsStore} = useStore();

    const vm = useMemo(() => {
        return new CartPageVM(cartsStore, productsStore);
    }, [cartsStore]);

    return (
        <div className={css.container}>
            <ul className={css.navigation}>
                {vm.getCarts().map((cart) => {
                    return (
                        <li className={css.navlink} key={cart.name}>
                            <a href={`#${cart.name}`} className={css.link}>{cart.name}</a>
                        </li>
                    );
                })}
            </ul>
            <ul className={css.list}>
                {vm.getCarts().map(cart => (
                    <li key={cart.name} className={css.item}>
                        <CartItem cart={cart}/>
                    </li>
                ))}
            </ul>
            <div className={css.summaryContainer}>
                {/*<Summary summary={vm.getSummary} />*/}
                <div className={css.priceContainer}>
                    <h2>Total Price: ${vm.totalPriceWithDiscount().toFixed(2)}</h2>
                    <p>Discount applied: {(vm.discount() * 100).toFixed(0)}%</p>
                    <button
                        onClick={() => alert(vm.handleCheckout())}
                        disabled={vm.getCarts().every(cart => cart.items.length === 0)}
                        className={css.button}
                    >
                        Оформити замовлення
                    </button>
                </div>
            </div>
        </div>
    );
});

export default CartPage;
