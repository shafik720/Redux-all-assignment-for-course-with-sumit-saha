import React from 'react';
import { useDispatch } from 'react-redux';
import {addNewProduct} from '../../../Redux/AddProduct/actionCreators'

const ProductForm = () => {
    // --- dispatching action from redux
    const dispatch = useDispatch();
    const addProduct = (e) => {
        e.preventDefault();
        const productName = e.target.productName.value ; 
        const productCatagory = e.target.productCatagory.value;
        const productPrice = e.target.productPrice.value;
        const productQuantity = e.target.productQuantity.value;
        const productImage = e.target.productImage.value;

        dispatch(addNewProduct(productName, productCatagory, productPrice, productQuantity, productImage  ));
    }
    return (
        <div>
            <div className="formContainer">
                <h4 className="formTitle">Add New Product</h4>
                <form className="space-y-4 text-[#534F4F]" id="lws-addProductForm" onSubmit={addProduct}>
                    {/* <!-- product name --> */}
                    <div className="space-y-2">
                        <label htmlFor="lws-inputName">Product Name</label>
                        <input className="addProductInput" id="lws-inputName" type="text" name="productName" required />
                    </div>
                    {/* <!-- product category --> */}
                    <div className="space-y-2">
                        <label htmlFor="lws-inputCategory">Category</label>
                        <input className="addProductInput" id="lws-inputCategory" type="text" name="productCatagory" required />
                    </div>
                    {/* <!-- product image url --> */}
                    <div className="space-y-2">
                        <label htmlFor="lws-inputImage">Image Url</label>
                        <input className="addProductInput" id="lws-inputImage" type="text" name="productImage" required />
                    </div>
                    {/* <!-- price & quantity container --> */}
                    <div className="grid grid-cols-2 gap-8 pb-4">
                        {/* <!-- price --> */}
                        <div className="space-y-2">
                            <label htmlFor="ws-inputPrice">Price</label>
                            <input className="addProductInput" type="number" id="lws-inputPrice" required name="productPrice" />
                        </div>
                        {/* <!-- quantity --> */}
                        <div className="space-y-2">
                            <label htmlFor="lws-inputQuantity">Quantity</label>
                            <input className="addProductInput" type="number" id="lws-inputQuantity" required name="productQuantity" />
                        </div>
                    </div>
                    {/* <!-- submit button --> */}
                    <button type="submit" id="lws-inputSubmit" className="submit">Add Product</button>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;