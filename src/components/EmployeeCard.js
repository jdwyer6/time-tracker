import { Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import { setUser } from "../redux/userSlice";
// import { useDispatch, useSelector } from "react-redux";
// import pic from '../images/demo-employees/elon.jpg'
import { useState } from 'react';
import MessageModal from './MessageModal';
import { useNavigate } from 'react-router-dom';

const EmployeeCard = ({img, name, employeeId, pin, employee}) => {
    // const { user } = useSelector(state => state.user);
    // const dispatch = useDispatch();
    const [currentEmployee, setCurrentEmployee] = useState();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    let navigate = useNavigate();
    const handleShow = () => {
        // setCurrentEmployee(employeeId)
        setShow(true);
    }

    const handleClick = () => {
        localStorage.setItem('currentEmployee', JSON.stringify(employee))
        navigate('/employeeProfile');
    }

    // as={Link} to='/clockin'

    return (
        <>
            <Col style={{color: 'black', textDecoration: 'none'}} xs='4' md='3' lg='3' xl='2' className='employee-card' onClick={handleClick}>
                <img src={img} className='hover-zoom' />
                <h3>{name}</h3>
            </Col> 
            <MessageModal handleShow={handleShow} show={show} handleClose={handleClose} name={name} pin={pin} employee={employee}/>
        </>

    
    );
}
 
export default EmployeeCard;