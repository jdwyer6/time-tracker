import { Container, Row, Col, Button } from "react-bootstrap";
import EmployeeCard from "../components/EmployeeCard";
import SideBar from "../components/SideBar";
import { useState, useEffect } from "react";
import Axios from 'axios';

const BusinessProfilePage = () => {

    const [isLoading, setLoading] = useState(true);
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [employees, setEmployees] = useState();
    
    const tempUser = localStorage.getItem('currentUser')
    const user = JSON.parse(tempUser);

    function getEmployees(){
        Axios.get(`https://clockedin.herokuapp.com/user/${user._id}`)
        .then((res) => {
            if(res.status === 200){
                setEmployees(res.data.employees)
                setLoading(false);
            }else{
                console.log('error')
            }
        })
        .catch(error => {
            console.log(error.response)
        })
    }

    useEffect(()=>{
        getEmployees();
    }, [])

    if(isLoading){
        return <h4>Loading...</h4>
    }

    return ( 
        <Container fluid className='container-centered'>
            <div className='header'>
                <h1 className="header_primary">{user.businessName}</h1>
                <h2 className="header_secondary">Please select your name to clock in/out.</h2>
            </div>

            <div className='search-bar'>
                <input className="form-control me-2" type="search" placeholder="Search employees by name" aria-label="Search" />
                <Button className='button-main'>Search</Button>
                {employees.length > 0 ? (
                    <Button className='button-main' onClick={handleShow}>+ Add Employee</Button>
                ) : ('')}
                
            </div>

            <Row className='mt-medium'>
                {employees.length > 0 ? (
                employees.map((employee)=>(
                    <EmployeeCard 
                        key={employee.employeeId} 
                        name={employee.name} 
                        img={employee.img} 
                        employeeId={employee.employeeId} 
                        pin={employee.pin} 
                        employee={employee}
                    />
                ))
                ) : (
                    <Col>
                    <p>Looks like you haven't added any employees to your business yet. Click here to add some.</p>
                    <Button className='button-main' style={{width: '200px'}} onClick={handleShow}>+ Add Employee</Button>
                    </Col>
                )}

            </Row>
            <SideBar handleShow={handleShow} show={show} handleClose={handleClose}/>
            

        </Container>
     );
}
 
export default BusinessProfilePage;