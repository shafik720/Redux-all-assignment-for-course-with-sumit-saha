import { ADDPRODUCT, DECREMENTPRODUCT, INCREMENTPRODUCT, UPDATEPRODUCTSTATE } from "./actionIdentifiers"


export const addNewProduct = (productName, productCatagory, price, quantity, img) => {
    return {
        type: ADDPRODUCT,
        payload: {
            productName,
            productCatagory,
            price,
            quantity,
            img,
        }
    }
}

export const decrementProduct = (id) => {
    return{
        type : DECREMENTPRODUCT,
        payload : id
    }
}

export const incrementProduct = (id) => {
    return {
        type : INCREMENTPRODUCT,
        payload : id
    }
}

// this action will update a product quantity when that product will be deleted from cart
export const updateProductState = (id) => {
    return{
        type : UPDATEPRODUCTSTATE,
        payload : id
    }
}