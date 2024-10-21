import css from '../../CartPage.module.css';
import CartModel from '../../Models/CartModel.ts';
import { observer } from 'mobx-react-lite';

const CartsNavLink = observer(({ cart }: { cart: CartModel }) => {
  return (
    <li className={css.navlink} key={cart.name}>
      <a href={`#${cart.name}`} className={css.link}>{cart.name}</a>
    </li>
  );
});

export default CartsNavLink;