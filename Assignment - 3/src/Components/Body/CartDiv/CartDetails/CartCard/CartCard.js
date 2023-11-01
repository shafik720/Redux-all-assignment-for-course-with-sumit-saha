import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrementProduct, incrementProduct, updateProductState } from '../../../../../Redux/AddProduct/actionCreators';
import { addToCart, decrementCart, deleteCart } from '../../../../../Redux/cart/actionCreators';

const CartCard = ({cart}) => {
    const {id, productName, productCatagory, singleProductprice, cartQuantity, img , totalSingleProductPrice } = cart;

    const dispatch = useDispatch();

    const productState = useSelector((state) => state.product);
    const currentId = id;
    const currentProduct = productState.find(product => product.id == currentId);
    

    // decrementing product quantity in Product State when clicking plus(+) button
    const decrementingQty = () => {
        dispatch(decrementProduct(id));
        if(currentProduct.quantity>0){
        dispatch(addToCart(id));
        }
    }

    // incrementing product quantity in Product State when clicking plus(-) button
    const incrementingQty = () => {
        dispatch(incrementProduct(id));
        dispatch(decrementCart(id));
    }

    // deleting cart and after deleting a cart , also updating that product quantity
    const removeCart = () => {
        dispatch(deleteCart(id));
        dispatch(updateProductState(id));
    }
    return (
        <div  className="cartCard mt-4">
            <div className="flex items-center col-span-6 space-x-6">
                {/* <!-- cart image --> */}
                <img className="lws-cartImage" src={img} alt="product" />
                {/* <!-- cart item info --> */}
                <div className="space-y-2">
                    <h4 className="lws-cartName">{productName}</h4>
                    <p className="lws-cartCategory">{productCatagory}</p>
                    <p>BDT <span className="lws-cartPrice">{singleProductprice}</span></p>
                </div>
            </div>
            <div className="flex items-center justify-center col-span-4 mt-4 space-x-8 md:mt-0">
                {/* <!-- amount buttons --> */}
                <div className="flex items-center space-x-4">
                    <button className="lws-incrementQuantity" onClick={decrementingQty}>
                        <i className="text-lg fa-solid fa-plus"></i>
                    </button>
                    <span className="lws-cartQuantity">{cartQuantity}</span>
                    <button disabled={cartQuantity <= 0} className="lws-decrementQuantity" onClick={incrementingQty}>
                        <i className="text-lg fa-solid fa-minus"></i>
                    </button>
                </div>
                {/* <!-- price --> */}
                <p className="text-lg font-bold">BDT <span className="lws-calculatedPrice">{totalSingleProductPrice}</span></p>
            </div>
            {/* <!-- delete button --> */}
            <div className="flex items-center justify-center col-span-2 mt-4 md:justify-end md:mt-0">
                <button className="lws-removeFromCart" onClick={removeCart}>
                    <i className="text-lg text-red-400 fa-solid fa-trash"></i>
                </button>
            </div>
        </div>
    );
};

export default CartCard;