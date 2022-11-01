import { Form } from 'react-bootstrap';
import {BiUserCircle} from 'react-icons/bi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { MdOutlineLogin } from 'react-icons/md';

const Login = () => {
    return ( 
        <div className='form-container'>
            <h2>Log in</h2>
            <p>Enter your details below to continue</p>
            <form onSubmit=''>
                <div className='d-flex align-items-center my-4'>
                    <BiUserCircle />
                    <Form.Control type='text' id='username' name='username' placeholder='Username' className='border-0 border-bottom'/>
                </div>
                <div className='d-flex align-items-center my-4'>
                    <RiLockPasswordLine />
                    <Form.Control type='text' id='password' name='password' placeholder='Password' className='border-0 border-bottom'/>
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