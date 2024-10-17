import css from "../../ProductPageController.module.css";
// @ts-ignore
import Modal from 'react-modal';
import React from "react";

interface AddToCartBtnProps {
    setOpen: () => void;
    setClose: () => void;
    isOpen: boolean;
    handleClick: (cartType: string) => void;
    cartNames: string[];
}

const AddToCartBtn: React.FC<AddToCartBtnProps> = ({ setOpen, setClose, isOpen, handleClick, cartNames }:AddToCartBtnProps) => {
    return (
        <div>
            <button onClick={setOpen} className={css.btn}>Додати в кошик</button>
            <Modal
                isOpen={isOpen}
                onRequestClose={setClose}
                contentLabel="Вибір кошика"
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
                {cartNames.map((cartName) => (
                    <button key={cartName} onClick={() => handleClick(cartName)}>{cartName}</button>
                ))}
            </Modal>
        </div>
    );
};

export default AddToCartBtn;
