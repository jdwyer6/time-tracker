import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Popup = ({show, handleClose, setShow, image, title, message}) => {

    return ( 
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title className='d-flex'>
                    <div className='text-white'>
                        {title}
                    </div>
                    <div className='mx-3 text-white'>
                        {image}
                    </div>
                </Modal.Title>
                </Modal.Header>
                <Modal.Body className='text-white'>{message}</Modal.Body>
                <Modal.Footer>
                    <button className='btn-no-style' onClick={handleClose}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
        </>
     );
}
 
export default Popup;