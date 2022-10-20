import { Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import { setUser } from "../redux/userSlice";
// import { useDispatch, useSelector } from "react-redux";
// import pic from '../images/demo-employees/elon.jpg'
import { useState } from 'react';
import MessageModal from './MessageModal';

const EmployeeCard = ({img, name, employeeId, pin, employee}) => {
    // const { user } = useSelector(state => state.user);
    // const dispatch = useDispatch();
    const [currentEmployee, setCurrentEmployee] = useState();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        // setCurrentEmployee(employeeId)
        setShow(true);
    }

    // as={Link} to='/clockin'

    return (
        <>
            <Col style={{color: 'black', textDecoration: 'none'}} xs='4' md='3' lg='3' xl='2' className='employee-card' onClick={handleShow}>
                <img src={img} className='hover-zoom' />
                <h3>{name}</h3>
            </Col> 
            <MessageModal handleShow={handleShow} show={show} handleClose={handleClose} name={name} pin={pin} employee={employee}/>
        </>

    
    );
}
 
export default EmployeeCard;