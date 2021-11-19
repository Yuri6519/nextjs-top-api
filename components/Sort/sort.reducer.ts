import { ProductModel } from '../../interfaces/product.interface';
import { SortEnum } from './Sort.props';

type TInit = { type: 'INIT'; payload: ProductModel[] };

export type SortActions =
	| { type: SortEnum.Price }
	| { type: SortEnum.Raiting }
	| TInit;

export type SortReducer = (
	state: SortReduserState,
	action: SortActions
) => SortReduserState;

export interface SortReduserState {
	sort: SortEnum;
	products: ProductModel[];
}

// export const sortReducer: SortReducer = (
// 	state: SortReduserState,
// 	action: SortActions
// ): SortReduserState => ({
// 	sort: action.type,
// 	products:
// 		action.type === SortEnum.Price
// 			? state.products.sort((a, b) => a.price - b.price)
// 			: state.products.sort((a, b) => b.initialRating - a.initialRating),
// });

// My one
export const sortReducer: SortReducer = (
	state: SortReduserState,
	action: SortActions
): SortReduserState => {
	const products: ProductModel[] =
		action.type === 'INIT' ? action.payload : state.products;

	const sort: SortEnum =
		action.type === 'INIT' ? SortEnum.Raiting : action.type;

	return {
		sort,
		products:
			sort === SortEnum.Price
				? products.sort((a, b) => a.price - b.price)
				: products.sort((a, b) => b.initialRating - a.initialRating),
	};
};
