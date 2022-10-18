import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const MessageModal = ({show, handleClose, name}) => {
    const [pin, setPin] = useState();

    return ( 
        <>
    
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Hi {name}, please enter your pin to sign in.</Modal.Body>
                <Form.Group className="mb-3 px-3" controlId="formBasicEmail">
                    <Form.Control placeholder="Enter pin" type='password' onChange={(e)=>{setPin(e.target.value)}}/>
                </Form.Group>
                <Modal.Footer>
                    <Button variant="secbutton-secondary" onClick={handleClose}>
                    Close
                    </Button>
                    <Button className='button-main' onClick={handleClose}>
                    Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
      </>
     );
}
 
export default MessageModal;
