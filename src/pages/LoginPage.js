import { Container, Row, Col, Button, FormLabel, InputGroup, Form } from 'react-bootstrap';
import Axios from 'axios';
import { useState } from 'react';
import { Navigate } from "react-router-dom";

const LoginPage = () => {

    //Server Requests
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const login = () => {
        Axios.post("http://localhost:3001/login", {username, password})
        .then((response) => {
            alert('user logged in');
        });
    }
    //Server requests


    return ( 
        <Container>
            <h1>Login</h1>
            <Form>
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
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Keep me posted with email updates" />
                </Form.Group>
                <Button className='button-main' variant="primary" type="submit" onClick={login}>
                    Login
                </Button>
            </Form>
        </Container>
    );
}
 
export default LoginPage;