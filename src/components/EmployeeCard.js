import { Col } from 'react-bootstrap';

const EmployeeCard = ({img, name, title}) => {
    return (
        <Col md='2' className='employee-card'>
            <img src={img} />
            <h3>{name}</h3>
            <p>{title}</p>
        </Col> 
    
    );
}
 
export default EmployeeCard;