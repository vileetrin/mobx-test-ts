import css from "../../ProductPageController.module.css";
// @ts-ignore
import Modal from 'react-modal';
import React from "react";

interface AddToCartBtnProps {
    setOpen: () => void;
    setClose: () => void;
    isOpen: boolean;
    handleClick: (cartType: "cart1" | "cart2" | "cart3") => void;
}

const AddToCartBtn: React.FC<AddToCartBtnProps> = ({setOpen, setClose, isOpen, handleClick}:AddToCartBtnProps) => {

    return (
        <div>
            <button onClick={setOpen} className={css.btn}>Додати в кошик</button>
            <Modal
                isOpen={isOpen}
                onRequestClose={setClose}
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