import Badge from "../components/Badge";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import _default from 'react-bootstrap/esm/Accordion';
import Axios from 'axios';
import LoadingSpinner from "../components/LoadingSpinner";
import { MdLunchDining, MdTranslate } from 'react-icons/md';
import { AiFillBackward } from 'react-icons/ai';
import { ImClock2, ImClock } from 'react-icons/im';
import Timer from 'react-timer-wrapper';
import Timecode from 'react-timecode';
import Spinner from 'react-bootstrap/Spinner';
import HoursCardTemp from "../components/HoursCard";
import uuid4 from "uuid4";

const EmployeeProfile = () => {
    const [tempUser, setTempUser] = useState(JSON.parse(localStorage.getItem('currentUser')));
    const [ user, setUser ] = useState();
    const [isLoading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const [clockedIn, setClockedIn] = useState();
    const [ previousInfoSet, setPreviousInfo] = useState(false);
    const [progress, setProgress] = useState();
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

    function calculateWeekOf(){
        let day = current.getDay();
        let date = current.getDate();
        return (date - day) + 1;
    }

    // const checkLastLogged = async () =>{
    //     const getInfo = await Axios.get(`https://clockedin.herokuapp.com/user/${tempUser._id}`)
    //     const clockedInStatus = getInfo.data.lastLoggedInfo.info.clockedIn
    //     if(clockedInStatus === true){
    //         setClockedIn(true);
    //     }else{
    //         setClockedIn(false);
    //     }
    //     setLoading(false)

    // }

    const getWeek = () => {
        let currentDate = new Date();
        let startDate = new Date(currentDate.getFullYear(), 0, 1);
        var days = Math.floor((currentDate - startDate) /
            (24 * 60 * 60 * 1000));
        var weekNumber = Math.ceil(days / 7);  
        return weekNumber  
    }

    useEffect(() => {
        console.log(1)
        Axios.get(`https://clockedin.herokuapp.com/user/${tempUser._id}`)
        .then((res) => {
            if(res.status === 200){
                setUser(res.data);
                setProgress(calculateProgressBar(res))
            }
        })
        .catch(error => {
            console.log(error)
        }) 
        setInterval(()=>{
            setTime(new Date().toLocaleTimeString())
            setShortTime(new Date().toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}));
        }, 1000)

    },[])

    useEffect(()=>{
        if(user !== undefined){
            console.log(user)
            setClockedIn(user.clockedIn)
            setLastData(user.hours.slice(-1))
            // console.log(lastData[0].info.day)
            if(user.clockedIn){
                // setInfo(user.lastLoggedInfo.info)
            }
                
                // setPreviousInfo(true)
            setLoading(false)

            
        }
        
    }, [user])


    const calculateProgressBar = (res) => {
        const totalWeeklyHours = res.data.hours.filter(entry => entry.info.weekNumber = getWeek());
        let total = 0;
        totalWeeklyHours.forEach((entry) =>{
            total = total + (JSON.parse(entry.info.hoursWorked))
        })
        let totalAsPercent = (total/40) * 100
        if(totalAsPercent < 1){
            return 2
        }
        return (total/40) * 100
        
    }

    useEffect(()=>{
        
        if(info.end && !isLoading){
            pushinfo()
            console.log('infoPushed')
        }else{
            return
        }

    }, [info.end])


    useEffect(() => {
        if(!isLoading){
            console.log('saveStatus()')
            saveStatus()
        }
    }, [clockedIn])
    

    function handleClockIn(){ 

        setClockedIn(!clockedIn); 
        setInfo({...info, jobId: uuid4(), start: current.getTime(), startTime: shortTime, clockedIn: true});
    }

    function saveStatus(){
        Axios.post(`https://clockedin.herokuapp.com/user/${tempUser._id}/${clockedIn}`)
        .then((res) => {
            if(res.status === 200){
                // setClockedIn(res.data.clockedIn);
            }else{
                console.log('There was an error')
            }
        })
        .catch(error => {
            console.log(error)
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
            <Row className='d-flex justify-content-end pt-5'>
                <Col md='6'>
                    <h3 className='text-white'>Recent</h3>
                </Col>
            </Row>
            <Row style={{height: '80vh'}}>
                <Col>
                    <Row className='d-flex flex-column h-100' >
                        <Col className='d-flex align-items-start flex-column'>
                            <Badge name={user.name} position='Software Engineer' image={user.image} admin={user.admin}/>
                            
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
                    <Row className='d-flex flex-column'>
                        <Col className='d-flex justify-content-center flex-column'>
                            {user.hours ? 
                                (
                                    <HoursCardTemp 
                                        key={lastData[0].info.jobId} 
                                        day={weekday[lastData[0].info.day]} 
                                        month={months[lastData[0].info.month]} 
                                        date={lastData[0].info.date} 
                                        start={lastData[0].info.startTime} 
                                        end={lastData[0].info.endTime} 
                                        total={lastData[0].info.hoursWorked}
                                    />
                                )
                             : ('')}
                        </Col>
                    </Row>
                    
                </Col>
            </Row>
            <Row>
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
        </Container>
     );
}
 
export default EmployeeProfile;