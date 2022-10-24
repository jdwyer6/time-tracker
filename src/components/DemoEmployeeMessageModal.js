import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const DemoEmployeeMessageModal = ({show, handleClose, name, pin, employee}) => {

    const [enteredPin, setEnteredPin] = useState();
    let navigate = useNavigate();

    const validatePin = () => {
        localStorage.setItem('currentEmployee', JSON.stringify(employee))
        navigate('/clockin');
    }

    return ( 
        <>
    
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Hi {name}, please enter your pin to sign in.
                    <p className='fw-bold text-danger'>(Use any 4 digit number for the demo)</p>
                </Modal.Body>
                {/* {isDemo ? (<p className='text-center' style={{fontSize: '14px'}}>(Use 1234 for the demo.)</p>) : ('')} */}
                <Form onSubmit={validatePin}>
                    <Form.Group className="mb-3 px-3" controlId="formBasicEmail">
                        <Form.Control placeholder="Enter pin" type='password' onChange={(e)=>{setEnteredPin(e.target.value)}}/>
                    </Form.Group>
                    <Modal.Footer>
                        <Button variant="secbutton-secondary" onClick={handleClose}>
                        Close
                        </Button>
                        <Button className='button-main' onClick={validatePin} type='submit'>
                        Continue
                        </Button>
                    </Modal.Footer>
                </Form>


            </Modal>
      </>
     );
}
 
export default DemoEmployeeMessageModal;
