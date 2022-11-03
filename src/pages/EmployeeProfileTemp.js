import Badge from "../components/Badge";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import _default from 'react-bootstrap/esm/Accordion';
import Axios from 'axios';
import LoadingSpinner from "../components/LoadingSpinner";
import { MdLunchDining, MdTranslate } from 'react-icons/md';
import { AiFillBackward } from 'react-icons/ai';
import { ImClock2, ImClock } from 'react-icons/im';
import Timer from 'react-timer-wrapper';
import Timecode from 'react-timecode';
import Spinner from 'react-bootstrap/Spinner';
import HoursCardTemp from "../components/HoursCardTemp";
import uuid4 from "uuid4";

const EmployeeProfileTemp = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('currentUser')));
    const [isLoading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const [clockedIn, setClockedIn] = useState(false);
    const [reversedHours, setReversedHours] = useState();
    const [progress, setProgress] = useState();
    const [status, setStatus] = useState();
    let loggedToday = false;
    const navigate = useNavigate();
    let i = 0;

    let current = new Date();
    const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wed', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const [time, setTime] = useState(current.toLocaleTimeString());
    const [shortTime, setShortTime] = useState(current.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}));
    const [info, setInfo] = useState({});

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
        Axios.get(`https://clockedin.herokuapp.com/user/${user._id}`)
        .then((res) => {
            if(res.status === 200){
                setUser(res.data);
                setClockedIn(res.data.clockedIn);
            }
            
        })
        .then(()=>{
            calculateProgressBar();
            setLoading(false);
        })
        .catch(error => {
            console.log(error)
        }) 
        setInterval(()=>{
            setTime(new Date().toLocaleTimeString())
            setShortTime(new Date().toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}));
        }, 1000)
    },[])

    
    const calculateProgressBar = () => {
        const totalWeeklyHours = user.hours.filter(entry => entry.weekNumber = getWeek());
        let total = 0;
        totalWeeklyHours.forEach((entry) =>{
            total = total + (JSON.parse(entry.info.hoursWorked))
        } )
        setProgress((total/40) * 100)
        console.log('progress', progress)
        
    }
    
    useEffect(()=>{
        
        if(info.end){
            pushinfo()
        }else{
            return
        }

    }, [info.end])

    useEffect(() => {
        saveStatus()
    }, [clockedIn])
    

    function handleClockIn(){ 
        // user.hours.forEach(element => {
        //     element.date === current.getDate() ? loggedToday = true : loggedToday = false;
        // })

        setClockedIn(!clockedIn); 
        setInfo({...info, jobId: uuid4(), start: current.getTime(), startTime: shortTime, clockedIn: true});

    }

    function saveStatus(){
        Axios.post(`https://clockedin.herokuapp.com/user/${user._id}/${clockedIn}`)
        .then((res) => {
            if(res.status === 200){
                setClockedIn(res.data.clockedIn);
                console.log('ClockedIn: ', clockedIn)
            }else{
                console.log('There was an error')
            }
        })
        .catch(error => {
            console.log(error.response)
        })
    }

    function handleClockOut(){
        setClockedIn(!clockedIn);
        setInfo({...info, 
            date: current.getDate(), 
            month: current.getMonth(), 
            day: current.getDay(), 
            weekNumber: getWeek(), 
            end: current.getTime(), 
            hoursWorked: JSON.parse(((current.getTime()-info.start)/3600000).toFixed(4)), 
            endTime: shortTime,
            clockedIn: false
        });
    }

    const pushinfo = (e) => {
        Axios.post(`https://clockedin.herokuapp.com/user/${user._id}`, {info: info})
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

    if(isLoading){
        return (
            <>
                <LoadingSpinner />
                <h4>Loading...</h4>
            </>
        )
    }

    return ( 
        <Container fluid className='bg-dark'>
            <Row>
                <Col>
                    <Row className='d-flex flex-column' style={{height: '90vh'}}>
                        <Col className='d-flex align-items-center'>
                            <Badge name={user.name} position='Software Engineer' image={user.image}/>
                        </Col>
                        <Col className="d-flex flex-column align-items-start justify-content-center">
                            <h1 className='text-white m-0'>{weekday[current.getDay()]} {months[current.getMonth()]} {current.getDate()}</h1>
                            <div style={{display: 'flex', width: '100%', justifyContent: 'start', flexDirection: 'column'}}>
                                <p className='text-white text-start m-0'>{time}</p>
                                <div className='my-1'>
                                    {clockedIn === false ? (
                                            <button onClick={()=>handleClockIn()} className='btn-primary'><ImClock className='mx-1'/>Clock in</button>
                                        ) : (
                                            <>
                                                <div className='d-flex justify-content-start'>

                                                    <button onClick={()=>handleClockOut()} className='btn-alert d-flex align-items-center'><ImClock2 className='mx-1'/>Clock out <Timer className='mx-1' style={{fontSize: '14px'}} active duration={null}><Timecode /></Timer></button>
                                                    <button className='btn-primary mx-2'><MdLunchDining className='mx-2'/>Break</button>
                                                </div>

                                                <div className='d-flex mt-1'>
                                                    <Spinner animation="grow" className='tracking-icon'/>
                                                    <p style={{fontSize: '80%', color: 'white'}}>Tracking your time</p>
                                                </div>
                                            </>
                                    )}
                                </div>
                            </div>
                        </Col>
                    </Row>
                   
                    
                </Col>
                <Col>
                    <Row className='d-flex flex-column' style={{height: '90vh'}}>
                        <Col className='d-flex justify-content-center flex-column'>
                            <h3 className='text-white'>Recent Hours</h3>
                            {user.hours ? 
                                user.hours.map((shift) => {
                                    if(i < 3){
                                        i++
                                        return <HoursCardTemp key={shift.info.jobId} day={weekday[shift.info.day]} month={months[shift.info.month]} date={shift.info.date} start={shift.info.startTime} end={shift.info.endTime} total={shift.info.hoursWorked}/>
                                    }
                                })
                             : ('')}
                        </Col>
                    </Row>
                    
                </Col>
            </Row>
            <Row className='mx-3'>
                <div style={{backgroundColor: '#fff', height: '20px', borderRadius: '4px', position: 'relative'}}>
                    <div style={{background: '#002FD6', height: '16px', width: `${progress}%`, borderRadius: '4px', position: 'absolute', top: '8%', transform: 'translateY(-50%)', left: '0', transform: 'translateX(.5%)'}}></div>
                </div>
                <div className='px-0 py-1 d-flex justify-content-between'>
                    <div className='font-small text-white'>Weekly progress
                        <Spinner animation="grow" style={{color: 'white', width: '.1rem', height: '.1rem'}} className='mx-1'/>
                        <Spinner animation="grow" style={{color: 'white', width: '.1rem', height: '.1rem'}} className='mx-1'/>
                        <Spinner animation="grow" style={{color: 'white', width: '.1rem', height: '.1rem'}} className='mx-1'/>
                    </div>
                    <p className='font-small text-white'>40 hours</p>
                </div>
            </Row>
        </Container>
     );
}
 
export default EmployeeProfileTemp;