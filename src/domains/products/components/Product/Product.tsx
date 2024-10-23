import css from '../../ProductPageController.module.css';
import AddToCartBtn from '../AddToCartBtn/AddToCartBtn.tsx';
import { IProductEntity } from '../../store/Product.ts';
import { useStore } from '../../../../infrastructure/StoreContext.ts';
import { useMemo } from 'react';
import { ProductVM } from '../../ViewModels/ProductVM.tsx';
import { observer } from 'mobx-react-lite';
import { untracked } from 'mobx';


export const Product = observer(({ product }: { product: IProductEntity }) => {
  const { cartsStore } = useStore();

  const vm: ProductVM = useMemo((): ProductVM => {
    return new ProductVM(product, cartsStore);
  }, []);

  const key: number = untracked((): number => product.id);
  
  return (
    <>
      <img src={product.image} alt={product.name} className={css.img} />
      <div className={css.content}>
        <h3>{product.name}</h3>
        <p>Price: {product.price}$</p>
        <AddToCartBtn vm={vm} />

        {vm.availability.length > 0 && (
          <div className={css.availability}>
            <h4>Наявність в кошиках:</h4>
            <ul>
              {vm.availability.map((entry: { cartName: string, amount: number }) => (
                <li key={key + Math.random()}>
                  {entry.cartName}: {entry.amount} шт.
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
});

