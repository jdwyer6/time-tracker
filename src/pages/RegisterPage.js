import { Container, Row, Col, Button, FormLabel, InputGroup, Form } from 'react-bootstrap';
import FormCheckInput from 'react-bootstrap/esm/FormCheckInput';
import Axios from 'axios';
import { useState } from 'react';

const RegisterPage = () => {

    //Server Requests
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const createUser = () => {
        Axios.post("http://localhost:3001/register", {username, password})
        .then((response) => {
            alert('User Added')
        })
    }
    //Server requests



    return ( 
        <Container>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="email" placeholder="Enter username" onChange={(e)=>{setUsername(e.target.value)}}/>
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
                <Button variant="primary" type="submit" onClick={createUser}>
                    Register
                </Button>
            </Form>
        </Container>
    );
}
 
export default RegisterPage;