import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';

const EmployeeDetails = ({show, handleClose, employees, setShow}) => {
    const [currentEmployee, setCurrentEmployee] = useState(employees[0]);
    const [ dataToUpdate, setDataToUpdate ] = useState({
        name: null,
        position: null,
        wage: null,
        admin: null
    });
    const saveUpdates = () => {
        axios.put(`http://clockedin.herokuapp.com/update/${currentEmployee._id}`, {data: dataToUpdate})
        .then((res)=>{
            if(res.status === 200){
              document.location.reload();
            }
          })
          .catch((error)=>{
              console.log(error)
          })
          setShow(false);
    }

    return ( 
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><h2>Employee Settings</h2></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label className='mb-2'><h4 className='mb-0'>Changing details for: </h4></Form.Label>
                    <Dropdown className='mb-3'>
                        <Dropdown.Toggle className='text-white'>
                           {currentEmployee.name}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {employees.map((employee) => (
                                <Dropdown.Item key={employee.username} onClick={()=>setCurrentEmployee(employee)}>{employee.name}</Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label className='mb-0'><h4 className='mb-0'>Name</h4></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={currentEmployee.name}
                                autoFocus
                                onChange={(e)=>setDataToUpdate({...dataToUpdate, name: e.target.value})}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className='mb-0'><h4 className='mb-0'>Position</h4></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={currentEmployee.position}
                                autoFocus
                                onChange={(e)=>setDataToUpdate({...dataToUpdate, position: e.target.value})}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className='mb-0'><h4 className='mb-0'>Admin?</h4></Form.Label>
                            <Form.Check 
                                type="checkbox" 
                                onChange={(e)=>setDataToUpdate({...dataToUpdate, admin: e.target.value})}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className='mb-0'><h4 className='mb-0'>Hourly wage - Format: 9.20</h4></Form.Label>
                            <Form.Control
                                type="number"
                                placeholder={currentEmployee.wage}
                                autoFocus
                                onChange={(e)=>setDataToUpdate({...dataToUpdate, wage: e.target.value})}
                            />
                        </Form.Group>


                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <button className='btn-3' onClick={handleClose}>
                    Cancel
                </button>
                <button className='btn-2' onClick={saveUpdates}>
                    Save Changes
                </button>
                </Modal.Footer>
            </Modal>
        </>
     );
}
 
export default EmployeeDetails;