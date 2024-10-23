import { observer } from 'mobx-react-lite';
import css from './CartItem.module.css';
import { useMemo } from 'react';
import CartItemVM from '../../ViewModels/CartItemVM.ts';
import { ICartItem } from '../../store/CartItem.ts';
import { useStore } from '../../../../infrastructure/StoreContext.ts';
import CartModel from '../../Models/CartModel.ts';
import { untracked } from 'mobx';

const CartItem = observer(({ cart }: { cart: CartModel }) => {
  const { productsStore } = useStore();

  const vm = useMemo(() => new CartItemVM(productsStore, cart), []);

  return (
    <div className={css.container} id={cart.name}>
      <h1>{cart.name}</h1>
      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className={css.list}>
            {cart.items.map((product: ICartItem) => {
              // const { image, name, price } = untracked(() => {
              //   const productDetails = vm.getProductById(product.productId);
              //   return {
              //     image: productDetails.image,
              //     name: productDetails.name,
              //     price: productDetails.price,
              //   };
              // });
              const key = untracked(() => product.productId);
              const foundProduct = vm.getProductById(product.productId);

              return (
                <li key={key} className={css.item}>
                  <img src={foundProduct.image}
                       alt={foundProduct.name} className={css.img} />
                  <h3>{foundProduct.name}</h3>
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
                  <p>Price: {foundProduct.price}$</p>
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

