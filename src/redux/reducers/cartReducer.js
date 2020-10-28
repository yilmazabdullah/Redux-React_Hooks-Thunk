//reducer bizim state yönetimi yaptığımız yedir.
import * as actionTypes from '../actions/actionTypes';
import initialState from './initialState';

export default function cartReducer(state = initialState.cart, action) {
	switch (action.type) {
		case actionTypes.ADD_TO_CART:
			var addedItem = state.find((c) => c.product.productID === action.payload.product.productID);
			if (addedItem) {
				var newState = state.map((cartItem) => {
					if (cartItem.product.productID === action.payload.product.productID) {
						return Object.assign({}, addedItem, { quantity: addedItem.quantity + 1 });
					}

					return cartItem;
				});
				return newState;
			} else {
				return [...state, { ...action.payload }];
			}
		case actionTypes.REMOVE_FROM_CART:
			const newState2 = state.filter((cartItem) => cartItem.product.productID !== action.payload.productID);
			return newState2;

		default:
			return state;
	}
}
