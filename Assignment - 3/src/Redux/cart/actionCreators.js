import { ADDCART, DECREMENTCART, DELETECART } from "./actionIdentifiers"



export const addToCart = (id, productName, productCatagory, price, img, productOriginalId ) => {
    return {
        type : ADDCART,
        payload : {
            id,
            productName,
            productCatagory,
            price,
            img,
            productId : productOriginalId
        }
    }
}

export const decrementCart = (id) => {
    return{
        type : DECREMENTCART,
        payload : id
    }
}

export const deleteCart = (id) => {
    return{
        type : DELETECART,
        payload : id
    }
}