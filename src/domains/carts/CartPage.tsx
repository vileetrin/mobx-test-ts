import { observer } from 'mobx-react-lite';
import { useStore } from '../../infrastructure/StoreContext.ts';
import css from './CartPage.module.css';
import Summary from './components/Summary/Summary.tsx';
import { useMemo } from 'react';
import { CartPageVM } from './ViewModels/CartPageVM.ts';
import CartItem from './components/CartItem/CartItem.tsx';
import { untracked } from 'mobx';
import CartsNavLink from './components/CartsNavLink/CartsNavLink.tsx';
import CartModel from './Models/CartModel';

const CartPage = observer(() => {
  const { cartsStore, productsStore } = useStore();

  const vm = useMemo(() => {
    return new CartPageVM(cartsStore, productsStore);
  }, []);


  return (
    <div className={css.container}>
      <ul className={css.navigation}>
        {vm.carts.map((cart: CartModel) => {
          const name: string = untracked((): string => cart.name);
          return (
            <CartsNavLink cart={cart} key={name} />
          );
        })}
      </ul>
      <ul className={css.list}>
        {vm.carts.map((cart: CartModel) => {
          const name: string = untracked((): string => cart.name);
          return (
            <li key={name} className={css.item}>
              <CartItem cart={cart} />
            </li>
          );
        })}
      </ul>
      <Summary vm={vm} />
    </div>
  );
});

export default CartPage;
