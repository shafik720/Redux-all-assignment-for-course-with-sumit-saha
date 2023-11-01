import React from 'react';
import { useSelector } from 'react-redux';
import SingleProduct from './SingleProduct/SingleProduct';

const ProductContainer = () => {
    const productState = useSelector((state) => state.product);
    
    return (
        productState.length <= 0 
        
        ? <div><h1>No Product found</h1></div>

        : <div className="productContainer" id="lws-productContainer">
        {/* <!-- product item --> */}
        {
            productState.map(product => <SingleProduct
                key = {product.id}
                product = {product}
            ></SingleProduct>)
        }
    </div>
    );
};

export default ProductContainer;