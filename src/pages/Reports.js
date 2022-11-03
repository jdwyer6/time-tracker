import { Container, Row, Col, Table } from 'react-bootstrap';
import { useEffect } from 'react';
import { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Reports = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('currentUser')));
    const navigate = useNavigate();
    const [isLoading, setLoading ] = useState(true);
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

    useEffect(() => {
        console.log(isLoading)
        Axios.get(`https://clockedin.herokuapp.com/user/${user._id}`)
        .then((res) => {
            if(res.status === 200){
                setUser(res.data);
                setLoading(false);
            }
            
        })
        .catch(error => {
            console.log(error.response)
        }) 

    },[])

    return (
        <Container fluid className='bg-dark'>
            <Row>
                <Col className='d-flex flex-column justify-content-end pb-5' style={{height: '100vh'}}>
                    <Col>

                    </Col>
                    <h1 className='text-white my-0'>Reports</h1>
                    <p className='text-white'>{user.name}</p>
                    <div>
                        <button className='btn-primary' onClick={()=>navigate('/employeeprofile')}>My profile</button>
                    </div>

                </Col>
                <Col className='d-flex flex-column my-5'>
                    <div>
                        <Table striped hover style={{borderRadius: '12px'}}>
                            <thead>
                                <tr className=''>
                                    <th className='text-white text-center'>Date</th>
                                    <th className='text-white text-center'>Start Time</th>
                                    <th className='text-white text-center'>End Time</th>
                                    <th className='text-white text-center'>Total</th>
                                </tr>
                            </thead>
                            <tbody className='table-group-divider text-white'>
                                {user.hours.map((entry) => (
                                    <tr className={getWeek() % 2 === 0 ? 'bg-transparent' : 'bg-secondary'}>
                                        <td className='text-white text-center font-small'>{months[entry.info.month]} {entry.info.date}</td>
                                        <td className='text-white text-center font-small'>{entry.info.startTime}</td>
                                        <td className='text-white text-center font-small'>{entry.info.endTime}</td>
                                        <td className='text-white text-center font-small'>{entry.info.hoursWorked}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>

                </Col>
            </Row>


            
        </Container>
     );
}
 
export default Reports;