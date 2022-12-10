import { Container, Row, Col } from 'react-bootstrap';
import heroImg from '../images/heroimg.jpg';
import Login from '../components/Login';
import Register from '../components/Register';
import { useState } from 'react';

const Home = () => {
    
    return ( 
        <Container fluid className='px-0'>
            <div className='bg-image'></div>
            <Row style={{height: '100vh'}} className='p-4 p-md-0'>
                <Col md='6' className='d-flex justify-content-end flex-column p-md-5'>
                    <div className='p-md-5 text-center text-md-start'>
                        <h1 className='text-white mb-0'>ClockedIn</h1>
                        <p className='text-white ps-2' style={{marginTop: '-15px'}}>Sign in made simple</p>
                    </div>
                </Col>
                <Col className='d-flex align-items-center justify-content-center'>
                    <Login />
                </Col>
            </Row>
        </Container>
     );
}
 
export default Home;