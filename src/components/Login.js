import { Form } from 'react-bootstrap';
import {BiUserCircle} from 'react-icons/bi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { MdOutlineLogin } from 'react-icons/md';
import { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [errMsg, setErrMsg] = useState(false);
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
        <div className='form-container'>
            <h2>Log in</h2>
            <p>Enter your details below to continue</p>
            <form onSubmit={login}>
                <div className='d-flex align-items-center my-4'>
                    <BiUserCircle />
                    <Form.Control type='text' id='username' name='username' placeholder='Username' className='border-0 border-bottom' onChange={(e)=>{setUsername(e.target.value)}}/>
                </div>
                <div className='d-flex align-items-center my-4'>
                    <RiLockPasswordLine />
                    <Form.Control type='text' id='password' name='password' placeholder='Password' className='border-0 border-bottom' onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                <button className='btn-primary' type='submit'>Log in <MdOutlineLogin /></button>
                <div className='d-flex justify-content-end py-0 my-0'>
                    <p className='font-small__blue'>Forgot password</p>
                </div>

            </form>
        </div>
    );
}
 
export default Login;