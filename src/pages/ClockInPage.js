import { Container, Row, Col, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { DEMOEMPLOYEES } from '../shared/DEMOEMPLOYEES';
import { useEffect, useState } from 'react';

const ClockInPage = () => {
    const { user } = useSelector(state => state.user);
    const employee = DEMOEMPLOYEES.find(employee => employee.id === user);
    const [employees, setEmployees] = useState(DEMOEMPLOYEES);
    let utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    const [date, setDate] = useState();

    useEffect(() => {
        console.log(DEMOEMPLOYEES[employee.id])
    }, [])


    return ( 
        <Container>
            <Row>
                <Col>
                
                </Col>
                <Col>
                
                </Col>
            </Row>
            <h1>clock in for {user}</h1>
            <p>{employee.name}</p>
            <p>Today's date is: {utc}</p>
            <p>Chosen date is: {date}</p>
            <p>{JSON.stringify(employee.hours)}</p>
            <label for="start">Start date:</label>

            <input type="date" id="start" name="trip-start" value="2018-07-22" min="2018-01-01" max="2018-12-31" onChange={(e)=>setDate(e.target.value)}></input>
            <Button onClick={()=> {
                DEMOEMPLOYEES[employee.id].hours[date] = 3;

            }}>click here</Button>
        </Container>
     );
}
 
export default ClockInPage;