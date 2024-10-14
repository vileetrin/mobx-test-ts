import { observer } from 'mobx-react-lite';
import {useStore} from "../../../../infrastructure/StoreContext.ts";
import css from './ProductLIst.module.css';
import {useEffect} from "react";
import AddToCartBtn from "../AddToCartBtn/AddToCartBtn.tsx"

const ProductList = observer(() => {

    const {productsStore} = useStore();
    const products = productsStore.getAllProducts();

    useEffect(() => {
        productsStore.loadProducts()
    }, [])

    return (
        <div className={css.container}>
            <h1>Products</h1>
            <ul className={css.list}>
                {products.map((product, index) => (
                    <li key={index} className={css.item}>
                        <img src={product.image} alt={product.name} className={css.img}/>
                        <div className={css.content}>
                            <h3>{product.name}</h3>
                            <p>Price: {product.price}$</p>
                            <AddToCartBtn productId={product.id}/>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
});

export default ProductList;