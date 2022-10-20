import { AiFillCloseCircle } from 'react-icons/ai';
import ReactTooltip from 'react-tooltip';
import Axios from 'axios';

const HoursCard = ({day, month, date, startTime, endTime, hoursWorked, employee}) => {


    const tempUser = localStorage.getItem('currentUser')
    const user = JSON.parse(tempUser);

    const deleteCard = () => {
        console.log('delete card')
        Axios.delete(`http://localhost:3001/${user._id}/${employee.employeeId}`)
        .then((response) => {
            document.location.reload()
        })
    }

    return ( 
        <div className='hours-card'>
                <AiFillCloseCircle className='close-icon' data-tip="Delete shift" onClick={deleteCard}/>
                <ReactTooltip />
            <h4>{day}</h4>
            <h5>{month} {date}</h5>
            <p className='start-end-times'>{startTime} - {endTime}</p>
            <p className='hours-worked'>{hoursWorked} Hours</p>
        </div>
     );
}
 
export default HoursCard;