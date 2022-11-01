import { AiFillCloseCircle } from 'react-icons/ai';
import ReactTooltip from 'react-tooltip';
import Axios from 'axios';
import { useEffect, useState } from 'react';

const HoursCard = ({day, month, date, startTime, endTime, hoursWorked, employee}) => {


    const tempUser = localStorage.getItem('currentUser')
    const user = JSON.parse(tempUser);
    const secondsWorked = (hoursWorked * 3600);
    const minutesWorked = (hoursWorked * 60);
    

    const deleteCard = (e) => {
        if(user.username === 'demo'){
            console.log(e.target.parentElement)
            employee.work.splice(0, 1);
        }else{
            Axios.delete(`https://clockedin.herokuapp.com/${user._id}/${employee.employeeId}`)
            .then((response) => {
                document.location.reload()
            })
            .catch(error => {
                console.log(error.response)
                alert('There was an issue deleting your hours. Please contact your admin for more information.')
            })
        }

    }



    return ( 
        <div className='hours-card'>
                <AiFillCloseCircle className='close-icon' data-tip="Delete shift" onClick={deleteCard}/>
                <ReactTooltip />
            <h4>{day}</h4>
            <h5>{month} {date}</h5>
            <p className='start-end-times'>{startTime} - {endTime}</p>
            <div className='hours-worked'>
                {hoursWorked < 1 ? (<p>{minutesWorked.toFixed(0)} minutes <br></br> {secondsWorked.toFixed(0)} seconds</p>) : (<p>{hoursWorked.toFixed(2)} hours</p>)}
                
            </div>
        </div>
     );
}
 
export default HoursCard;