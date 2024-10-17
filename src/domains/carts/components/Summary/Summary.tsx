import css from "./Summary.module.css";

interface SummaryProps {
    mainCart: {
        id: number,
        amount: number,
        price: number,
        name: string,
        image: string,
    }[];
}

const Summary = ({mainCart}: SummaryProps) => {

    return (
        <div className={css.container}>
            <h2>Summary</h2>
            <ul>
        {mainCart.map((item) => (
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

