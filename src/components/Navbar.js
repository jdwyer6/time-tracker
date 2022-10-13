import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <Navbar expand="lg">
            <Container fluid>
                <Navbar.Brand as={Link} to='/' className='text-white'>ClockedIn</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to='/' className='mx-4 text-white' href="#home">Home</Nav.Link>
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