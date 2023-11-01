import { ADDPRODUCT, DECREMENTPRODUCT, INCREMENTPRODUCT, UPDATEPRODUCTSTATE } from "./actionIdentifiers";
import { initialState } from "./initialState";

const newId = (totalProduct) => {
    const maxId = totalProduct.reduce((maxID, index)=>Math.max(maxID, index.id), 2)
    return maxId + 1;
}

export const productReducer = (state = initialState, action) => {
    if (action.type === ADDPRODUCT) {
        return [
            ...state,
            {
                id: newId(state),
                productName: action.payload.productName,
                productCatagory: action.payload.productCatagory,
                price: action.payload.price,
                quantity: action.payload.quantity,
                initialQuantity : action.payload.quantity,
                img: action.payload.img
            }
        ]
    } else if(action.type === DECREMENTPRODUCT){
        return state.map(product => {
            if(product.id == action.payload){
                if(product.quantity>0){
                    return {...product, quantity : product.quantity - 1}
                }else{
                    return product;
                }
            }else{
                return product;
            }
        })
    }else if(action.type === INCREMENTPRODUCT){
        return state.map(product => {
            if(product.id == action.payload){
                return {...product, quantity : product.quantity + 1}
            }else{
                return product;
            }
        })
    }else if(action.type === UPDATEPRODUCTSTATE){
        return state.map(product => {
            if(product.id === action.payload){
                return {...product, quantity : product.initialQuantity}
            }else{
                return product;
            }
        })
    }
    
    else {
        return state;
    }
}