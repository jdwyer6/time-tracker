import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {Button, Form} from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaUserAlt } from 'react-icons/fa';
import Axios from 'axios';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileEncode, FilePondPluginImageResize);


const SideBar = ({handleShow, show, handleClose}) => {

    const [employeeName, setEmployeeName] = useState();
    const [employeePin, setEmployeePin] = useState();
    const [employeeImg, setEmployeeImg] = useState('images/demo-employees/default.png');
    // const [employeeImg, setEmployeeImg] = useState([]);
    const [files, setFiles] = useState([]);
    // FilePond.registerPlugin(FilePondPluginFileEncode);
    

    const tempUser = localStorage.getItem('currentUser');
    const user = JSON.parse(tempUser);

    function handleRegister(e){
        // e.preventDefault();
        Axios.post("http://localhost:3001/addEmployee", {userId: user._id, name: employeeName, pin: employeePin, img: employeeImg, work: []})
        .then((response) => {
            alert('An employee has been added to your busines profile.')
        })
        .catch(error => {
            console.log(error.response)
        })
    }

    // useEffect(()=>{
    //     console.log(employeeImg);
    // },[employeeImg])

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
                        {/* <Form.Group> */}
                        {/* <Form.Label>Image</Form.Label>
                            <FilePond
                                files={employeeImg}
                                onupdatefiles={setEmployeeImg}
                                allowMultiple={false}
                                maxFiles={1}
                                allowFileEncode={true}
                                name="files"
                                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                            />
                        </Form.Group> */}

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