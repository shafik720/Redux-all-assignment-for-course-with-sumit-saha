import React from 'react';
import { useSelector } from 'react-redux';
import CartCard from './CartCard/CartCard';

const CartDetails = () => {
    // getting currest state details for CART
    const cartState = useSelector((state) => state.cart);
    // console.log(cartState)
    return (
        <div>
            {
                cartState.map(cart =><CartCard
                    key = {cart.id}
                    cart = {cart}
                ></CartCard>)
            }
        </div>
    );
};

export default CartDetails;