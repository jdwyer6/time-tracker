import { Container, Row, Col, Button } from "react-bootstrap";

const HomePage = () => {
    return ( 
        <Container fluid>
            <div className='circle'></div>
            <Row className="home-wrapper">
                <Row>
                    <h1>Simple &#38; Reliable time tracking.</h1>
                    <h2>A streamlined app for managing employee shifts and payroll.</h2>
                </Row>
                <Row>
                    <Col>
                        <Button>Employee Login</Button>
                    </Col>
                    <Col>
                        <Button>Admin Login</Button>
                    </Col>
                    <Col>
                        <Button>Demo</Button>
                    </Col>
                </Row>
            </Row>
        </Container>
     );
}
 
export default HomePage;