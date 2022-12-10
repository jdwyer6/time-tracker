import { Container, Row, Col } from 'react-bootstrap';
import _default from 'react-bootstrap/esm/Accordion';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { MdConstruction } from 'react-icons/md';
import {BsPeople} from 'react-icons/bs';
import { ImClock } from 'react-icons/im';
import {GiChart} from 'react-icons/gi';
import{BiLogOut} from 'react-icons/bi';
import Timer from 'react-timer-wrapper';
import Timecode from 'react-timecode';
import uuid4 from "uuid4";
import ReportsBar from "../components/ReportsBar";
import Popup from '../components/Popup';
import Button_1 from "../components/Button_1";
import LoadingSpinner from "../components/LoadingSpinner";
import reportsIcon from '../images/ReportsIcon.png';
import signOutIcon from '../images/signOutIcon.png';
import groupIcon from '../images/groupIcon.png';
import clockIcon from '../images/clockIcon.png';

const EmployeeProfile = () => {
    const [tempUser, setTempUser] = useState(JSON.parse(localStorage.getItem('currentUser')));
    const [ user, setUser ] = useState();
    const [isLoading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const [clockedIn, setClockedIn] = useState();
    const [ amountOfTimeClockedIn, setAmountOfTimeClockedIn ] = useState(0);
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
    const [showReports, setShowReports] = useState(false);
    const handleCloseReports = () => setShowReports(false);
    const handleShowReports = () => setShowReports(true);
    const [showPopup, setShowPopup] = useState(false);
    const handleClosePopup = () => setShowPopup(false);
    const handleShowPopup = () => setShowPopup(true);

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
                getWeek();
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
            setClockedIn(JSON.parse(user.clockedIn))
            setLastData(user.hours.slice(-1))
            setInfo(user.hours.slice(-1))
            setUserFound(true);
            if(user.hours.length > 1){
                calculateProgressBar();
            }
            if(JSON.parse(user.clockedIn)){
                setAmountOfTimeClockedIn((current.getTime() - user.hours.at(-1).start))
            }
            
            setLoading(false)
        }
        
    }, [user])

    const calculateProgressBar = () => {
        const totalWeeklyHours = user.hours.filter(entry => entry.weekNumber = weekNumber);
        let total = 0;
        totalWeeklyHours.forEach((entry) =>{
            if(entry.hoursWorked){
                total = total + (JSON.parse(entry.hoursWorked))
            }
            
        })
        let totalAsPercent = (total/40) * 100
        if(totalAsPercent < 2){
            setProgress(2)
        }else{
            setProgress((total/40) * 100)
        }
    }

    function logout(){
        localStorage.removeItem('currentUser');
        localStorage.setItem('loggedIn', false);
        navigate('/')
        document.location.reload()
    }
    
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
            <Container className='text-center my-5'>

                <LoadingSpinner />
                <h4 className='text-white'>Loading...</h4>
            </Container>
        )
    }

    return ( 
        <Container className='' style={{height: '100vh'}}>
            <Row className='d-flex flex-row pt-3'>
                <h3 className='mb-0 d-inline'>{user.businessName}</h3>
                <p className='d-inline'>{user.name} {user.admin ? ('(admin)') : ('(employee)')}</p>
            </Row>
            <Row className='text-center border-bottom'>
                <h1>{weekday[current.getDay()]} {months[current.getMonth()]} {current.getDate()}</h1>
                
            </Row>
            <p>{time}</p>
            <Row>

            </Row>
            <Row>
                <Col md='6' className='p-2'>
                    <Button_1 
                        image={clockIcon}
                        title={user.clockedIn ? 'Clocked In' : 'Clock in'}
                        description={user.clockedIn ? 'Tracking your time. Click to end shift.' : 'Start my shift'}
                        icon={<ImClock className='me-2'/>}
                        imageSize='50%'
                        bgColor={user.clockedIn ? 'clockedIn-color' : ''}
                        clickAction = {user.clockedIn ? handleClockOut : handleClockIn}
                        time={user.clockedIn ? <Timer className='mx-1 text-white' style={{fontSize: '14px'}} active duration={null}  time={amountOfTimeClockedIn}><Timecode />
                        </Timer> : ''}
                    />
                </Col>
                <Col md='6'  className='p-2'>
                    <Button_1 
                        image={groupIcon}
                        title='My Employees'
                        description='Change status, see hours/reports'
                        icon={<BsPeople className='me-2'/>}
                        imageSize='50%'
                        clickAction = {()=>navigate('/employee-reports')}
                        
                    />
                </Col>
                <Col  md='6' className='p-2'>
                    <Button_1 
                            image={reportsIcon}
                            title='My Hours'
                            description='See logged hours.'
                            icon={<GiChart className='me-2'/>}
                            clickAction = {setShowReports}
                            imageSize='75%'
                        />
                </Col>
                <Col md='6' className='p-2'>
                    <Button_1 
                            image={signOutIcon}
                            title='Sign out'
                            description='Your progress will be saved'
                            icon={<BiLogOut className='me-2'/>}
                            imageSize='50%'
                            clickAction={logout}
                        />
                </Col>
            </Row>
            <ReportsBar show={showReports} handleClose={handleCloseReports} handleShow={handleShowReports} setShow={setShowReports} user={user} isLoading={isLoading}/>
            <Popup show={showPopup} handleClose={handleClosePopup} handleShow={handleShowPopup} setShow={setShowPopup} title="Working on it!"  message='This feature is coming soon!' image={<MdConstruction />}/> 
        </Container>
     );
}
 
export default EmployeeProfile;