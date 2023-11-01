import React from 'react';
import { useSelector } from 'react-redux';
import CartDiv from './CartDiv/CartDiv';
import ProductContainer from './ProductContainer/ProductContainer';
import ProductForm from './ProductForm/ProductForm';

const Body = () => {
    // getting toggle state to hiding or showing product/cart div
    const toggleState = useSelector((state) => state.toggle);
    let currentToggle = toggleState.currentToggle;
    return (
        <div className="py-16">
            {!currentToggle && <div className="productWrapper">
                <ProductContainer></ProductContainer>
                <ProductForm></ProductForm>
            </div>}

            {currentToggle && <CartDiv></CartDiv>}

        </div>
    );
};

export default Body;