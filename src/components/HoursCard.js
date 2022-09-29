const HoursCard = ({day, month, date, startTime, endTime, hoursWorked}) => {
    return ( 
        <div className='hours-card'>
            <h4>{day}</h4>
            <h5>{month} {date}</h5>
            <p className='start-end-times'>{startTime} - {endTime}</p>
            <p className='hours-worked'>{hoursWorked} Hours</p>
        </div>
     );
}
 
export default HoursCard;