import { ProductModel } from '../../interfaces/product.interface';
import { SortEnum } from './Sort.props';

export type SortActions = { type: SortEnum.Price } | { type: SortEnum.Raiting };
export type SortReducer = (
	state: SortReduserState,
	action: SortActions
) => SortReduserState;

export interface SortReduserState {
	sort: SortEnum;
	products: ProductModel[];
}

export const sortReducer: SortReducer = (
	state: SortReduserState,
	action: SortActions
): SortReduserState => ({
	sort: action.type,
	products:
		action.type === SortEnum.Price
			? state.products.sort((a, b) => a.price - b.price)
			: state.products.sort((a, b) => b.initialRating - a.initialRating),
});
