import { Container, Row, Col, Button } from "react-bootstrap";
import EmployeeCard from "../components/EmployeeCard";
import SideBar from "../components/SideBar";
import { useState, useEffect } from "react";

const BusinessProfilePage = ({currentUser, setCurrentUser}) => {

    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    
    const tempUser = localStorage.getItem('currentUser')
    const user = JSON.parse(tempUser);

    console.log('currentUser = ' + currentUser)
    console.log('local Storage = ' + localStorage.getItem('currentUser'))
    console.log('user = ' + user)

    return ( 
        <Container fluid className='container-centered'>
            <div className='header'>
                <h1 className="header_primary">{user.businessName}</h1>
                <h2 className="header_secondary">Please select your name to clock in/out.</h2>
            </div>

            <div className='search-bar'>
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <Button className='button-main'>Search</Button>
                <Button className='button-main' onClick={handleShow}>+ Add Employee</Button>
            </div>

            <Row className='mt-medium'>
                {user.employees.map((employee)=>(
                    <EmployeeCard key={employee.name} name={employee.name} img={employee.img}/>
                )   
                )}
            </Row>
            <SideBar handleShow={handleShow} show={show} handleClose={handleClose}/>



        </Container>
     );
}
 
export default BusinessProfilePage;