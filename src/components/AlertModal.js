import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const AlertModal = ({handleShow, setShow, show}) => {
    const handleClose = () => setShow(false)
  
    return ( 
        <>
        {/* <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button> */}
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Hold up...</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>It looks like you've already posted hours for today.</p>
            <p className='fst-italic'>(Support for multiple shifts comming soon)</p>
            </Modal.Body>
          <Modal.Footer>
            <Button style={{backgroundColor: '#91AA9D', color: 'white'}} onClick={handleClose}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </>
     );
}
 
export default AlertModal;