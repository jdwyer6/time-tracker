const HoursCardTemp = ({day, month, date, start, end, total}) => {
    return ( 
        <div className='bg-white p-4 my-2' style={{borderRadius: '6px', width: '75%'}}>
            <h3>{day} {month} {date}</h3>
            <p className='mb-0'>{start} - {end}</p>
            <p className='mb-0'>{total} Hours</p>
            <button className='btn-tertiary'>Request adjustment</button>
        </div>
     );
}
 
export default HoursCardTemp;