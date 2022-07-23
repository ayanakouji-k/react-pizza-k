import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { api } from './../../api/index';
import { IPizza, TPizzaObj, Status } from './types';
import { IFilterState } from './../filter/types';

export const getPizzaThunk = createAsyncThunk<TPizzaObj[], IFilterState>(
  'pizza/getPizzaThunk',
  async (_params, { dispatch, rejectWithValue }) => {
    const { searchValue, categoryType, sort, pageCount } = _params;
    const category = categoryType === 'all' ? '' : `category=${categoryType}`;
    try {
      const res = await api.get(
        `pizzas?_limit=4&_page=${pageCount}&q=${searchValue}&${category}&_sort=${sort.sortType}&_order=${sort.sortOrder}`,
      );
      dispatch(setTotalCount(res.headers['x-total-count']));
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState: IPizza = {
  items: [],
  totalCount: '',
  status: Status.LOADING,
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setTotalCount(state, { payload }: PayloadAction<string>) {
      state.totalCount = payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getPizzaThunk.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(getPizzaThunk.fulfilled, (state, { payload }) => {
      state.status = Status.SUCCESS;
      state.items = payload;
    });
    builder.addCase(getPizzaThunk.rejected, (state) => {
      state.items = [];
      state.status = Status.ERROR;
    });
  },
});
export const { setTotalCount } = pizzaSlice.actions;
export default pizzaSlice.reducer;
