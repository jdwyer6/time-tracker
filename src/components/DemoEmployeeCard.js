import { Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import { setUser } from "../redux/userSlice";
// import { useDispatch, useSelector } from "react-redux";
// import pic from '../images/demo-employees/elon.jpg'
import { useState } from 'react';
import DemoEmployeeMessageModal from './DemoEmployeeMessageModal';
import { useNavigate } from 'react-router-dom';

const DemoEmployeeCard = ({img, name, employeeId, pin, employee}) => {
    let navigate = useNavigate();
    // const { user } = useSelector(state => state.user);
    // const dispatch = useDispatch();
    const [currentEmployee, setCurrentEmployee] = useState();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        // setCurrentEmployee(employeeId)
        setShow(true);
    }

    const setDemoEmployee = () => {
        localStorage.setItem('currentEmployee', JSON.stringify(employee))
        navigate('/clockin');
    }

    return (
        <>
            <Col style={{color: 'black', textDecoration: 'none'}} xs='4' md='3' lg='3' xl='2' className='employee-card' onClick={setDemoEmployee}>
                <img src={img} className='hover-zoom' />
                <h3>{name}</h3>
            </Col> 
            {/* <DemoEmployeeMessageModal handleShow={handleShow} show={show} handleClose={handleClose} name={name} pin={pin} employee={employee}/> */}
        </>

    
    );
}
 
export default DemoEmployeeCard;