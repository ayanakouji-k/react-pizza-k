import React from 'react';
import { useSelector } from 'react-redux';
import { Modal, Backdrop, Fade, Button, Stack, IconButton } from '@mui/material';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import { Cancel } from '@mui/icons-material';

import { useAppDispatch } from '../../../store';
import { selectModal } from '../../../store/modal/selectors';
import { getModalId, getPizzaModalThunk, setModalShow } from '../../../store/modal/slice';
import { setCartPizza } from '../../../store/cart/slice';

import pizzaLoading from '../../../assets/img/pizza-loading.svg';
import './pizza-modal.scss';

const PizzaModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { modalPizzas, modalId, modalShow, modalStatus } = useSelector(selectModal);

  const [indexSize, setIndexSize] = React.useState(1);
  const [indexType, setIndexType] = React.useState(0);

  const handleClose = () => {
    dispatch(getModalId(''));
    dispatch(setModalShow(false));
  };

  const handelIndexSize = (i: number) => {
    setIndexSize(i);
    setIndexType(0);
  };
  const handleIndexType = (i: number) => {
    setIndexType(i);
  };

  const modalPostPizza = () => {
    if (modalPizzas) {
      const newPizzaObj = {
        id: modalId,
        uniqueId: Date.now(),
        img: modalPizzas.imageUrl,
        name: modalPizzas.name,
        size: modalPizzas.sizes[indexSize].size,
        type: modalPizzas.sizes[indexSize].type[indexType].typeName,
        price: modalPizzas.sizes[indexSize].price,
        count: 1,
      };
      toast.success(`Добавлено: ${modalPizzas.name}, ${modalPizzas.sizes[indexSize].size} см`, {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(setCartPizza(newPizzaObj));
      handleClose();
    }
  };

  React.useEffect(() => {
    if (modalId) {
      dispatch(getPizzaModalThunk(modalId));
    }
  }, [modalId]);

  return (
    <div className="pizza-modal">
      {modalPizzas && (
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
          <Fade in={modalShow}>
            <div className="pizza-modal__body">
              <div className="pizza-modal__body-relative d-flex">
                <IconButton
                  onClick={handleClose}
                  aria-label="cancel"
                  className="pizza-modal__body-cancel">
                  <Cancel />
                </IconButton>
                <div className="pizza-modal__body-img d-flex align-center justify-center">
                  <div className="pizza-modal__body-inner d-flex justify-center align-center">
                    <img
                      className={clsx(
                        'pizza-modal__img',
                        indexSize === 0 && 'pizza-modal__img-medium',
                        indexSize === 1 && 'pizza-modal__img-small',
                        indexSize === 2 && 'pizza-modal__img-big',
                      )}
                      src={modalStatus === 'loading' ? pizzaLoading : modalPizzas.imageUrl}
                      alt={modalPizzas.name}
                    />
                  </div>
                </div>
                <div className="pizza-modal__body-info">
                  <h2>{modalPizzas.name}</h2>
                  <p className="opacity-6">
                    {modalPizzas.sizes[indexSize].size} см,{' '}
                    {modalPizzas.sizes[indexSize].type[indexType].typeName} тесто
                  </p>
                  <p className="opacity-6">{modalPizzas.desc}</p>
                  <div className="flex">
                    <div className="pizza-modal__body-category">
                      <Stack direction="row">
                        {modalPizzas.sizes.map((prev, i) => (
                          <Button
                            key={prev.id}
                            className="flex"
                            onClick={() => handelIndexSize(i)}
                            variant={indexSize === i ? 'contained' : 'text'}
                            color="warning">
                            {prev.size}
                          </Button>
                        ))}
                      </Stack>
                      <Stack direction="row">
                        {modalPizzas.sizes[indexSize].type.map((prev, i) => (
                          <Button
                            key={prev.id}
                            className="flex"
                            onClick={() => handleIndexType(i)}
                            disabled={!prev.isShow}
                            variant={indexType === i ? 'contained' : 'text'}
                            color="warning">
                            {prev.typeName}
                          </Button>
                        ))}
                      </Stack>
                    </div>
                  </div>
                  <Button onClick={modalPostPizza} variant="contained" color="warning">
                    Добавить в корзину за {modalPizzas.sizes[indexSize].price} ₽
                  </Button>
                </div>
              </div>
            </div>
          </Fade>
        </Modal>
      )}
    </div>
  );
};

export default PizzaModal;
