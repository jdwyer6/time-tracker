import { Container, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { increment, decrement, incrementByAmount } from '../redux/counterSlice';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Axios from "axios"; 
import { demoUser } from "../utilities/demoUser";
import userEvent from "@testing-library/user-event";
import LoadingSpinner from "../components/LoadingSpinner";

const HomePage = () => {
    const { count } = useSelector(state => state.counter);
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);
    const [errMsg, setErrMsg] = useState(false);
    const [logoutMessage, setLogoutMessage] = useState('Logout')
    let user;

    useState(()=>{
        if(localStorage.getItem('currentUser')){
            const tempUser = localStorage.getItem('currentUser')
            user = JSON.parse(tempUser);
            user.username === 'demo' ? setLogoutMessage('Logout of demo') : setLogoutMessage('Logout');
        }
        
        setLoading(false);

    }, [])

    const loginDemo = (e) => {
        e.preventDefault();
        localStorage.setItem('currentUser', JSON.stringify(demoUser))
        navigate('/profile');
    }

    function logout(){
        localStorage.removeItem('currentUser')
        navigate('/')
        document.location.reload()
    }

    if(isLoading){
        return (
            <>
                <LoadingSpinner />
                <h4>Loading...</h4>
            </>
        )
    }
    

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
                        <Col md='4' className="button-container">
                            <Link to='/'>
                                <Button className='button_xl' onClick={logout}>{logoutMessage}</Button>
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
                                <Button className='button_xl' onClick={loginDemo}>Demo</Button>
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