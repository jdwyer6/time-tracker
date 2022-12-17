import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';
import { getUnixTime } from 'date-fns'
import { useEffect } from 'react';

const EditHoursModal = ({setShow, show, start, end, date, user, jobId}) => {
  const entry = user.hours.filter(entry => entry.jobId === jobId)[0]
  const handleShow = () => setShow(true);
  const [dataToUpdate, setDataToUpdate] = useState({
    start: null,
    startUnix: null,
    end: null,
    endUnix: null
  });

  const handleClose = () => {setShow(false)}

  const handleSave = () => {
    axios.put(`https://clockedin.herokuapp.com/user/${user._id}/${jobId}`, {data: dataToUpdate})
    .then((res)=>{
      if(res.status === 200){
        document.location.reload();
      }
    })
    .catch((error)=>{
        console.log(error)
    })
    setShow(false);
  }

  useEffect(()=>{
    if(dataToUpdate.start){
      const month = entry.month
      const entryDate = entry.date
      const year = entry.fullStartDate.slice(0, 4)
      const hour = dataToUpdate.start.slice(0, 2)
      const minute = dataToUpdate.start.slice(3, 5)
      const unixTime = getUnixTime(new Date(year, month, entryDate, hour, minute))
      setDataToUpdate({...dataToUpdate, startUnix: unixTime})
    }

    if(dataToUpdate.end){
      const month = entry.month
      const entryDate = entry.date
      const year = entry.fullStartDate.slice(0, 4)
      const hour = dataToUpdate.end.slice(0, 2)
      const minute = dataToUpdate.end.slice(3, 5)
      const unixTime = getUnixTime(new Date(year, month, entryDate, hour, minute))
      setDataToUpdate({...dataToUpdate, endUnix: unixTime})
    }

  }, [dataToUpdate.start, dataToUpdate.end])

    return ( 
        <>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title><h2>Edit shift</h2></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
                <Form.Group className="mb-3 border-top">
                    <Form.Label className='mt-3'><p className='mb-0'>Posted start time: {start}</p></Form.Label>
                    <h4>Change start time to:</h4>
                    <Form.Control
                        type='time'
                        placeholder={start}
                        onChange={(e)=>setDataToUpdate({...dataToUpdate, start: e.target.value})}
                    />
                </Form.Group>
                <Form.Group className='border-top mt-3'>
                    <Form.Label className='mt-3'><p className='mb-0'>Posted end time: {end}</p></Form.Label>
                    <h4>Change end time to:</h4>
                    <Form.Control
                        type='time'
                        placeholder={end}
                        onChange={(e)=>setDataToUpdate({...dataToUpdate, end: e.target.value})}
                        //TODO: UNIX TIME IS TAKING CURRENT TIME AND NOT ENTERED TIME
                    />
                </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            {/* TODO Change save changes function so it is not handle close. Handle Close saves everything  */}
            <button className='btn-3' onClick={handleClose}>
              Cancel
            </button>
            <button className='btn-2' onClick={handleSave}>
              Save Changes
            </button>
          </Modal.Footer>
        </Modal>
      </>
     );
}
 
export default EditHoursModal;