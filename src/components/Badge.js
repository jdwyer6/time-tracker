import { useNavigate } from 'react-router-dom';

const Badge = ({name, position, image}) => {
    const navigate = useNavigate();

    function logout(){
        localStorage.removeItem('currentUser')
        navigate('/hometemp')
        document.location.reload()
    }

    return ( 
    <div style={{borderRadius: '6px', backgroundColor:'white'}} className='d-flex p-4'>
        <div className='d-flex flex-column align-items-start'>
            <img width='100rem' src={image} style={{borderRadius: '6px'}}/>
            <button className='mt-2 p-0 btn-tertiary'>See all hours</button>
        </div>
        <div className='d-flex flex-column space-between'>
            <div className='flex-grow-1'>
                <h3 className='mb-0'>{name}</h3>
                <p className="font-small">Software Engineer</p>
            </div>
            <div className='text-end'>
                <button className='btn-primary' onClick={logout}>Sign out</button>
            </div>

           
        </div>
    </div> 
    );
}
 
export default Badge;