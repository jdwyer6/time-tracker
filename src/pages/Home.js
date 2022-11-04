import { Container, Row, Col } from 'react-bootstrap';
import heroImg from '../images/heroimg.jpg';
import Login from '../components/Login';
import Register from '../components/Register';
import { useState } from 'react';

const Home = () => {

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
                </Col>

            </Row>
        </Container>
     );
}
 
export default Home;