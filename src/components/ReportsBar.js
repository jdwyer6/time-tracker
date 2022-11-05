import Offcanvas from 'react-bootstrap/Offcanvas';
import { Table } from 'react-bootstrap';
import { useState } from 'react';
import { useEffect } from 'react';

const ReportsBar = ({show, handleClose, user}) => {

    const [ isLoading, setLoading] = useState(true);
    const reversedHours = [...user.hours].reverse();

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

    // if(isLoading){
    //     return (
    //         <>
    //             <LoadingSpinner />
    //             <h4>Loading...</h4>
    //         </>
    //     )
    // }

    return ( 
        <>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>My hours</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Table striped hover style={{borderRadius: '12px'}}>
                                <thead>
                                    <tr className=''>
                                        <th className='text-center'>Date</th>
                                        <th className='text-center'>Start Time</th>
                                        <th className='text-center'>End Time</th>
                                        <th className='text-center'>Total</th>
                                    </tr>
                                </thead>
                                <tbody className='table-group-divider'>
                                    {reversedHours.map((entry) => (
                                        <tr key={entry.info.start} className={getWeek() % 2 === 0 ? 'bg-transparent' : 'bg-secondary'}>
                                            <td className='text-center font-small'>{months[entry.info.month]} {entry.info.date}</td>
                                            <td className='text-center font-small'>{entry.info.startTime}</td>
                                            <td className='text-center font-small'>{entry.info.endTime}</td>
                                            <td className='text-center font-small'>{entry.info.hoursWorked}</td>
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