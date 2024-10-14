import {useStore} from "../../../../infrastructure/StoreContext.ts";
import React, {useState} from "react";
import css from "../ProductList/ProductLIst.module.css";
import Modal from 'react-modal'

interface AddToCartBtnProps {
    productId: number;
}

const AddToCartBtn: React.FC<AddToCartBtnProps> = ({productId}) => {
    const {cartStore} = useStore();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const closeModal = () => { setIsOpen(false) };
    const openModal = () => { setIsOpen(true) };

    const handleClick = (cartType: 'cart1' | 'cart2' | 'cart3') => {
        cartStore.addToCart(productId, cartType);
        closeModal();
    }

    return (
        <div>
            <button onClick={openModal} className={css.btn}>Додати в кошик</button>
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                contentLabel = "Вибір кошика"
                ariaHideApp={false}
                style={{
                        content: {
                            top: '50%',
                            left: '50%',
                            right: 'auto',
                            bottom: 'auto',
                            marginRight: '-50%',
                            transform: 'translate(-50%, -50%)',
                        },
                }}
            >



            <h2>Виберіть кошик</h2>
            <button onClick={() => handleClick('cart1')}>Додати до кошику №1</button>
            <button onClick={() => handleClick('cart2')}>Додати до кошику №2</button>
            <button onClick={() => handleClick('cart3')}>Додати до кошику №3</button>
            </Modal>
        </div>
    )
}

export default AddToCartBtn;