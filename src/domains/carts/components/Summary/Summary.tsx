import {useStore} from "../../../../infrastructure/StoreContext.ts";
import css from "./Summary.module.css";

const Summary = () => {
    const {cartStore} = useStore()
    return (
        <div className={css.container}>
            <h2>Summary</h2>
            <ul>
        {cartStore.getMainCart.map((item) => (
            <li key={item.id} className={css.listItem}>
                <div>
                <p>Name: {item.name}</p>
                <p>Price: {item.price}$</p>
                <p>Amount: {item.amount}</p>
                </div>
                <img src={item.image} alt={item.name} className={css.img}/>

            </li>
        ))}
            </ul>
        </div>
    );
}

export default Summary