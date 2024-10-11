import { observer } from 'mobx-react-lite';
import {useStore} from "../../store/storeContext.ts";
import css from './ProductLIst.module.css';
import {useEffect} from "react";

const ProductList = observer(() => {

    const {productsStore, cartStore} = useStore();
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
                            <button onClick={() => cartStore.addToCart(product.id)} className={css.btn}>Додати в кошик</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
});

export default ProductList;