import { AiFillCloseCircle } from 'react-icons/ai';
import ReactTooltip from 'react-tooltip';
import Axios from 'axios';

const HoursCard = ({day, month, date, startTime, endTime, hoursWorked, employee}) => {


    const tempUser = localStorage.getItem('currentUser')
    const user = JSON.parse(tempUser);

    const deleteCard = () => {
        console.log('delete card')
        Axios.delete(`https://clockedin.herokuapp.com/${user._id}/${employee.employeeId}`)
        .then((response) => {
            document.location.reload()
        })
        .catch(error => {
            console.log(error.response)
            alert('There was an issue deleting your hours. Please contact your admin for more information.')
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