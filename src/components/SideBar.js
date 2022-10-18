import React, { useState } from 'react';
import {Button, Form} from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaUserAlt } from 'react-icons/fa';
import Axios from 'axios';

const SideBar = ({handleShow, show, handleClose}) => {

    const [employeeName, setEmployeeName] = useState();
    const [employeePin, setEmployeePin] = useState();
    const [employeeImg, setEmployeeImg] = useState('images/demo-employees/default.png');

    const tempUser = localStorage.getItem('currentUser');
    const user = JSON.parse(tempUser);

    function handleRegister(e){
        // e.preventDefault();
        Axios.post("http://localhost:3001/addEmployee", {userId: user._id, name: employeeName, pin: employeePin, img: employeeImg})
        .then((response) => {
            alert('An employee has been added to your busines profile.')
        })
    }

    return ( 
        <>
        
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title><FaUserAlt /> New Employee</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Form onSubmit={handleRegister}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control placeholder="Enter the employee's name" onChange={(e)=>setEmployeeName(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Pin</Form.Label>
                            <Form.Control type="password" placeholder="Enter a 4 digit pin" onChange={(e)=>setEmployeePin(e.target.value)}/>
                            <Form.Text className="text-muted">
                                Employees will sign in with their pin before posting hours.
                            </Form.Text>
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