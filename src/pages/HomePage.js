import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const HomePage = () => {
    return ( 
        <Container fluid>
            <div className='circle'></div>
            <Row className="header_wrapper">
                <Col>
                    <h1 className='header_primary'>Simple &#38; Reliable time tracking.</h1>
                    <h2 className='header_secondary'>A streamlined app for managing employee shifts and payroll.</h2>
                </Col>
            </Row>
            <Row className='home-button-group'>
                    <Col md='4' className="button-container">
                        <Button className='button_xl'>Login</Button>
                    </Col>
                    <Col md='4' className="button-container">
                        <Link to='demo'>
                            <Button className='button_xl'>Demo</Button>
                        </Link>
                        
                    </Col>
                    <Col md='4' className="button-container">
                        <Button className='button_xl'>Sign up free</Button>
                    </Col>
            </Row>
        </Container>
     );
}
 
export default HomePage;