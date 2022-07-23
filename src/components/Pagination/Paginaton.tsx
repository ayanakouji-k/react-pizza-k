import React from 'react';
import { Pagination } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

import { setFilterPageCount } from '../../store/filter/slice';
import { selectFilter } from '../../store/filter/selectors';
import { selectPizza } from '../../store/pizza/selectors';

import './pagination.scss';

const Paginaton: React.FC = () => {
  const dispatch = useDispatch();
  const { pageCount } = useSelector(selectFilter);
  const { totalCount } = useSelector(selectPizza);
  return (
    <div className="pagination">
      {+totalCount > 5 && (
        <Pagination
          count={Math.round(+totalCount / 4)}
          page={pageCount}
          onChange={(_, page: number) => dispatch(setFilterPageCount(page))}
          color="primary"
        />
      )}
    </div>
  );
};

export default Paginaton;
