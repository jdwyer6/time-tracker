import { useNavigate } from 'react-router-dom';
import AddEmployees from './AddEmployees';
import { useState } from 'react';

const Badge = ({name, position, image, admin}) => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function logout(){
        localStorage.removeItem('currentUser')
        navigate('/')
        document.location.reload()
    }

    return ( 
    <div style={{borderRadius: '6px', backgroundColor:'white'}} className='d-flex p-4'>
        <div className='d-flex flex-column align-items-start'>
            <img width='100rem' src={image} style={{borderRadius: '6px'}}/>
            <button className='mt-2 p-0 btn-tertiary' onClick={()=>navigate('/reports')}>See all hours</button>
        </div>
        <div className='d-flex flex-column space-between'>
            <div className='flex-grow-1'>
                <h3 className='mb-0'>{name}</h3>
                <p className="font-small my-0">Software Engineer</p>
                {admin ? (
                <button className='my-0 p-0 btn-tertiary' onClick={handleShow}>Add employees</button>
            ) : ('')}
            </div>
            <div className='text-end'>
                <button className='btn-primary' onClick={logout}>Sign out</button>
            </div>

           
        </div>
        <AddEmployees show={show} handleClose={handleClose} handleShow={handleShow} setShow={setShow}/>
    </div> 
    );
}
 
export default Badge;