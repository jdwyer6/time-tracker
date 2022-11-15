import { Container, Row, Col } from 'react-bootstrap';
import heroImg from '../images/heroimg.jpg';
import Login from '../components/Login';
import Register from '../components/Register';
import { useState } from 'react';

const Home = () => {

    return ( 
        <>
            <Container fluid className='p-0 d-none d-sm-block'>
                <div className='bg-image'></div>
                <Row className='d-flex justify-content-between' style={{height: '100vh'}}>
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
            <Container fluid className='p-0 d-flex d-sm-none' style={{height: '100vh'}}>
            <div className='bg-image'></div>
                <Row className='p-1 d-flex'>
                    <Col className='text-center mt-4'>
                        <h1 className='text-white mb-0 '>ClockedIn</h1>
                        <p className='text-white mb-0' style={{marginTop: '-5px'}}>Sign in made simple</p>
                    </Col>
                    <Col className='d-flex justify-content-center my-3 mb-5'>
                        <Login />
                    </Col>
                </Row>

            </Container>
        </>

     );
}
 
export default Home;