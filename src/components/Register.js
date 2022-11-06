import { useState } from 'react';
import {Button, Form} from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useNavigate } from 'react-router-dom';
import { userSchema } from '../Validations/UserValidation'; 
import Axios from 'axios';
import uuid4 from "uuid4";

const Register = ({handleCloseRegister, showRegister, setShowRegister}) => {

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ name, setName ] = useState('')
    const [ businessName, setBusinessName ] = useState('');
    const [ businessId, setBusinessId ] = useState(uuid4());
    const [ admin, setAdmin ] = useState(true);
    const [ image, setImage ] = useState('images/demo-employees/default.png');
    const [ position, setPosition ] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState(false);
    let navigate = useNavigate();

    const config = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        }
    }


    const validateInfo = async (e) =>{
        let formData = {
            username: e.target[0].value,
            password: e.target[1].value,
            businessName: e.target[3].value
        };
        const isValid = await userSchema.isValid(formData)
        userSchema.validate(formData)
        .catch(function(err){
            alert(`${err.name} \n ${err.errors}`)
        })
        return isValid ? true : false 
    }


    const createUser = async (e) => {
        e.preventDefault();
        const valid = await validateInfo(e);
        if(valid){
            setLoading(true)
            Axios.post("https://clockedin.herokuapp.com/register", {
                username: username, 
                password: password, 
                name: name, 
                businessName: businessName, 
                businessId: businessId,
                admin: admin, 
                image: image,
                position: position
            })    
            .then((response) => {
                Axios.post("https://clockedin.herokuapp.com/login", {username, password}, config)
                .then((res) => {
                    if(res.status === 200){
                        localStorage.setItem('currentUser', JSON.stringify(res.data));
                        setLoading(false);
                        alert('SUCCESS! New user created!')
                        navigate('/employeeprofile');
                    }
                })
                .catch(error => {
                    console.log(error.response)
                    setErrMsg(true);
                })
        
            })
            .catch(error => {
                console.log(error.response)
                alert('Username already taken')
            })
        }
    }

    return ( 
        <>
    
            <Offcanvas show={showRegister} onHide={handleCloseRegister}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Register your business</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Form onSubmit={createUser}>
                    <div className='d-flex align-items-center my-4'>
                        <Form.Control type='text' id='username' name='username' placeholder='Create a username' className='border-0 border-bottom' onChange={(e)=>{setUsername(e.target.value)}}/>
                    </div>
                    <div className='d-flex align-items-center my-4'>
                        <Form.Control type='password' id='password' name='password' placeholder='Create a password' className='border-0 border-bottom' onChange={(e)=>{setPassword(e.target.value)}}/>
                    </div>
                    <div className='d-flex align-items-center my-4'>
                        <Form.Control type='text' id='name' name='name' placeholder='Enter your name' className='border-0 border-bottom' onChange={(e)=>{setName(e.target.value)}}/>
                    </div>
                    <div className='d-flex align-items-center my-4'>
                        <Form.Control type='text' id='business' name='business' placeholder='Enter the name of your business' className='border-0 border-bottom' onChange={(e)=>{setBusinessName(e.target.value)}}/>
                    </div>
                    <div className='d-flex align-items-center my-4'>
                        <Form.Control type='text' id='position' name='position' placeholder='Enter your position' className='border-0 border-bottom' onChange={(e)=>{setPosition(e.target.value)}}/>
                    </div>
                    <button className='btn-primary' type='submit'>Register</button>
                    <div className='d-flex justify-content-end py-0 my-0'>
                        <p className='font-small__blue'>Need help?</p>
                    </div>

                </Form>
            </Offcanvas.Body>
            </Offcanvas>
        </>
     );
}
 
export default Register;