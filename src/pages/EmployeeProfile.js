import Badge from "../components/Badge";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState, useRef, useCallback } from 'react';
import _default from 'react-bootstrap/esm/Accordion';
import Axios from 'axios';
import LoadingSpinner from "../components/LoadingSpinner";
import { MdLunchDining, MdSentimentSatisfied, MdTranslate } from 'react-icons/md';
import { IoMdOptions } from 'react-icons/io';
import { TbReportSearch } from 'react-icons/tb';
import {BsPeople} from 'react-icons/bs';
import { AiFillBackward } from 'react-icons/ai';
import { ImClock2, ImClock } from 'react-icons/im';
import Timer from 'react-timer-wrapper';
import Timecode from 'react-timecode';
import Spinner from 'react-bootstrap/Spinner';
import HoursCardTemp from "../components/HoursCard";
import uuid4 from "uuid4";
import CurrentTime from "../components/CurrentTime";
import AddEmployees from "../components/AddEmployees";
import ReportsBar from "../components/ReportsBar";

const EmployeeProfile = () => {
    const [tempUser, setTempUser] = useState(JSON.parse(localStorage.getItem('currentUser')));
    const [ user, setUser ] = useState();
    const [isLoading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const [clockedIn, setClockedIn] = useState();
    const [ userFound, setUserFound] = useState(false);
    const [progress, setProgress] = useState();
    const [weekNumber, setWeekNumber] = useState();
    let loggedToday = false;
    const navigate = useNavigate();
    let i = 0;
    const [lastData, setLastData ] = useState();
    let current = new Date();
    const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wed', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const [time, setTime] = useState(current.toLocaleTimeString());
    const [shortTime, setShortTime] = useState(current.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}));
    const [info, setInfo] = useState({});
    const [showAddEmployees, setShowAddEmployees] = useState(false);
    const handleCloseAddEmployees = () => setShowAddEmployees(false);
    const handleShowAddEmployees = () => setShowAddEmployees(true);
    const [showReports, setShowReports] = useState(false);
    const handleCloseReports = () => setShowReports(false);
    const handleShowReports = () => setShowReports(true);

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
        setWeekNumber(weekNumber)
    }

    useEffect(() => {
        Axios.get(`https://clockedin.herokuapp.com/user/${tempUser._id}`)
        .then((res) => {
            if(res.status === 200){
                setUser(res.data);
            }
        })
        .catch(error => {
            console.log(error)
        }) 
        setInterval(()=>{
            setTime(new Date().toLocaleTimeString())
            setShortTime(new Date().toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}));
        }, 1000)

       
        getWeek();
        
        
    },[])

    useEffect(()=>{
        if(user !== undefined){
            setClockedIn(JSON.parse(user.clockedIn))
            setLastData(user.hours.slice(-1))
            setInfo(user.hours.slice(-1))
            setUserFound(true);
            console.log(lastData)
            if(user.hours){
                // calculateProgressBar();
            }
            
            setLoading(false)
        }
        
    }, [user])

    const calculateProgressBar = () => {

        const totalWeeklyHours = user.hours.filter(entry => entry.info.weekNumber = weekNumber);
        let total = 0;
        totalWeeklyHours.forEach((entry) =>{
            total = total + (JSON.parse(entry.info.hoursWorked))
        })
        let totalAsPercent = (total/40) * 100
        if(totalAsPercent < 2){
            setProgress(2)
        }else{
            setProgress((total/40) * 100)
        }
        

         
    }

    // useEffect(()=>{
        
    //     if(info.end && !isLoading){
    //         pushinfo()
    //     }else{
    //         return
    //     }

    // }, [info.end])


    // useEffect(() => {
    //     if(!isLoading){

    //         saveStatus()
    //     }

    // }, [clockedIn])
    
    function handleClockIn(){ 
        const data = {
            jobId: uuid4(), 
            start: current.getTime(), 
            startTime: shortTime, 
        }
        const currentlyClockedIn = true;
        setClockedIn(true)

        Axios.post(`https://clockedin.herokuapp.com/user/${user._id}`, {data: data, currentlyClockedIn: currentlyClockedIn})
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

    function handleClockOut(){
        // setClockedIn(!clockedIn);
    
        const data = {
            date: current.getDate(), 
            month: current.getMonth(), 
            day: current.getDay(), 
            weekNumber: getWeek(), 
            end: current.getTime(), 
            hoursWorked: JSON.parse(((current.getTime()-lastData[0].start)/3600000).toFixed(4)), 
            endTime: shortTime,
        }
        setClockedIn(false)

        Axios.put(`https://clockedin.herokuapp.com/user/${user._id}`, {data: data})
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
        <Container fluid className='mobile-container'>
            <Row className='justify-content-end pt-5 d-none d-md-flex'>
                <Col md='6'>
                    <h5 className='text-white'>Recent hours</h5>
                </Col>
            </Row>
            <Row className='h-75'>
                <Col xs='12' md='6'>
                    <Row className='d-flex flex-column h-100' >
                        <Col className='d-flex align-items-start flex-column'>
                            <Badge name={user.name} position={user.position} image={user.image} admin={user.admin} showReports={handleShowReports}/>
                            
                        </Col>
                        <Col  className="d-flex flex-column align-items-start justify-content-center order-first order-md-last mt-3 my-md-0">
                            <h1 className='text-white m-0 h1-reduced'>{weekday[current.getDay()]} {months[current.getMonth()]} {current.getDate()}</h1>
                            <div style={{display: 'flex', width: '100%', justifyContent: 'start', flexDirection: 'column'}}>
                                <p className='text-white text-start m-0'>{time}</p>
                                <div className='my-1'>
                                    {clockedIn === false ? (
                                            <button onClick={()=>handleClockIn()} className='btn-primary'><ImClock className='mx-1'/>Clock in</button>
                                        ) : (
                                            <>
                                                <div className='d-flex justify-content-start'>
                                                    <button onClick={()=>handleClockOut()} className='btn-alert d-flex align-items-center'>
                                                            <ImClock2 className='mx-1'/>Clock out <Timer className='mx-1' style={{fontSize: '14px'}} active duration={null}><Timecode />
                                                            </Timer>
                                                    </button>
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
                    <Row className= 'd-flex flex-column h-100'>
                        <Col className='d-none d-md-block'>
                            {user.hours.length > 0 ? 
                                (
                                    <HoursCardTemp 
                                        key={lastData[0].jobId} 
                                        day={weekday[lastData[0].day]} 
                                        month={months[lastData[0].month]} 
                                        date={lastData[0].date} 
                                        start={lastData[0].startTime} 
                                        end={lastData[0].endTime} 
                                        total={lastData[0].hoursWorked}
                                    />
                                )
                             : ('')}
                        </Col>
                        {user.admin ? (
                            <Col className='d-flex flex-column'>
            
                                <h3 className='text-white d-none d-md-block'>Admin options</h3>
                                <p className='text-white d-md-none my-0'>Admin options</p>
                                <div className='d-flex flex-column'>
                                    <button className='btn-large my-1 my-md-2'  onClick={handleShowAddEmployees}><BsPeople className='mx-3'/>Add employees</button>
                                    <Link to='/employee-reports'>
                                        <button className='btn-large my-1 my-md-2'><TbReportSearch className='mx-3'/>View employee reports</button>
                                    </Link>
                                    
                                    <button className='btn-large my-1 my-md-2'><IoMdOptions className='mx-3' />Options</button>
                                </div>

                            </Col>
                        ):('')}

                    </Row>

                </Col>
            </Row>
            <Row className='d-md-block mt-3'>
                <Col>
                    <div style={{backgroundColor: '#fff', height: '20px', borderRadius: '4px', position: 'relative'}}>
                        <div style={{background: '#002FD6', height: '16px', width: `${progress -1 }%`, borderRadius: '4px', position: 'absolute', top: '8%', transform: 'translateY(-50%)', left: '0', transform: 'translateX(.5%)'}}></div>
                    </div>
                    <div className='px-0 py-1 d-flex justify-content-between'>
                        <div className='font-small text-white'>Weekly progress</div>
                        <p className='font-small text-white'>40 hours</p>
                    </div>
                </Col>

            </Row>
            <AddEmployees show={showAddEmployees} handleClose={handleCloseAddEmployees} handleShow={handleShowAddEmployees} setShow={setShowAddEmployees}/>
            <ReportsBar show={showReports} handleClose={handleCloseReports} handleShow={handleShowReports} setShow={setShowReports} user={user} isLoading={isLoading}/>
        </Container>
     );
}
 
export default EmployeeProfile;