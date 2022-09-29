import { Container, Row, Col, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { DEMOEMPLOYEES } from '../shared/DEMOEMPLOYEES';
import { useEffect, useState } from 'react';
import EmployeeCard from '../components/EmployeeCard';
import HoursCard from '../components/HoursCard';
import Spinner from 'react-bootstrap/Spinner';
import Timer from 'react-timer-wrapper';
import Timecode from 'react-timecode';

const ClockInPage = () => {
    const { user } = useSelector(state => state.user);
    const employee = DEMOEMPLOYEES.find(employee => employee.id === user);
    const [employees, setEmployees] = useState(DEMOEMPLOYEES);

    // const minute = 1000 * 60;
    // const hour = minute * 60;
    // const day = hour * 24;
    let current = new Date();
    const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const [time, setTime] = useState(current.toLocaleTimeString());
    const [info, setInfo] = useState({
        date: '',
        start: '',
        end: '',
        startTime: '',
        endTime: '',
        hoursWorked: 0
    });

    const [clockedIn, setClockedIn] = useState(false);

    function calculateWeekOf(){
        let day = current.getDay();
        let date = current.getDate();
        return (date - day) + 1;
    }

    useEffect(() => {
        // console.log(DEMOEMPLOYEES[employee.id])
        setInterval(()=>{
            setTime(new Date().toLocaleTimeString())
        }, 1000)
    },[time])

    useEffect(()=>{
        console.log(info)
    }, [clockedIn, info])

    function handleClockIn(){
        setClockedIn(!clockedIn) 
        setInfo({...info, start: Date.now()})
        setInfo({...info, startTime: time})
    }

    function handleClockOut(){
        setClockedIn(!clockedIn)
        setInfo({...info, end: Date.now(), date: current.getDate(), endTime: time, hoursWorked: ((info.end - info.start)/36000000000000).toFixed(5)})
    }


    return ( 
        <Container>
            <Row className='mt-medium'>
                <EmployeeCard img={employee.image} name={employee.name} title={employee.title}/>
                <Col className='text-center d-flex flex-column justify-content-center align-items-center'>
                    <h1 className='fw-bold fs-2'>Today is {weekday[current.getDay()]}, {months[current.getMonth()]} {current.getDate()}</h1>
                    <p>{time}</p>
                    {clockedIn === false ? (
                        <Button onClick={()=>handleClockIn()} className='button-lg'>Clock in</Button>
                    ) : (
                        <>
                            <div className='d-flex w-100 justify-content-center'>
                                <Button onClick={()=>handleClockOut()} className='button-lg__alert'>Clock out <Timer style={{fontSize: '14px'}} active duration={null}><Timecode /></Timer></Button>
                                <Button className='button-lg__option'>Lunch</Button>
                            </div>

                            <div className='d-flex mt-1'>
                                <Spinner animation="grow" className='tracking-icon'/>
                                <p style={{fontSize: '80%'}}>Tracking your time</p>
                            </div>
                            
                        </>

                    )}
                    
                </Col>
            </Row>
            <Row className='calendar-container'>
                <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Week of:</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">{months[current.getMonth()]} {calculateWeekOf()}</th>
                        <td><HoursCard day={weekday[current.getDay()]} month={months[current.getMonth()]} date={current.getDate()} startTime={info.startTime} endTime={info.endTime} hoursWorked={info.hoursWorked}/></td>
                        <td>Otto</td>
                        <td>@mdo</td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td>Larry the Bird</td>
                        <td>@twitter</td>
                      </tr>
                    </tbody>
                </table>
            </Row>
            {/* <h1>clock in for {user}</h1>
            <p>{employee.name}</p>
            <p>Today's date is: {utc}</p>
            <p>Chosen date is: {date}</p>
            <p>{JSON.stringify(employee.hours)}</p>
            <label for="start">Start date:</label>

            <input type="date" id="start" name="trip-start" value="2018-07-22" min="2018-01-01" max="2018-12-31" onChange={(e)=>setDate(e.target.value)}></input>
            <Button onClick={()=> {
                DEMOEMPLOYEES[employee.id].hours[date] = 3;

            }}>click here</Button> */}
        </Container>
     );
}
 
export default ClockInPage;