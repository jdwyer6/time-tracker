import { AiFillCloseCircle } from 'react-icons/ai';
import ReactTooltip from 'react-tooltip';

const HoursCard = ({day, month, date, startTime, endTime, hoursWorked}) => {
    return ( 
        <div className='hours-card'>
                <AiFillCloseCircle className='close-icon' data-tip="Delete shift"/>
                <ReactTooltip />
            <h4>{day}</h4>
            <h5>{month} {date}</h5>
            <p className='start-end-times'>{startTime} - {endTime}</p>
            <p className='hours-worked'>{hoursWorked} Hours</p>
        </div>
     );
}
 
export default HoursCard;