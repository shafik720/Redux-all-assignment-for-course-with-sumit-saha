import React from 'react';
import './Modal.css';


const Modal = (props) => {
    if (!props.show) {
        return null;
    }
    return (
        <div className="modal-parent active">
            <div className="modal">
                {props.children}
            </div>
        </div>
    );
};

export default Modal;