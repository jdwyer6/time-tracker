import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { setUser } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

const EmployeeCard = ({img, name, title, userID}) => {
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    return (
        <Col as={Link} to='/clockin' style={{color: 'black', textDecoration: 'none'}} xs='4' md='3' lg='3' xl='2' className='employee-card' onClick={()=>dispatch(setUser(userID))}>
            <img src={img} className='hover-zoom' />
            <h3>{name}</h3>
            <p>{title}</p>
        </Col> 
    
    );
}
 
export default EmployeeCard;