const HoursCard = ({day, month, date, start, end, total}) => {
    return ( 
        <div className='bg-white p-4' style={{borderRadius: '6px', width: 'clamp(250px, 100%, 500px)'}}>
            <h3 className='my-0'>{day} {month} {date}</h3>
            <p className='mb-0'>{start} - {end}</p>
            <p className='mb-0 font-small'>{total} Hours</p>
            <button className='btn-tertiary'>Request adjustment</button>
        </div>
     );
}
 
export default HoursCard;