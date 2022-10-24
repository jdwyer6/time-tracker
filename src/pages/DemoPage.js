import { Container, Row, Col, Button } from "react-bootstrap";
import DemoEmployeeCard from "../components/DemoEmployeeCard";
import { useEffect, useState } from "react";
import { DEMOEMPLOYEES } from "../shared/DEMOEMPLOYEES";

const DemoPage = () => {
    

    return ( 
        <Container fluid className='container-centered'>
            <div className='header'>
                <h1 className="header_primary">John's Bakery</h1>
                <h2 className="header_secondary">Please select your name to clock in/out.</h2>
            </div>

            {/* <div className='search-bar'>
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <Button className='button-main' type="submit">Search</Button>
            </div> */}

            <Row className='mt-medium d-flex justify-content-center'>
                {DEMOEMPLOYEES.map((employee)=>(
                    <DemoEmployeeCard key={employee.id} img={employee.image} name={employee.name} title={employee.title} userID={employee.id} employee={employee}/>
                )   
                )}
            </Row>


        </Container>
     );
}
 
export default DemoPage;