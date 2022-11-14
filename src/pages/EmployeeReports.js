import { Container, Row, Col, Table } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";
import {IoIosArrowDropleft} from 'react-icons/io';
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
    const [ infoToEdit, setInfoToEdit ] = useState({
        start: ''
    });
    let currentDay = new Date();
    const [shortTime, setShortTime] = useState(currentDay.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}));

    const [ showEditModal, setShowEditModal] = useState();
    const handleCloseEditModal = () => setShowEditModal(false);
    const handleShowEditModal = () => setShowEditModal(true);

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
            <Row className='text-center border-bottom mt-5'>
                <h1 style={{marginBottom: '-10px'}}>{weekday[currentDay.getDay()]} {months[currentDay.getMonth()]} {currentDay.getDate()}</h1>
            </Row>
            <Row>
                <Link to='/employeeprofile' className='px-0' style={{textDecoration: 'none'}}>
                    <p className='p-0 btn-no-style'><IoIosArrowDropleft style={{fontSize: '1.5rem'}}/> Back to dashboard</p>
                </Link>
            </Row>
            <Row className='mt-3'>
                <Col className='items-container me-3'>
                    <div className='d-flex align-items-end border-bottom justify-content-between'>
                        <h2 className='mb-0'><BsPeople className='me-2' />My Employees</h2>
                        <button className='btn-no-style d-none d-sm-flex' onClick={handleShowAddEmployees}><MdAddCircleOutline style={{fontSize: '1.5rem', marginRight: '.5rem', width: '20px'}} /> Add employee</button>
                        <button className='btn-no-style d-flex d-sm-none' onClick={handleShowAddEmployees}><MdAddCircleOutline style={{fontSize: '1.5rem', marginRight: '.5rem', width: '20px'}} /> Add</button>
                    </div>
                    
                    <div className='mt-4'>
                        {employees.map((employee)=> (
                            <div ref={ref} key={employee._id} className={employee.clockedIn === true ? 'employee-list-item clockedIn-color' : 'employee-list-item clockedOut-color'} onClick={(e)=>handleNameClick(employee, e)} style={{borderRadius: '6px'}}>
      
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
                    </div>
                </Col>
                <Col className='items-container'>
                    <div className='d-flex align-items-end border-bottom justify-content-between'>
                        <h2 className='mb-0'><BsPerson className='me-2' />{current.name}</h2>
                        {current.clockedIn === true ? (
                            <>
                                <button className='btn-no-style d-none d-sm-flex' onClick={handleClockOut}><ImClock style={{fontSize: '1.5rem', marginRight: '.5rem', width: '15px'}} /> Clock {current.name} out</button>
                                <button className='btn-no-style d-flex d-sm-none' onClick={handleClockOut}><ImClock style={{fontSize: '1.5rem', marginRight: '.5rem', width: '15px'}} /> Out</button>
                            </>
           
                        ) : (
                            <>
                                <button className='btn-no-style d-none d-sm-flex' onClick={handleClockIn}><ImClock style={{fontSize: '1.5rem', marginRight: '.5rem', width: '15px'}} /> Clock {current.name} in</button>
                                <button className='btn-no-style d-flex d-sm-none' onClick={handleClockIn}><ImClock style={{fontSize: '1.5rem', marginRight: '.5rem', width: '15px'}} /> In</button>
                            </>

                        )}
                        
                        
                    </div>

                    <Table className='mt-3' variant="dark" striped hover responsive>

                        <thead>
                            <tr>
                                <th className='text-center text-white'><h2 className='mb-0'>Date</h2></th>
                                <th className='text-center text-white'><h2 className='mb-0'>Start time</h2></th>
                                <th className='text-center text-white'><h2 className='mb-0'>End time</h2></th>
                                <th className='text-center text-white'><h2 className='mb-0'>Total</h2></th>
                            </tr>
                        </thead>
                        <tbody className='table-group-divider'>
                            {reversedHours.map((entry) => (
                                <tr key={entry.start} className='hours-list-item' onClick={handleShowPopup}>
                                    <td className=''>{months[entry.month]} {entry.date}</td>
                                    <td className=''>{entry.startTime}</td>
                                    <td className=''>{entry.endTime}</td>
                                    <td className=''>{entry.hoursWorked}</td>
                                </tr>
                            ))}
                        </tbody>

                    </Table>
                </Col>
            </Row>














            {/* <Row className='pt-5 pb-0'>
                <Col>
                    <h3 className='text-white mb-0'>My employees</h3>
                    <p className='font-small text-white'>Click employee to view logged hours</p>
                    <Link to='/employeeprofile'>
                        <button className='btn-primary'>Back to profile</button>
                    </Link>
                   
                </Col>
                <Col className='d-flex justify-content-start text-start'>
                    <div className='text-white d-flex justify-content-center align-items-center'>
                        <p className='text-white my-0'>Showing data for: </p>    
                        <h4 className='mx-2'>{current.name}</h4>
                    </div>
                    
                </Col>

            </Row>
            <Row>
                <Col>
                    <div>
                        {employees.map((employee)=> (
                            <div key={employee._id} className='bg-white p-3 my-3 d-flex justify-content-between hover-effect' onClick={()=>setCurrent(employee)} style={{borderRadius: '6px', maxWidth: '600px'}}>
                               
                                <div className='d-flex'>
                                    <img src={employee.image} style={{width: '3rem'}}/>
                                    <div className='mx-3'>
                                        <p className='my-0'>{employee.name}</p>
                                        <p className='font-small my-0'>Software engineer</p>
                                    </div>
                                </div>
                                <div className='d-flex flex-column align-items-end'>
                                    <p className='m-0 font-small'>STATUS:</p>
                                    {employee.clockedIn ? (
                                        <p className='m-0 font-small text-success fw-bold'>clocked in</p>
                                    ) : (
                                        <p className='m-0 font-small text-danger'>clocked out</p>
                                    )}
                                </div>

                            </div>
                            
                        ))}
                    </div>
                </Col>
                <Col>
                    <Table striped hover style={{borderRadius: '12px'}}>
                        <thead>
                            <tr className=''>
                                <th className='text-center text-white'>Date</th>
                                <th className='text-center text-white'>Start Time</th>
                                <th className='text-center text-white'>End Time</th>
                                <th className='text-center text-white'>Total</th>
                            </tr>
                        </thead>
                        <tbody className='table-group-divider'>
                            {reversedHours.map((entry) => (
                                <tr key={entry.start} className={getWeek() % 2 === 0 ? 'bg-transparent' : 'bg-secondary'}>
                                    <td className='text-center font-small text-white'>{months[entry.month]} {entry.date}</td>
                                    <td className='text-center font-small text-white'>{entry.startTime}</td>
                                    <td className='text-center font-small text-white'>{entry.endTime}</td>
                                    <td className='text-center font-small text-white'>{entry.hoursWorked}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row> */}
            <Popup show={showPopup} handleClose={handleClosePopup} handleShow={handleShowPopup} setShow={setShowPopup} title="Working on it!"  message='This feature is coming soon!' image={<MdConstruction />}/> 
            <EditHoursModal show={showEditModal} setShow={setShowEditModal} />
            <AddEmployees show={showAddEmployees} handleClose={handleCloseAddEmployees} handleShow={handleShowAddEmployees} setShow={setShowAddEmployees}/>
        </Container> 
    );
}
 
export default EmployeeReports;