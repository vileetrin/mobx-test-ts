import css from '../../ProductPageController.module.css';
import AddToCartBtn from '../AddToCartBtn/AddToCartBtn.tsx';
import {IProductEntity} from '../../store/Product.ts';
import {useStore} from '../../../../infrastructure/StoreContext.ts';
import {useMemo} from 'react';
import {ProductVM} from '../../ViewModels/ProductVM.tsx';
import {observer} from "mobx-react-lite";
import {untracked} from "mobx";

export const Product = observer(({product}: { product: IProductEntity }) => {
    const {cartsStore} = useStore();

    const vm: ProductVM = useMemo((): ProductVM => {
        return new ProductVM(product, cartsStore);
    }, []);

    const availability: { cartName: string, amount: number }[] = vm.availability;
    const key: number = untracked((): number => product.id);
    const name: string = untracked((): string => product.name);
    const image: string = untracked((): string => product.image);
    const price: number = untracked((): number => product.price);

    return (
        <>
            <img src={image} alt={name} className={css.img}/>
            <div className={css.content}>
                <h3>{name}</h3>
                <p>Price: {price}$</p>
                <AddToCartBtn vm={vm}/>
                {availability.length > 0 && (
                    <div className={css.availability}>
                        <h4>Наявність в кошиках:</h4>
                        <ul>
                            {availability.map((entry: { cartName: string, amount: number }) => (
                                <li key={key}>
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

