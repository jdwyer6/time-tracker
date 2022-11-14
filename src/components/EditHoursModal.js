import { Modal, Form, Button } from 'react-bootstrap';
import { useState } from 'react';

const EditHoursModal = ({setShow, show, start, end}) => {

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return ( 
        <>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title><h2 className='text-black'>Edit shift</h2></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control
                    type='date'
                    autoFocus 
                />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Start</Form.Label>
                    <Form.Control
                        type='time'
                        placeholder={start}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>End</Form.Label>
                    <Form.Control
                        type='time'
                        placeholder={end}
                        onChange={(e)=>console.log(e.currentTarget.value)}
                    />
                </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
     );
}
 
export default EditHoursModal;