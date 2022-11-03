import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { DEMOEMPLOYEES } from '../shared/DEMOEMPLOYEES';
import EmployeeCard from '../components/EmployeeCard';
import HoursCard from '../components/HoursCard__OLD';
import Spinner from 'react-bootstrap/Spinner';
import Timer from 'react-timer-wrapper';
import Timecode from 'react-timecode';
import _default from 'react-bootstrap/esm/Accordion';
import { MdLunchDining, MdTranslate } from 'react-icons/md';
import { AiFillBackward } from 'react-icons/ai';
import { ImClock2, ImClock } from 'react-icons/im';
import Axios from 'axios';
import AlertModal from '../components/AlertModal';
import LoadingSpinner from "../components/LoadingSpinner";

const EmployeeProfilePage = () => {

    const [isLoading, setLoading] = useState(true);
    const [tempEmployee, setTempEmployee] = useState(JSON.parse(localStorage.getItem('currentEmployee')));
    const [employee, setEmployee] = useState();
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    let loggedToday = false;
    const tempUser = localStorage.getItem('currentUser')
    const user = JSON.parse(tempUser);
    const navigate = useNavigate();

    let current = new Date();
    const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const [time, setTime] = useState(current.toLocaleTimeString());
    const [shortTime, setShortTime] = useState(current.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}));
    const [info, setInfo] = useState({
        date: '',
        month: '',
        day: '',
        weekNumber: '',
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

    const getWeek = () => {
        let currentDate = new Date();
        let startDate = new Date(currentDate.getFullYear(), 0, 1);
        var days = Math.floor((currentDate - startDate) /
            (24 * 60 * 60 * 1000));
        var weekNumber = Math.ceil(days / 7);  
        return weekNumber  
    }

    useEffect(() => {
        if(user.username == 'demo'){
            console.log() 
            setEmployee(JSON.parse(localStorage.getItem('currentEmployee')))
            setLoading(false);
        }else{
            Axios.get(`https://clockedin.herokuapp.com/employee/${user._id}/${tempEmployee.employeeId}`)
            .then((res) => {
                if(res.status === 200){
                    setEmployee(res.data)
                    setLoading(false);
                }
            })
            .catch(error => {
                console.log(error.response)
            })
        }


        setInterval(()=>{
            setTime(new Date().toLocaleTimeString())
            setShortTime(new Date().toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}));
        }, 1000)

        console.log(current)

    },[])


    
    useEffect(()=>{
        
        if(info.end){
            pushinfo()
        }else{
            return
        }

    }, [info.end])

    function handleClockIn(){ 
        employee.work.forEach(element => {
            element.date === current.getDate() ? loggedToday = true : loggedToday = false;
        })
        if(!loggedToday){
            setClockedIn(!clockedIn); 
            setInfo({...info, start: current.getTime(), startTime: shortTime});
        }else{
            handleShow();
        }
    }

    function handleClockOut(){
        setClockedIn(!clockedIn);
        setInfo({...info, 
            date: current.getDate(), 
            month: current.getMonth(), 
            day: current.getDay(), 
            weekNumber: getWeek(), 
            end: current.getTime(), 
            hoursWorked: ((current.getTime()-info.start)/3600000).toFixed(4), 
            endTime: shortTime
        });
    }

    const pushinfo = () => {
        if(user.username === 'demo'){
            employee.work.push(info)
        }else{
            Axios.post(`https://clockedin.herokuapp.com/updateEmployee/${user._id}`, {employeeId: employee.employeeId, info: info})
            .then((res) => {
                if(res.status === 200){
                    document.location.reload();
                }else{
                    console.log('There was an error')
                }
            })
            .catch(error => {
                console.log(error.response)
            })
        }


    }

    if(isLoading){
        return (
            <>
                <LoadingSpinner />
                <h4>Loading...</h4>
            </>
        )
    }

    return ( 
        <Container>
            <div className='d-flex justify-content-start flex-column hover' onClick={()=>navigate('/profile')}>
                <AiFillBackward style={{width: '3em', height: '3em', color:'#91AA9D'}}/>
                <p style={{marginTop: '-10px'}}>Go Back</p>
            </div>
            
            <Row className='mt-medium position-relative'>
                <Col className='position-absolute d-none d-lg-inline'>
                    <EmployeeCard img={employee.img} name={employee.name} title={employee.title}/>
                </Col>
                <Col className='d-inline d-lg-none d-flex justify-content-center'>
                    <EmployeeCard img={employee.img} name={employee.name} title={employee.title}/>
                </Col>
                
                <Col md='12' className='text-center d-flex flex-column justify-content-center align-items-center my-5'>
                    <h1 className='fw-bold fs-2'>Today is {weekday[current.getDay()]}, {months[current.getMonth()]} {current.getDate()}</h1>
                    <p>{time}</p>
                    {clockedIn === false ? (
                        <Button onClick={()=>handleClockIn()} className='mx-1 button-lg'><ImClock className='mx-1'/>Clock in</Button>
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
                <Table className="table">
                    <thead>
                        <tr className='border-bottom text-center'>
                            {/* <th scope="col">Week of:</th> */}
                            <th>Your hours</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='d-flex flex-row'>
                              {/* <th className='p-4 border-0' scope="row">{months[current.getMonth()]} {calculateWeekOf()}</th> */}
                                {employee.work ? (
                                    employee.work.map((entry, index) => {
                                            return(
                                                <td key={index} className='border-0'>
                                                    <HoursCard 
                                                        day={weekday[entry.day]} 
                                                        month={months[entry.month]} 
                                                        date={entry.date} 
                                                        hoursWorked={JSON.parse(entry.hoursWorked)} 
                                                        startTime={entry.startTime} 
                                                        endTime={entry.endTime} 
                                                        user={user} 
                                                        employee={employee}
                                                    />
                                                </td>
                                            )
                                    })
                                ) : ('')}
                        </tr>
                    </tbody>
                </Table>
            </Row>
            <AlertModal handleShow={handleShow} setShow={setShow} show={show}/>
        </Container>
    );
}
 
export default EmployeeProfilePage;