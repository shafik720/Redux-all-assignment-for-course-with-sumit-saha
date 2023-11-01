import { ADDCART, DECREMENTCART, DELETECART } from "./actionIdentifiers";
import { initialState } from "./initialState";


export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADDCART:
            const existedId = state.find(cart => cart.id === action.payload.id);
            if (existedId) {
                return state.map(cart => cart.id === existedId.id ?
                    {
                        ...cart,
                        cartQuantity
                            : cart.cartQuantity + 1,
                        get totalSingleProductPrice() {
                            return this.cartQuantity * this.singleProductprice;
                        }
                    }
                    : cart)
            } else {
                return [
                    ...state,
                    {
                        id: action.payload.id,
                        productName: action.payload.productName,
                        productCatagory: action.payload.productCatagory,
                        singleProductprice: action.payload.price,
                        cartQuantity: 1,
                        img: action.payload.img,
                        get totalSingleProductPrice() {
                            return this.cartQuantity * this.singleProductprice;
                        }
                    }
                ]
            }

        case DECREMENTCART:
            return state.map(cart => {
                if (cart.id === action.payload) {
                    if (cart.cartQuantity > 0) {
                        return {
                            ...cart,
                            cartQuantity: cart.cartQuantity - 1,
                            get totalSingleProductPrice() {
                                return this.cartQuantity * this.singleProductprice;
                            }
                        }
                    } else {
                        return cart;
                    }
                } else {
                    return cart;
                }
            });

        case DELETECART:
            return state.filter(cart => cart.id !== action.payload);

        default:
            return state;
    }
}
