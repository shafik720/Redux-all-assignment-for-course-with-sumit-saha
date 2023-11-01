import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../assets/images/logo.png';
import { toggleFalse, toggleTrue } from '../../Redux/ToggleDiv/actionCreators';

const Header = () => {
    // getting cart state
    const cartState = useSelector((state) => state.cart);

    // setting cart quantity
    let initialQuantity = 0;
    cartState.map(cart => initialQuantity = initialQuantity + cart.cartQuantity);

    // ------- showing or hiding cart/product div
    const dispatch = useDispatch();

    const goToCartPage = (e) => {
        // this action will show cart page
        e.preventDefault();
        dispatch(toggleTrue());
    }

    const goToHomePage = () => {
        // this action will show home page
        dispatch(toggleFalse());
    }
    return (
        <nav className="bg-[#171C2A] py-4">
            <div className="navBar">
                <a href="index.html">
                    <img src={logo} alt="LWS" className="max-w-[140px]" />
                </a>

                <div className="flex gap-4">
                    <a href="#home" className="navHome" id="lws-home" onClick={goToHomePage}> Home </a>
                    <a href="cart.html" className="navCart" id="lws-cart" onClick={goToCartPage}>
                        <i className="text-xl fa-sharp fa-solid fa-bag-shopping"></i>
                        <span id="lws-totalCart">{initialQuantity}</span>
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Header;