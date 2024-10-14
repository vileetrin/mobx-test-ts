import { observer } from 'mobx-react-lite';
import { useStore } from "../../../../infrastructure/StoreContext.ts";
import css from './ProductList.module.css';
import { useEffect } from "react";
import AddToCartBtn from "../AddToCartBtn/AddToCartBtn.tsx";

const ProductList = observer(() => {
    const { productsStore, cartStore } = useStore();
    const products = productsStore.getAllProducts();

    useEffect(() => {
        productsStore.loadProducts();
    }, []);

    return (
        <div className={css.container}>
            <h1>Products</h1>
            <ul className={css.list}>
                {products.map((product, index) => (
                    <li key={index} className={css.item}>
                        <img src={product.image} alt={product.name} className={css.img} />
                        <div className={css.content}>
                            <h3>{product.name}</h3>
                            <p>Price: {product.price}$</p>
                            <AddToCartBtn productId={product.id} />

                            {cartStore.getProductAvailability(product.id).length > 0 && (
                                <div className={css.availability}>
                                    <h4>Наявність в кошиках:</h4>
                                    <ul>
                                        {cartStore.getProductAvailability(product.id).map((entry, idx) => (
                                            <li key={idx}>
                                                {entry.cart}: {entry.amount} шт.
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
});

export default ProductList;
