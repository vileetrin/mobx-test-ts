import { observer } from 'mobx-react-lite';
import { useStore } from '../../infrastructure/StoreContext.ts';
import css from './ProductPageController.module.css';
import { useEffect, useMemo } from 'react';
import { ProductPageVM } from './ViewModels/ProductPageVM.tsx';
import { Product } from './components/Product/Product.tsx';
import { untracked } from 'mobx';
import { IProductEntity } from './store/Product';

const ProductPageController = observer(() => {
  const { productsStore } = useStore();

  const vm = useMemo(() => {
    return new ProductPageVM(productsStore);
  }, []);

  useEffect(() => {
    vm.init();
  }, []);

  return (
    <div className={css.container}>
      <h1>Products</h1>
      <ul className={css.list}>
        {vm.products.map((product: IProductEntity) => {
            const key: number = untracked((): number => product.id);
            return (
              <li key={key} className={css.item}>
                <Product product={product} />
              </li>
            );
          },
        )}
      </ul>
    </div>
  );
});

export default ProductPageController;
