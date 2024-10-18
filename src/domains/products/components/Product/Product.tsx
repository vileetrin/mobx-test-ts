import css from "../../ProductPageController.module.css";
import AddToCartBtn from "../AddToCartBtn/AddToCartBtn.tsx";
import { IProductEntity } from "../../store/Product.ts";
import { useStore } from "../../../../infrastructure/StoreContext.ts";
import { useMemo } from "react";
import { ProductVM } from "../../ViewModels/ProductVM.tsx";

export const Product = ({ product }: { product: IProductEntity }) => {
    const { cartsStore } = useStore();

    const vm = useMemo(() => {
        return new ProductVM(product, cartsStore);
    }, [cartsStore]);

    return (
        <>
            <img src={product.image} alt={product.name} className={css.img} />
            <div className={css.content}>
                <h3>{product.name}</h3>
                <p>Price: {product.price}$</p>
                <AddToCartBtn vm={vm}/>

                {/*{vm.getAvailability(product.id).length > 0 && (*/}
                {/*    // <div className={css.availability}>*/}
                {/*    //     <h4>Наявність в кошиках:</h4>*/}
                {/*    //     <ul>*/}
                {/*    //         {vm.getAvailability(product.id).map((entry, idx) => (*/}
                {/*    //             <li key={product.id + idx}>*/}
                {/*    //                 {entry.cart}: {entry.amount} шт.*/}
                {/*    //             </li>*/}
                {/*    //         ))}*/}
                {/*    //     </ul>*/}
                {/*    // </div>*/}
                {/*)}*/}
            </div>
        </>
    );
};

