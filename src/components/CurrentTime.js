import { useState } from "react";

const CurrentTime = () => {
    let current = new Date();
    const [time, setTime] = useState(current.toLocaleTimeString());
    return ( 
        <>
            <p className='text-white text-start m-0'>{time}</p>
        </> 
    );
}
 
export default CurrentTime;