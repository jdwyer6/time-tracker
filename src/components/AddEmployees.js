import { Button, Offcanvas, Form} from 'react-bootstrap';
import { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { userSchema } from '../Validations/UserValidation'; 

const AddEmployees = ({show, handleClose}) => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('currentUser')));
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ name, setName ] = useState('')
    const [ businessName, setBusinessName ] = useState(user.businessName);
    const [ businessId, setBusinessId ] = useState(user.businessId);
    const [ admin, setAdmin ] = useState(false);
    const [ image, setImage ] = useState('images/demo-employees/default.png');
    const [ position, setPosition ] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState(false);
    let navigate = useNavigate();

    const validateInfo = async (e) =>{
        let formData = {
            username: e.target[0].value,
            password: e.target[1].value
        };
        const isValid = await userSchema.isValid(formData)
        userSchema.validate(formData)
        .catch(function(err){
            alert(`${err.name} \n ${err.errors}`)
        })
        return isValid ? true : false 
    }

    const config = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        }
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
                businessName: user.businessName, 
                businessId: user.businessId,
                admin: admin, 
                image: image,
                position: position
            })    
            .then((response) => {
                Axios.post("https://clockedin.herokuapp.com/login", {username, password}, config)
                .then((res) => {
                    if(res.status === 200){
                        setLoading(false);
                        alert('SUCCESS! New employee added!')
                        document.location.reload();
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
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                <Offcanvas.Title>Add Employee</Offcanvas.Title>
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
                            <Form.Control type='text' id='name' name='name' placeholder="Enter the employee's name" className='border-0 border-bottom' onChange={(e)=>{setName(e.target.value)}}/>
                        </div>
                        <div className='d-flex align-items-center my-4'>
                            <Form.Control type='text' id='position' name='position' placeholder="Enter the employee's position" className='border-0 border-bottom' onChange={(e)=>{setPosition(e.target.value)}}/>
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
 
export default AddEmployees;