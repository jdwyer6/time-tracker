const HoursCard = ({day, month, date, startTime, endTime, hoursWorked}) => {
    return ( 
        <>
            <h4>{day}</h4>
            <p>{month} {date}</p>
            <p>{startTime} - {endTime}</p>
            <p>{hoursWorked}</p>
        </>
     );
}
 
export default HoursCard;