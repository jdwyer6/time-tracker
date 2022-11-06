import { useNavigate } from 'react-router-dom';
import AddEmployees from './AddEmployees';
import { useState } from 'react';

const Badge = ({name, showReports, image, admin, position}) => {
    const navigate = useNavigate();

    function logout(){
        localStorage.removeItem('currentUser')
        navigate('/')
        document.location.reload()
    }

    return ( 
    <div style={{borderRadius: '6px', backgroundColor:'white', width: 'clamp(250px, 100%, 400px)'}} className='p-3 p-md-4 my-4 my-md-0 d-flex justify-content-between'>
        <div className='d-flex'>
            <div className='d-md-flex flex-column align-items-start d-none'>
                <img width='100rem' src={image} style={{borderRadius: '6px'}}/>  
            </div>
            <div className='d-flex flex-column px-md-2 px-0 justify-content-between'>
                <div>
                    <h3 className='mb-0'>{name}</h3>
                    <p className="font-small my-0">{position}</p>
                    {admin ? (
                        <p className='font-small font-bold my-0'>Admin account</p>
                    ) : ('')}
                </div>
                <button className='p-0 m-0 text-start btn-tertiary' onClick={showReports}>See my hours</button>
            </div>
        </div>
        <div className='d-flex flex-column text-end justify-content-end align-items-end'>
            <button className='btn-primary' onClick={logout}>Sign out</button>
        </div>
    </div> 
    );
}
 
export default Badge;