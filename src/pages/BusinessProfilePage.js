import { Container, Row, Col, Button } from "react-bootstrap";
import EmployeeCard from "../components/EmployeeCard";
import SideBar from "../components/SideBar";
import { useState, useEffect } from "react";
import Axios from 'axios'

const BusinessProfilePage = ({currentUser, setCurrentUser}) => {

    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [employees, setEmployees] = useState();
    
    const tempUser = localStorage.getItem('currentUser')
    const user = JSON.parse(tempUser);

    function getEmployees(){
        Axios.get(`http://localhost:3001/user/${user._id}`)
        .then((res) => {
            if(res.status === 200){
                setEmployees(res.data.employees)
            }else{
                console.log('error')
            }
        })
    }

    useEffect(()=>{
        getEmployees();
    }, [])


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

            {/* {employees.map((emp) => (
                <h1>{emp.name}</h1>
            ))} */}


        </Container>
     );
}
 
export default BusinessProfilePage;