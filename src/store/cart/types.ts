export type TCartObj = {
  id: string;
  img: string;
  name: string;
  size: number;
  type: string;
  price: number;
  count: number;
};
export interface ICartState {
  cartPizzas: TCartObj[];
  totalPrice: number;
  totalCount: number;
}
