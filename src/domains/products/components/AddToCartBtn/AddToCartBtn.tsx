import css from '../../ProductPageController.module.css';
// @ts-ignore
import Modal from 'react-modal';
import React, { useState } from 'react';
import { ProductVM } from '../../ViewModels/ProductVM.tsx';
import CartListItem from '../CartListItem/CartListItem.tsx';

interface AddToCartBtnProps {
  vm: ProductVM;
}

const AddToCartBtn: React.FC<AddToCartBtnProps> = ({ vm }: AddToCartBtnProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <div>
      <button onClick={openModal} className={css.btn}>Додати в кошик</button>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
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
        {vm.carts.map((cart) => (
          <CartListItem key={cart.name} productId={vm.product.id} cart={cart} onAddedToCart={() => {
            closeModal();
          }} />
        ))}
      </Modal>
    </div>
  );
};

export default AddToCartBtn;