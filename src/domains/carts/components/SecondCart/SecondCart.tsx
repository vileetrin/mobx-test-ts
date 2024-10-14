import {observer} from 'mobx-react-lite';
import {useStore} from '../../../../infrastructure/StoreContext.ts';
import css from './SecondCart.module.css';

const SecondCart = observer(() => {
    const {cartStore} = useStore();

    const handleCheckout = () => {
        const orderDetails: string = cartStore.getCart2
            .map(
                (item): string =>
                    `Name: ${item.name}, Price: $${item.price}, Quantity: ${item.amount}`
            )
            .join('\n');

        alert(`Order details:\n${orderDetails}\nTotal Price: $${cartStore.totalPriceWithDiscount.toFixed(2)}`);
    };

    return (
        <div className={css.container} id="secondCart">
            <h1>Cart №2</h1>
            {cartStore.getCart2.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul className={css.list}>
                    {cartStore.getCart2.map((product) => (
                        <li key={product.id} className={css.item}>
                            <img src={product.image} alt={product.name} className={css.img}/>
                            <h3>{product.name}</h3>
                            <div className={css.amountContainer}>
                                <p>Кількість:</p>
                                <div className={css.btnContainer}>
                                    <button
                                        onClick={() => cartStore.decreaseQuantity(product.id, 'cart2')}
                                        className={css.btn}
                                    >
                                        -
                                    </button>
                                    <p>{product.amount}</p>
                                    <button
                                        onClick={() => cartStore.increaseQuantity(product.id, 'cart2')}
                                        className={css.btn}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <p>Price: {product.price}$</p>
                            <button
                                onClick={() => cartStore.removeFromCart(product.id, 'cart2')}
                                className={css.button}
                            >
                                Видалити з кошика
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            <h2>Cart №2 Total Price: ${cartStore.totalPriceWithDiscount.toFixed(2)}</h2>
            <p>Discount applied: {cartStore.discount * 100}%</p>
            <button onClick={handleCheckout} disabled={cartStore.getCart1.length === 0} className={css.button}>
                Оформити замовлення
            </button>
        </div>
    );
});

export default SecondCart;
