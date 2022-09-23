import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Navigation() {
    return (
        <Navbar expand="lg">
            <Container fluid>
                <Navbar.Brand href="#home" className='text-white'>ClockedIn</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link className='mx-4 text-white' href="#home">Home</Nav.Link>
                        <Nav.Link className='mx-4 text-white' href="#link">Admin</Nav.Link>
                        <Nav.Link className='mx-4 text-white' href="#link">Employees</Nav.Link>
                        <Nav.Link className='mx-4 text-white' href="#link">Demo</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;