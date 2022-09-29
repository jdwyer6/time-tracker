const HoursCard = ({day, month, date, start, end, hoursWorked}) => {
    return ( 
        <>
            <h4>{day}</h4>
            <p>{month} {date}</p>
            {/* <p>{start} - {end}</p> */}
            <p>{hoursWorked}</p>
        </>
     );
}
 
export default HoursCard;