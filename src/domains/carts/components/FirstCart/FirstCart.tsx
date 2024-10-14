import {observer} from 'mobx-react-lite';
import {useStore} from '../../../../infrastructure/StoreContext.ts';
import css from './FirstCart.module.css';

const FirstCart = observer(() => {
    const {cartStore} = useStore();

    const handleCheckout = () => {
        const orderDetails: string = cartStore.getCart1
            .map(
                (item): string =>
                    `Name: ${item.name}, Price: $${item.price}, Quantity: ${item.amount}`
            )
            .join('\n');

        alert(`Order details:\n${orderDetails}\nTotal Price: $${cartStore.totalPriceWithDiscount('cart1').toFixed(2)}`);
    };

    return (
        <div className={css.container} id="firstCart">
            <h1>Cart №1</h1>
            {cartStore.getCart1.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <ul className={css.list}>
                        {cartStore.getCart1.map((product) => (
                            <li key={product.id} className={css.item}>
                                <img src={product.image} alt={product.name} className={css.img}/>
                                <h3>{product.name}</h3>
                                <div className={css.amountContainer}>
                                    <p>Кількість:</p>
                                    <div className={css.btnContainer}>
                                        <button
                                            onClick={() => cartStore.decreaseQuantity(product.id, 'cart1')}
                                            className={css.btn}
                                        >
                                            -
                                        </button>
                                        <p>{product.amount}</p>
                                        <button
                                            onClick={() => cartStore.increaseQuantity(product.id, 'cart1')}
                                            className={css.btn}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <p>Price: {product.price}$</p>
                                <button
                                    onClick={() => cartStore.removeFromCart(product.id, 'cart1')}
                                    className={css.button}
                                >
                                    Видалити з кошика
                                </button>
                            </li>
                        ))}
                    </ul>

                    <h2>Cart №1 Total Price: ${cartStore.totalPriceWithDiscount('cart1').toFixed(2)}</h2>
                    <p>Discount applied: {cartStore.discount('cart1') * 100}%</p>
                    <button onClick={handleCheckout} className={css.button}>
                        Оформити замовлення
                    </button>
                </>
            )}
        </div>
    );
});

export default FirstCart;

