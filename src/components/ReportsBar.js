import Offcanvas from 'react-bootstrap/Offcanvas';
import { Table } from 'react-bootstrap';
import { useState } from 'react';
import { useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';
import Axios from 'axios';

const ReportsBar = ({show, handleClose, user}) => {

    const [tempUser, setTempUser] = useState(JSON.parse(localStorage.getItem('currentUser')));
    const [ isLoading, setLoading] = useState(true);
    const [reversedHours, setReversedHours] = useState(); 


    useEffect(()=>{
        if(user){
            setReversedHours([...user.hours].reverse());
            setLoading(false)
        }
    }, [user])

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
        <>
            <Offcanvas show={show} onHide={handleClose} className='side-bar'>
                <Offcanvas.Header closeButton className='btn-close-white'>
                    <Offcanvas.Title><h2 className='text-black'>My hours</h2></Offcanvas.Title>
                </Offcanvas.Header>
                
                <Offcanvas.Body>
                    <Table striped hover variant='dark' style={{borderRadius: '12px'}}>
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
                                        <tr key={entry.start} className='clickable'>
                                            <td className='text-center font-small'>{months[entry.month]} {entry.date}</td>
                                            <td className='text-center font-small'>{entry.startTime}</td>
                                            <td className='text-center font-small'>{entry.endTime}</td>
                                            <td className='text-center font-small'>{entry.hoursWorked}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                </Offcanvas.Body>
            </Offcanvas>
        </>
     );
}
 
export default ReportsBar;