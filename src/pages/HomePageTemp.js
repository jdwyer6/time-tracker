import { Container, Row, Col } from 'react-bootstrap';
import heroImg from '../images/heroimg.jpg';
import Login from '../components/Login';
import Register from '../components/Register';
import { useState } from 'react';

const HomePageTemp = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return ( 
        <Container fluid className='px-0'>
            <div className='bg-image'></div>
            <Row className='d-flex justify-content-end pos-tr'>
                <Login />
            </Row>
            <Row className='pos-b'>
                
                <Col>
                        <h1 className='text-white'>ClockedIn</h1>
                        <p className='text-white'>Sign in made simple</p>
                        <button className='btn-primary' onClick={handleShow}>Register your business</button>
                </Col>

            </Row>
            <Register show={show} handleClose={handleClose} handleShow={handleShow}/>
        </Container>
     );
}
 
export default HomePageTemp;