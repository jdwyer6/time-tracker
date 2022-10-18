import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Axios from 'axios';
import { current } from '@reduxjs/toolkit';

function Navigation({currentUser}) {
    let user = '';
    if(currentUser) {
        user = JSON.parse(currentUser);
    }

    return (
        <Navbar expand="lg">
            <Container fluid>
                <Navbar.Brand as={Link} to='/' className='text-white'>ClockedIn</Navbar.Brand>
                <Navbar.Brand as={Link} to='/' className='text-white'>{user ? (user.businessName):('')}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to='/' className='mx-4 text-white' href="#home">Home</Nav.Link>
                        <Nav.Link as={Link} to='/profile' className='mx-4 text-white' href="#link">My Business</Nav.Link>
                        <Nav.Link as={Link} to='/login' className='mx-4 text-white' href="#link">Login</Nav.Link>
                        <Nav.Link as={Link} to='demo' className='mx-4 text-white' href="#link">Demo</Nav.Link>
                        <Nav.Link as={Link} to='/register' className='mx-4 text-white' href="#link">Sign up free</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;