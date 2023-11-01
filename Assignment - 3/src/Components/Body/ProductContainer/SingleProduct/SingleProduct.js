import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrementProduct } from '../../../../Redux/AddProduct/actionCreators';
import { addToCart } from '../../../../Redux/cart/actionCreators';

const SingleProduct = ({ product }) => {
    const { id, productName, productCatagory, price, quantity, img } = product;

    const cartState = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const addCart = () => {
        dispatch(addToCart(id, productName, productCatagory, price, img));
        dispatch(decrementProduct(id));
    }
    return (
        <div className="lws-productCard">
            <img className="lws-productImage" src={img} alt="product" />
            <div className="p-4 space-y-2">
                <h4 className="lws-productName">{productName}</h4>
                <p className="lws-productCategory">{productCatagory}</p>
                <div className="flex items-center justify-between pb-2">
                    <p className="productPrice">BDT <span className="lws-price">{price}</span></p>
                    <p className="productQuantity">QTY <span className="lws-quantity">{quantity}</span></p>
                </div>
                <button disabled={quantity <= 0} onClick={addCart} className="lws-btnAddToCart">Add To Cart</button>
            </div>
        </div>
    );
};

export default SingleProduct;