import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Popup = ({show, handleClose, setShow, image, title, message}) => {

    return ( 
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title className='d-flex'>
                    <div>
                        {title}
                    </div>
                    <div className='mx-3'>
                        {image}
                    </div>
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>{message}</Modal.Body>
                <Modal.Footer>
                    <button className='btn-primary' onClick={handleClose}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
        </>
     );
}
 
export default Popup;