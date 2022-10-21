import {Spinner, Container} from 'react-bootstrap';

const LogoutPage = () => {
    return ( 
        <Container className='d-flex justify-content-center my-5'>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p className='fs-5 mx-5'>Logging out</p>
        </Container> 
    );
}
 
export default LogoutPage;