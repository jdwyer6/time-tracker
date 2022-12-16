import { Container, Row, Col, Table } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link, Navigate } from "react-router-dom";
import {BsPeople, BsPersonCircle, BsPerson} from 'react-icons/bs';
import { TbRadiusBottomLeft } from "react-icons/tb";
import EditHoursModal from "../components/EditHoursModal";
import {MdAddCircleOutline} from 'react-icons/md';
import AddEmployees from "../components/AddEmployees";
import { ImClock } from "react-icons/im";
import uuid4 from "uuid4";
import Axios from "axios";
import Popup from "../components/Popup";
import { MdConstruction } from "react-icons/md";
import { ImHome } from 'react-icons/im';
import {RiMoneyDollarCircleFill} from 'react-icons/ri';
import {FaAddressCard} from 'react-icons/fa'
import BarChart from "../components/BarChart";
import {FiSettings} from 'react-icons/fi';
import { toDate } from 'date-fns';
import { AiFillBug } from 'react-icons/ai';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

const EmployeeReports = () => {

    const [tempUser, setTempUser] = useState(JSON.parse(localStorage.getItem('currentUser')));
    const [ user, setUser ] = useState();
    const [ employees, setEmployees] = useState();
    const [ businessID, setbusinessId ] = useState();
    const [ isLoading, setLoading ] = useState(true);
    const [ current, setCurrent ] = useState();
    const [reversedHours, setReversedHours] = useState(); 
    const [lastData, setLastData ] = useState();
    const ref = useRef();
    const [prevRef, setPrevRef] = useState();
    let currentDay = new Date();
    const [shortTime, setShortTime] = useState(currentDay.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}));
    const [ currentValuesToEdit, setCurrentValuesToEdit] = useState({
        start: undefined,
        end: undefined,
        date: undefined,
        index: undefined
    });

    const [ showEditModal, setShowEditModal] = useState();
    const handleShowEditModal = (start, end, date, month, jobId) => {
        setCurrentValuesToEdit({
            date: `${month}/${date}`,
            start: start,
            end: end,
            jobId: jobId
        })
        setShowEditModal(true);
    }

    const [showAddEmployees, setShowAddEmployees] = useState(false);
    const handleCloseAddEmployees = () => setShowAddEmployees(false);
    const handleShowAddEmployees = () => setShowAddEmployees(true);

    const [showPopup, setShowPopup] = useState(false);
    const handleClosePopup = () => setShowPopup(false);
    const handleShowPopup = () => setShowPopup(true);

    useEffect(() => {
        axios.get(`https://clockedin.herokuapp.com/user/${tempUser._id}`)
        .then((res) => {
            if(res.status === 200){
                setUser(res.data);
                setbusinessId(res.data.businessId)
            }
        })
        .catch(error => {
            console.log(error)
        }) 
        setInterval(()=>{
            setShortTime(new Date().toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}));
        }, 1000)
    },[])

    const getAllUsers = async () => {
        const allUsers = await axios.get(`https://clockedin.herokuapp.com/getUsers`)
        const filteredEmployees = allUsers.data.filter(user => user.businessId === businessID)
        setEmployees(filteredEmployees)
    }

    useEffect(()=>{
        if(user){
           getAllUsers();
        }
    }, [user])

    useEffect(()=>{
        if(employees){
            setCurrent(employees[0])
        }
    }, [employees])

    useEffect(()=>{
        if(current !== undefined){
            setReversedHours([...current.hours].reverse());
            setLastData(current.hours.slice(-1))
            setLoading(false)
        }
    }, [current])


    const months = [
        'Jan', 
        'Feb', 
        'Mar', 
        'Apr', 
        'May', 
        'Jun', 
        'Jul', 
        'Aug', 
        'Sep', 
        'Oct', 
        'Nov', 
        'Dec'
    ];

    const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wed', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const getWeek = () => {
        let currentDate = new Date();
        let startDate = new Date(currentDate.getFullYear(), 0, 1);
        var days = Math.floor((currentDate - startDate) /
            (24 * 60 * 60 * 1000));
        var weekNumber = Math.ceil(days / 7);  
        return weekNumber  
    }

    function handleClockIn(){ 
        const data = {
            jobId: uuid4(), 
            start: currentDay.getTime(), 
            startTime: shortTime, 
            fullStartDate: toDate(currentDay.getTime())
        }
        const currentlyClockedIn = true;

        Axios.post(`https://clockedin.herokuapp.com/user/${current._id}`, {data: data, currentlyClockedIn: currentlyClockedIn})
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
            date: currentDay.getDate(), 
            month: currentDay.getMonth(), 
            day: currentDay.getDay(), 
            weekNumber: getWeek(), 
            end: currentDay.getTime(), 
            hoursWorked: JSON.parse(((currentDay.getTime()-lastData[0].start)/3600000).toFixed(4)), 
            endTime: shortTime,
            fullEndDate: toDate(currentDay.getTime())
        }

        Axios.put(`https://clockedin.herokuapp.com/user/${current._id}`, {data: data})
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

    function handleNameClick(employee, e){
        if(prevRef){
            prevRef.classList.toggle('active')
        }
        setPrevRef(e.target)
        setCurrent(employee)
        ref.current = e.target
        ref.current.classList.toggle('active')
        
    }

    tippy('#hoursTip', {
        content: "Click to edit",
    });

    if(isLoading){
        return (
            <Container className='text-center my-5'>

                <LoadingSpinner />
                <h4 className='text-white'>Loading...</h4>
            </Container>
        )
    }

    return ( 
        <Container style={{height: '100vh'}}>
            {/* <Row className='text-center mt-5'> */}
                <div className='bg-container-general text-center mt-3'>
                    <h1>{user.businessName}</h1>
                    <h3>Dashboard</h3>
                </div>
                
            {/* </Row> */}
            <Row className='bg-container-general'>
                <Col>
                    <Col className='bg-container-blue'>
                        <div className="border-bottom">
                            <h2 className='mb-0'>Actions</h2>
                        </div>
                        <div className='mt-2'>
                            <p className='text-white mb-1 hover' onClick={handleShowAddEmployees}><MdAddCircleOutline className='me-2'/>Add Employees</p>
                            <p className='text-white mb-1 hover' onClick={handleShowPopup}><FiSettings className='me-2'/>Settings</p>
                            <p className='text-white mb-1 hover' onClick={handleShowPopup}><FaAddressCard className='me-2'/>Employee Details</p>
                        </div>
                    </Col>
                    <Col className='bg-container-blue hover' onClick={handleShowPopup}>
                        <RiMoneyDollarCircleFill className='text-white text-center' style={{width: '100%', height: '80px'}}/>
                        <h2 className='text-center mb-0'>Payroll</h2>
                    </Col>
                    <Col className='bg-container-blue hover'>
                        <Link to='/employeeprofile' className='text-decoration-none'>
                            <ImHome className='text-white text-center' style={{width: '100%', height: '50px'}}/>
                            <h2 className='text-center mb-0'>Home</h2>
                            <h4 className='text-white text-center'>Go back</h4>
                        </Link>
                    </Col>
                    <Col className='bg-container-blue hover'>
                        <a href='mailto:dwyerjakej@gmail.com' className="text-decoration-none">
                            <AiFillBug className='text-white text-center' style={{width: '100%', height: '50px'}}/>
                            <h2 className='text-center mb-0'>Bug reports</h2>
                            <h4 className='text-white text-center'>Send feedback</h4>
                        </a>

                    </Col>
                </Col>
                <Col className='bg-container-blue'>
                    <div className="border-bottom">
                        <h2 className='mb-0'>Employees</h2>
                    </div>
                {employees.map((employee)=> (
                            <div 
                                ref={ref} 
                                key={employee._id} 
                                className={employee.clockedIn === true ? 'employee-list-item clockedIn-color' : 'employee-list-item clockedOut-color'} 
                                onClick={(e)=>handleNameClick(employee, e)} 
                                style={{borderRadius: '6px'}}
                            >
                                <p className='my-0'>{employee.name}</p>
                                <p className='font-small my-0 d-none d-sm-block'>{employee.position}</p>
     
                                <div className='d-flex flex-column align-items-end'>
                                    {employee.clockedIn ? (
                                        <p className='m-0 fw-bold'>clocked in</p>
                                    ) : (
                                        <p className='m-0 fw-bold'>clocked out</p>
                                    )}
                                </div>
                            </div>
                            
                        ))}
                </Col>
                <Col>
                    <div className='bg-container-blue'>
                        <div className="border-bottom">
                            <h2 className='mb-0'>Current Employee</h2>
                        </div>
                        <div className='d-flex justify-content-between my-3 align-items-center'>
                            <h3>{current.name}</h3>
                            {current.clockedIn === true ? (
                            <>
                                <button className='btn-2' onClick={handleClockOut}>Clock Out</button>
                            </>
                        ) : (
                            <>
                                <button className='btn-2' onClick={handleClockIn}>Clock In</button>
                            </>
                        )}
                        </div>
                        
                        <Table variant="dark" striped hover responsive>
                            <thead>
                                <tr>
                                    <th className='text-center text-white'><h4 className='mb-0'>Date</h4></th>
                                    <th className='text-center text-white'><h4 className='mb-0'>Start</h4></th>
                                    <th className='text-center text-white'><h4 className='mb-0'>End</h4></th>
                                    <th className='text-center text-white'><h4 className='mb-0'>Total</h4></th>
                                </tr>
                            </thead>
                            <tbody className='table-group-divider'>
                                {reversedHours.map((entry) => (
                                    <tr key={entry.fullStartDate} className='hours-list-item' onClick={()=>handleShowEditModal(entry.startTime, entry.endTime, entry.date, entry.month, entry.jobId)} id='hoursTip'>
                                        <td>{months[entry.month]} {entry.date}</td>
                                        <td>{entry.startTime}</td>
                                        <td>{entry.endTime}</td>
                                        <td>{entry.hoursWorked}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                    <div className='bg-container-blue'>
                        <div>
                            <h2>Time on site</h2>
                        </div>
                        <div>
                            <BarChart week={getWeek()} user={user}/>
                        </div>
                    </div>
                </Col>
            </Row>
            <Popup 
                show={showPopup} 
                handleClose={handleClosePopup} 
                handleShow={handleShowPopup} 
                setShow={setShowPopup} 
                title="Working on it!"  
                message='This feature is coming soon!' 
                image={<MdConstruction />}
            /> 
            <EditHoursModal 
                show={showEditModal} 
                setShow={setShowEditModal} 
                handleShow={handleShowEditModal}
                start={currentValuesToEdit.start}
                end={currentValuesToEdit.end}
                date={currentValuesToEdit.date}
                user={user}
                jobId={currentValuesToEdit.jobId}
            />
            <AddEmployees 
                show={showAddEmployees} 
                handleClose={handleCloseAddEmployees} 
                handleShow={handleShowAddEmployees} 
                setShow={setShowAddEmployees}
            />
        </Container> 
    );
}
 
export default EmployeeReports;