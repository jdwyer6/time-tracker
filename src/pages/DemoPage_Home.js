import { Container, Row, Col } from "react-bootstrap";
import EmployeeCard from "../components/EmployeeCard";
import frodo from '../images/demo-employees/frodo.png'
import { DEMOEMPLOYEES } from "../shared/DEMOEMPLOYEES";

const DemoPage = () => {
    return ( 
        <Container fluid className='container-centered'>
            <div className='header'>
                <h1 className="header_primary">Welcome Back</h1>
                <h2 className="header_secondary">Please select your name to sign in</h2>
            </div>


            <div className='search-bar'>
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
            </div>

            <Row className='my-5'>
                {DEMOEMPLOYEES.map((x)=>(
                    <EmployeeCard img={x.image} name={x.name} title={x.title} />
                )   
                )}
            </Row>


        </Container>
     );
}
 
export default DemoPage;