import React from 'react';
import BillDiv from './BillDiv/BillDiv';
import CartDetails from './CartDetails/CartDetails';

const CartDiv = () => {
    return (
        <main className="py-16">
            <div className="container 2xl:px-8 px-2 mx-auto">
                <h2 className="mb-8 text-xl font-bold">Shopping Cart</h2>
                <div className="cartListContainer">
                    <div className="space-y-6">
                        {/* <!-- Cart Item Components --> */}
                        <CartDetails></CartDetails>
                    </div>

                    {/* <!-- Bill Details --> */}
                    <BillDiv></BillDiv>
                </div>
            </div>
        </main>
    );
};

export default CartDiv;