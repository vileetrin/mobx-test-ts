import css from '../../CartPage.module.css';
import { observer } from 'mobx-react-lite';
import { CartPageVM } from '../../ViewModels/CartPageVM';
import CartModel from '../../Models/CartModel';

interface SummaryProps {
  vm: CartPageVM;
}

const Summary = observer(({ vm }: SummaryProps) => {
  return (
    <div className={css.summaryContainer}>
      <div className={css.priceContainer}>
        <h2>Total Price: ${vm.totalPriceWithDiscount.toFixed(2)}</h2>
        <p>Discount applied: {(vm.discount * 100).toFixed(0)}%</p>
        <button
          onClick={(): void => alert(vm.handleCheckout())}
          disabled={vm.carts.every((cart: CartModel): boolean => cart.items.length === 0)}
          className={css.button}
        >
          Оформити замовлення
        </button>
      </div>
    </div>
  );
});

export default Summary;


// import css from "./Summary.module.css";
//
// interface SummaryProps {
//     mainCart: {
//         id: number,
//         amount: number,
//         price: number,
//         name: string,
//         image: string,
//     }[];
// }
//
// const Summary = ({mainCart}: SummaryProps) => {
//
//     return (
//         <div className={css.container}>
//             <h2>Summary</h2>
//             <ul>
//         {mainCart.map((item) => (
//             <li key={item.id} className={css.listItem}>
//                 <div>
//                 <p>Name: {item.name}</p>
//                 <p>Price: {item.price}$</p>
//                 <p>Amount: {item.amount}</p>
//                 </div>
//                 <img src={item.image} alt={item.name} className={css.img}/>
//
//             </li>
//         ))}
//             </ul>
//         </div>
//     );
// }
//
// export default Summary
//

