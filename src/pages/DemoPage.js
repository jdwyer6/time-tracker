import { Container, Row, Col, Button } from "react-bootstrap";
import EmployeeCard from "../components/EmployeeCard";
import { DEMOEMPLOYEES } from "../shared/DEMOEMPLOYEES";

const DemoPage = () => {

    //check state.user or state.setUser


    return ( 
        <Container fluid className='container-centered'>
            <div className='header'>
                <h1 className="header_primary">Welcome Back</h1>
                <h2 className="header_secondary">Please select your name to sign in.</h2>
            </div>

            <div className='search-bar'>
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <Button className='button-main' type="submit">Search</Button>
            </div>

            <Row className='mt-medium'>
                {DEMOEMPLOYEES.map((employee)=>(
                    <EmployeeCard key={employee.id} img={employee.image} name={employee.name} title={employee.title} userID={employee.id}/>
                )   
                )}
            </Row>


        </Container>
     );
}
 
export default DemoPage;