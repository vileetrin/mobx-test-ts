import {observer} from 'mobx-react-lite';
import {useStore} from "../../infrastructure/StoreContext.ts";
import css from './ProductLIst.module.css';
import {useEffect, useMemo} from "react";
import {Product} from "./components/Product/Product.tsx";
import {ProductPageVM} from "./ViewModels/ProductPageVM.tsx";

const ProductPageController = observer(() => {
    const { productsStore } = useStore();

    const vm = useMemo(() => {
        return new ProductPageVM(productsStore)
    }, [])

    useEffect(() => {
        vm.init();
    }, []);

    return (
        <div className={css.container}>
            <h1>Products</h1>
            <ul className={css.list}>
                {vm.getProducts().map((product) => (
                        <Product product={product}/>
                ))}
            </ul>
        </div>
    );
});

export default ProductPageController;
