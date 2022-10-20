import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { increment, decrement, incrementByAmount } from '../redux/counterSlice';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const HomePage = () => {
    const { count } = useSelector(state => state.counter);
    // const count = useSelector((state) => state.counter.count);
    const dispatch = useDispatch();
    

    return ( 
        <Container fluid>
            <div className='circle'></div>
            <Row className="header_wrapper">
                <Col>
                    <h1 className='header_primary'>Simple &#38; Reliable time tracking.</h1>
                    <h2 className='header_secondary'>A streamlined app for managing employee shifts and payroll.</h2>
                </Col>
            </Row>
            <Row className='home-button-group'>
                {localStorage.getItem('currentUser') ? (
                    <>
                        <Col md='4' className="button-container">
                            <Link to='/profile'>
                                <Button className='button_xl' onClick={()=>dispatch(increment())}>My business profile</Button>
                            </Link>
                        </Col>
                    </>
                ) : (
                    <>
                        <Col md='4' className="button-container">
                            <Link to='/login'>
                                <Button className='button_xl' onClick={()=>dispatch(increment())}>Login</Button>
                            </Link>
                        </Col>
                        <Col md='4' className="button-container">
                            <Link to='demo'>
                                <Button className='button_xl'>Demo</Button>
                            </Link>
                            
                        </Col>
                        <Col md='4' className="button-container">
                            <Link to='/register'>
                                <Button className='button_xl' onClick={()=>dispatch(decrement())}>Sign up free</Button>
                            </Link>
                            
                        </Col>
                    </>
                )}

            </Row>

        </Container>
     );
}
 
export default HomePage;