import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import Axios from 'axios';
import { current } from '@reduxjs/toolkit';
import { useNavigate } from "react-router-dom";

function Navigation() {
    const tempUser = localStorage.getItem('currentUser')
    const user = JSON.parse(tempUser);
    let navigate = useNavigate();

    function logout(){
        localStorage.removeItem('currentUser')
        navigate('/')
        document.location.reload()
    }

    return (
        <Navbar expand="lg">
            <Container >
                <Navbar.Brand as={Link} to='/' className='text-white'>ClockedIn</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className=''>
                <Navbar.Brand as={Link} to='/' className='text-white' style={{fontSize: '12px'}}>{user ? (user.businessName):('')}</Navbar.Brand>
                    <Nav className="ms-auto">
                        {!user ? (
                            <>
                                <NavLink as={Link} to='/' end className='mx-2 text-white text-decoration-none' href="#home">Home</NavLink>
                                <NavLink as={Link} to='demo' className='mx-2 text-white text-decoration-none' href="#link">Demo</NavLink>
                                <NavLink as={Link} to='/login' className='mx-2 text-white text-decoration-none' href="#link">Login</NavLink>
                                <NavLink as={Link} to='/register' className='mx-2 text-white text-decoration-none' href="#link">Sign up free</NavLink>
                            </>

                        ) : (
                            <>
                                <NavLink as={Link} to='/profile' className='mx-2 text-white text-decoration-none'>My Business Page</NavLink>
                                <NavLink as={Link} to='/reports' className='mx-2 text-white text-decoration-none'>Reports</NavLink>
                                <NavLink as={Link} to='/logout' onClick={logout} className='mx-2 text-white text-decoration-none'>Logout</NavLink>
                            </>

                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;