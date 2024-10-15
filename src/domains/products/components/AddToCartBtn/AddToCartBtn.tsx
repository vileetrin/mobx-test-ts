import css from "../../ProductLIst.module.css";
// @ts-ignore
import Modal from 'react-modal';
import {useState} from "react";

interface AddToCartBtnProps {
  handleClick: (cartType: "cart1" | "cart2" | "cart3") => void;
}

const AddToCartBtn: React.FC<AddToCartBtnProps> = (handleClick) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const closeModal = () => { setIsOpen(false) };
    const openModal = () => { setIsOpen(true) };

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