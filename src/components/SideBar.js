import React, { useState } from 'react';
import {Button, Form} from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaUserAlt } from 'react-icons/fa';

const SideBar = ({handleShow, show, handleClose}) => {

    return ( 
        <>
        
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title><FaUserAlt /> New Employee</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control placeholder="Enter username"/>
                            <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password"/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Business Name</Form.Label>
                            <Form.Control placeholder="Enter your business name" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Keep me posted with email updates" />
                        </Form.Group>

                        <Button className='button-main' variant="primary" type="submit">
                            Register
                        </Button>
                    </Form>
                </Offcanvas.Body>
            </Offcanvas>
      </>
     );
}
 
export default SideBar;