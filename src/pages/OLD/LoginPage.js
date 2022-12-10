import { Container, Row, Col, Button, FormLabel, InputGroup, Form } from 'react-bootstrap';
import Axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

const LoginPage = () => {

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [errMsg, setErrMsg] = useState(false);
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const [isLoading, setLoading] = useState(false)

    const config = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        }
    }

    const login = (e) => {
        e.preventDefault();
        setLoading(true);
        Axios.post("https://clockedin.herokuapp.com/login", {username, password}, config)
        .then((res) => {
            if(res.status === 200){
                // dispatch(setUser(JSON.stringify(res.data)));
                localStorage.setItem('currentUser', JSON.stringify(res.data))
                setLoading(false);
                navigate('/profile');
            }
        })
        .catch(error => {
            console.log(error.response)
            setErrMsg(true);
        })
    }

    if(isLoading){
        return(
            <h1>Loading...</h1>
        )
    }


    return ( 
        <Container className='my-5'>
            <h1>Login</h1>
            {errMsg ? (<p style={{color: 'red'}}>There was an issue with your username or password. Please try again.</p>) : ('')}
            <Form onSubmit={login}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control placeholder="Enter username" onChange={(e)=>{setUsername(e.target.value)}}/>
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
                </Form.Group>
                <Button className='button-main' variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </Container>
    );
}
 
export default LoginPage;