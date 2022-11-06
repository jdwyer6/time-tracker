import { Container, Row, Col, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";

const EmployeeReports = () => {

    const [tempUser, setTempUser] = useState(JSON.parse(localStorage.getItem('currentUser')));
    const [ user, setUser ] = useState();
    const [ employees, setEmployees] = useState();
    const [ businessID, setbusinessId ] = useState();
    const [ isLoading, setLoading ] = useState(true);
    const [ current, setCurrent ] = useState();
    const [reversedHours, setReversedHours] = useState(); 

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
            console.log(employees)
            setCurrent(employees[0])

            
        }
    }, [employees])

    useEffect(()=>{
        if(current !== undefined){
            setReversedHours([...current.hours].reverse());
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
        'Dec'];

    const getWeek = () => {
        let currentDate = new Date();
        let startDate = new Date(currentDate.getFullYear(), 0, 1);
        var days = Math.floor((currentDate - startDate) /
            (24 * 60 * 60 * 1000));
        var weekNumber = Math.ceil(days / 7);  
        return weekNumber  
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
        <Container fluid style={{height: '100vh'}}>
            <Row className='pt-5 pb-0'>
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
            <Row style={{height: '100vh'}}>
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
                                        <p className='m-0 font-small text-success'>clocked in</p>
                                    ) : (
                                        <p className='m-0 font-small text-secondary'>clocked out</p>
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
                                <tr key={entry.info.start} className={getWeek() % 2 === 0 ? 'bg-transparent' : 'bg-secondary'}>
                                    <td className='text-center font-small text-white'>{months[entry.info.month]} {entry.info.date}</td>
                                    <td className='text-center font-small text-white'>{entry.info.startTime}</td>
                                    <td className='text-center font-small text-white'>{entry.info.endTime}</td>
                                    <td className='text-center font-small text-white'>{entry.info.hoursWorked}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container> 
    );
}
 
export default EmployeeReports;