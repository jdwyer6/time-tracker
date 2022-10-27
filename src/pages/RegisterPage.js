import { Container, Row, Col, Button, FormLabel, InputGroup, Form } from 'react-bootstrap';
import Axios from 'axios';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { userSchema } from '../Validations/UserValidation'; 
import * as yup from 'yup';

const RegisterPage = () => {

    //Server Requests
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ businessName, setBusinessName ] = useState('');
    const [errMsg, setErrMsg] = useState(false);
    let navigate = useNavigate();
    const [valid, setValid] = useState(false);


    const validateInfo = async (e) =>{
        let formData = {
            username: e.target[0].value,
            password: e.target[1].value,
            businessName: e.target[2].value
        };
        const isValid = await userSchema.isValid(formData)
        userSchema.validate(formData)
        .catch(function(err){
            alert(`${err.name} \n ${err.errors}`)
        })
        isValid ? setValid(true) : setValid(false)
        console.log(valid)
    }


    const createUser = (e) => {
        e.preventDefault();
        validateInfo(e)
        if(valid){
            Axios.post("https://clockedin.herokuapp.com/register", {username, password, businessName})    
            .then((response) => {
                alert('SUCCESS! New user created!')
                navigate('/login');
            })
            .catch(error => {
                console.log(error.response)
                alert('Username already taken')
            })
        }
    }



    return ( 
        <Container className='my-5'>
            <h1>Register</h1>
            <Form onSubmit={createUser}>
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

                <Form.Group className="mb-3">
                    <Form.Label>Business Name</Form.Label>
                    <Form.Control placeholder="Enter your business name" onChange={(e)=>{setBusinessName(e.target.value)}}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Keep me posted with email updates" />
                </Form.Group>

                <Button className='button-main' variant="primary" type="submit">
                    Register
                </Button>
            </Form>
        </Container>
    );
}
 
export default RegisterPage;