import React from 'react';
import { useSelector } from 'react-redux';
import { Modal, Backdrop } from '@mui/material';

import { useAppDispatch } from '../../../store';
import { selectModal } from '../../../store/modal/selectors';
import { getModalId, getPizzaModalThunk, setModalShow } from '../../../store/modal/slice';

import './pizza-modal.scss';
import PizzaModalFade from './PizzaModalFade';

const PizzaModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { modalId, modalShow } = useSelector(selectModal);

  const handleClose = () => {
    dispatch(getModalId(''));
    dispatch(setModalShow(false));
  };

  React.useEffect(() => {
    if (modalId) {
      dispatch(getPizzaModalThunk(modalId));
    }
  }, [modalId]);

  return (
    <div className="pizza-modal">
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalShow}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <PizzaModalFade handleClose={handleClose} />
      </Modal>
    </div>
  );
};

export default PizzaModal;
