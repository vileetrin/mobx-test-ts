import ProductPageController from '../domains/products/ProductPageController.tsx';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CartPage from '../domains/carts/components/CartPage/CartPage.tsx';
import { observer } from 'mobx-react-lite';
import css from "./App.module.css"


const App = observer(() => {
    return (
        <Router>
            <nav className={css.navigation}>
                <Link to="/">Products</Link>
                <Link to="/cart">Cart</Link>
            </nav>

            <Routes>
                <Route path="/" element={<ProductPageController />} />
                <Route path="/cart" element={<CartPage />} />
            </Routes>
        </Router>
    );
});

export default App;