import { Form } from 'react-bootstrap';
import {BiUserCircle} from 'react-icons/bi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { MdOutlineLogin } from 'react-icons/md';
import { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Popup from './Popup';
import Register from './Register';

const Login = () => {

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [errMsg, setErrMsg] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showRegister, setShowRegister] = useState(false);
    const handleCloseRegister = () => setShowRegister(false);
    const handleShowRegister = () => setShowRegister(true);
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
                localStorage.setItem('currentUser', JSON.stringify(res.data));
                setLoading(false);
                navigate('/employeeprofile');
            }
        })
        .catch(error => {
            console.log(error.response)
            setErrMsg(true);
            alert('There was a problem with your username or password. Please try again.');
            document.location.reload();
        })
    }

    if(isLoading){
        return(
            <h1 className='text-white'>Loading...</h1>
        )
    }

    return ( 
        <div className='form-container' style={{borderRadius: '6px'}}>
            <h2>Log in</h2>
            <p>Enter your details below to continue</p>
            <form onSubmit={login}>
                <div className='d-flex align-items-center my-4'>
                    <Form.Control type='text' id='username' name='username' placeholder='Username' className='border-0 border-bottom' onChange={(e)=>{setUsername(e.target.value)}}/>
                </div>
                <div className='d-flex align-items-center my-4'>
                    <Form.Control type='password' id='password' name='password' placeholder='Password' className='border-0 border-bottom' onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                    <button className='btn-2 w-100 my-2' type='submit'>Log in <MdOutlineLogin /></button>
            </form>
            <button className='btn-2 w-100 my-2' onClick={handleShowRegister}>Register a business</button>
            <div className='d-flex justify-content-end py-0 mt-2'>
                    <a className='text-decoration-none' onClick={handleShow}><p className='font-small'>Forgot password</p></a>
            </div>
            <Popup show={show} handleClose={handleClose} setShow={setShow} handleShow={handleShow} title='Sorry about that...' message='Password recovery is still in development'/>
            <Register showRegister={showRegister} handleCloseRegister={handleCloseRegister} handleShowRegister={handleShowRegister} setShowRegister={setShowRegister}/>

        </div>
    );
}
 
export default Login;