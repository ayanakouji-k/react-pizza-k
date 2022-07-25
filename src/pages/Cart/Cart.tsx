import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Stack, IconButton, Button } from '@mui/material';
import {
  AddCircle,
  RemoveCircle,
  CurrencyRuble,
  HighlightOff,
  ShoppingCartOutlined,
  DeleteSweepOutlined,
  ChevronLeft,
} from '@mui/icons-material';

import { CartEmpty } from '../../components';
import { selectCart } from '../../store/cart/selectors';
import { useAppDispatch } from '../../store';

import './cart.scss';
import {
  clearCartPizza,
  addCartPizza,
  minusCartPizza,
  removeCartPizza,
} from '../../store/cart/slice';

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const { cartPizzas, totalCount, totalPrice } = useSelector(selectCart);
  const navigate = useNavigate();

  const onClearCart = () => {
    if (window.confirm('Вы дейтвительно хотите очистить корзину!')) {
      dispatch(clearCartPizza());
    }
  };

  return (
    <div>
      {cartPizzas.length > 0 ? (
        <div className="cart d-flex flex-column">
          <div className="d-flex justify-between align-center mb-30">
            <h1 className="d-flex align-center">
              <ShoppingCartOutlined /> Корзина
            </h1>
            <Button onClick={onClearCart} color="warning" startIcon={<DeleteSweepOutlined />}>
              Очистить корзину
            </Button>
          </div>
          <ul className="cart__items mb-30 flex">
            {cartPizzas.map((item) => (
              <li key={item.uniqueId} className="cart__item d-flex align-center justify-between">
                <div className="d-flex align-center">
                  <img className="mr-15" src={item.img} alt={item.name} />
                  <div className="cart__info">
                    <h3 className="mb-5">{item.name}</h3>
                    <p className="opacity-5">
                      {item.type} тесто, {item.size} см.
                    </p>
                  </div>
                </div>
                <Stack direction="row" spacing={1} className="d-flex align-center">
                  <IconButton
                    onClick={() => dispatch(minusCartPizza(item.uniqueId))}
                    aria-label="minus"
                    disabled={item.count === 1}
                    color="warning">
                    <RemoveCircle fontSize="large" />
                  </IconButton>
                  <h2 className="pl-5 pr-5">{item.count}</h2>
                  <IconButton
                    onClick={() => dispatch(addCartPizza(item.uniqueId))}
                    aria-label="plus"
                    color="warning">
                    <AddCircle fontSize="large" />
                  </IconButton>
                </Stack>
                <h3 className="d-flex align-center">
                  {item.price * item.count} <CurrencyRuble />
                </h3>
                <IconButton
                  onClick={() => dispatch(removeCartPizza(item.uniqueId))}
                  aria-label="delete">
                  <HighlightOff fontSize="large" />
                </IconButton>
              </li>
            ))}
          </ul>
          <div className="d-flex align-center justify-between mb-15">
            <p className="cart__full">
              Всего пицц: <b>{totalCount} шт.</b>
            </p>
            <p className="cart__full">
              Сумма заказа: <b className="cart__full-orange">{totalPrice} ₽</b>
            </p>
          </div>
          <div className="d-flex align-center justify-between mb-30">
            <Button
              onClick={() => navigate('/')}
              color="success"
              variant="outlined"
              startIcon={<ChevronLeft />}>
              Вернуться назад
            </Button>
            <Button color="warning" variant="contained">
              Оплатить сейчас
            </Button>
          </div>
        </div>
      ) : (
        <CartEmpty title="Корзина пустая" keyTitleOne="заказывали" keyTitleTwo="заказать" />
      )}
    </div>
  );
};

export default Cart;
