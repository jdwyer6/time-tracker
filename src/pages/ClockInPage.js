import { Container, Row, Col, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { DEMOEMPLOYEES } from '../shared/DEMOEMPLOYEES';
import { useEffect, useState } from 'react';
import EmployeeCard from '../components/EmployeeCard';
import HoursCard from '../components/HoursCard';
import Spinner from 'react-bootstrap/Spinner';
import Timer from 'react-timer-wrapper';
import Timecode from 'react-timecode';
import _default from 'react-bootstrap/esm/Accordion';
import { MdLunchDining } from 'react-icons/md';
import { ImClock2, ImClock } from 'react-icons/im';
import Axios from 'axios';

const ClockInPage = () => {

    /////////////////BackEnd Set-up Start
    const [ listOfUsers, setListOfUsers ] = useState([]);
    const [ name, setName ] = useState('');
    const [ admin, setAdmin ] = useState(false)

    useEffect(()=>{
        Axios.get("http://localhost:3001/getUsers")
        .then((response) => {
            setListOfUsers(response.data);
        })
    }, [])

    const createUser = () => {
        Axios.post("http://localhost:3001/createUser", {name: name, admin: admin})
        .then((response) => {
            alert('User Added')
            setListOfUsers([...listOfUsers, {name:name, admin:admin}])
        })
    }

    //////////////////BackEnd Set-up End

    
    // const { user } = useSelector(state => state.user);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('currentUser')))
    const employee = DEMOEMPLOYEES.find(employee => employee.id === user);
    const [employees, setEmployees] = useState(DEMOEMPLOYEES);

    let current = new Date();
    const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const [time, setTime] = useState(current.toLocaleTimeString());
    const [shortTime, setShortTime] = useState(current.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}));
    const [info, setInfo] = useState({
        date: '',
        start: 0,
        end: 0,
        startTime: '',
        endTime: null,
        hoursWorked: 0
    });

    const [clockedIn, setClockedIn] = useState(false);

    function calculateWeekOf(){
        let day = current.getDay();
        let date = current.getDate();
        return (date - day) + 1;
    }

    useEffect(() => {
        setInterval(()=>{
            setTime(new Date().toLocaleTimeString())
            setShortTime(new Date().toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}));
        }, 1000)
    },[])
    
    useEffect(()=>{
        
        if(info.end){
            pushinfo()
        }else{
            return
        }

    }, [info.end])

    function handleClockIn(){ 
        setClockedIn(!clockedIn); 
        setInfo({...info, start: current.getTime(), startTime: shortTime});
        

    }

    function handleClockOut(){
        setClockedIn(!clockedIn);
        setInfo({...info, date: current.getDate(), end: current.getTime(), hoursWorked: ((current.getTime()-info.start)/60000).toFixed(2), endTime: shortTime});
    }

    function pushinfo(){
        DEMOEMPLOYEES[employee.id].work.push(info);
    }

    return ( 
        <Container>
            {listOfUsers.map((user) => {
                return (
                    <div key={user._id}>
                        <h3>{user.name}</h3>
                        <p>{user.admin}</p>
                        <img width="200px" src={user.image}></img>
                    </div>
                )
            })}
            <div>
                <input type='text' placeholder='name' onChange={(e)=>{setName(e.target.value)}}/>
                <input type='text' placeholder='Admin?' onChange={(e)=>{setAdmin(e.target.value)}}/>
                <button onClick={createUser}>submit</button>
            </div>
            <Row className='mt-medium'>
                <EmployeeCard img={employee.image} name={employee.name} title={employee.title}/>
                <Col className='text-center d-flex flex-column justify-content-center align-items-center'>
                    <h1 className='fw-bold fs-2'>Today is {weekday[current.getDay()]}, {months[current.getMonth()]} {current.getDate()}</h1>
                    <p>{time}</p>
                    {clockedIn === false ? (
                        <Button onClick={()=>handleClockIn()} className='button-lg'><ImClock className='mx-1'/>Clock in</Button>
                    ) : (
                        <>
                            <div className='d-flex w-100 justify-content-center'>
                                <Button onClick={()=>handleClockOut()} className='button-lg__alert'>Clock out <Timer style={{fontSize: '14px'}} active duration={null}><ImClock2 className='mx-1'/><Timecode /></Timer></Button>
                                <Button className='button-lg__option'><MdLunchDining className='mx-2'/>Lunch</Button>
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
                        <tr className='border-bottom'>
                            <th scope="col">Week of:</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='d-flex flex-start align-items-center'>
                              <th className='p-4 border-0' scope="row">{months[current.getMonth()]} {calculateWeekOf()}</th>
                                
                                {DEMOEMPLOYEES[employee.id].work ? (
                                    DEMOEMPLOYEES[employee.id].work.map((entry, index) => {
                                        return(
                                            <td key={index} className='border-0'>
                                                <HoursCard day={weekday[current.getDay()]} month={months[current.getMonth()]} date={current.getDate()} hoursWorked={entry.hoursWorked} startTime={entry.startTime} endTime={entry.endTime}/>
                                            </td>
                                        )
                                    })
                                ) : ('')}


                              
                        </tr>
                    </tbody>
                </table>
            </Row>
        </Container>
     );
}
 
export default ClockInPage;