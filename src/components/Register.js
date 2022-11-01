import { useState } from 'react';
import {Button, Form} from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';

const Register = ({handleClose, handleShow, show}) => {

    return ( 
        <>
    
            <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Register your business</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <form onSubmit=''>
                    <div className='d-flex align-items-center my-4'>
                        <Form.Control type='text' id='username' name='username' placeholder='Create a username' className='border-0 border-bottom'/>
                    </div>
                    <div className='d-flex align-items-center my-4'>
                        <Form.Control type='text' id='password' name='password' placeholder='Create a password' className='border-0 border-bottom'/>
                    </div>
                    <div className='d-flex align-items-center my-4'>
                        <Form.Control type='text' id='name' name='name' placeholder='Enter your name' className='border-0 border-bottom'/>
                    </div>
                    <div className='d-flex align-items-center my-4'>
                        <Form.Control type='text' id='name' name='business' placeholder='Enter the name of your business' className='border-0 border-bottom'/>
                    </div>
                    <button className='btn-primary' type='submit'>Register</button>
                    <div className='d-flex justify-content-end py-0 my-0'>
                        <p className='font-small__blue'>Need help?</p>
                    </div>

                </form>
            </Offcanvas.Body>
            </Offcanvas>
        </>
     );
}
 
export default Register;