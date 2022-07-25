import React from 'react';
import { useSelector } from 'react-redux';
import { ArrowBack, DeleteSweepOutlined, BookmarkBorderOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { selectFavorite } from '../../store/favorite/selectors';
import { clearFavorite } from '../../store/favorite/slice';
import { useAppDispatch } from '../../store';

import { CartEmpty } from '../../components';
import PizzaItem from '../../components/Pizza/PizzaItem';

import './favorite.scss';

const Favorite: React.FC = () => {
  const { items } = useSelector(selectFavorite);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const onClearFavorite = () => {
    if (window.confirm('Вы хотите очистить закладку!')) {
      dispatch(clearFavorite());
    }
  };
  return (
    <div>
      {items.length > 0 ? (
        <div className="favorite">
          <div className="d-flex align-center justify-between">
            <div className="d-flex align-center">
              <h1 className="d-flex align-center mr-15">
                <BookmarkBorderOutlined /> Закладка
              </h1>
              <Button
                onClick={() => navigate('/')}
                className="favorite__btn"
                variant="contained"
                color="warning">
                <ArrowBack className="favorite__btn-ico" />
              </Button>
            </div>
            <Button onClick={onClearFavorite} color="warning" startIcon={<DeleteSweepOutlined />}>
              Очистить закладку
            </Button>
          </div>
          <div className="pizza__items pt-30 pb-30">
            {items.map((item) => (
              <PizzaItem key={item.id} {...item} />
            ))}
          </div>
        </div>
      ) : (
        <CartEmpty title="Закладка пустая" keyTitleOne="добавляли" keyTitleTwo="добавлять" />
      )}
    </div>
  );
};

export default Favorite;
