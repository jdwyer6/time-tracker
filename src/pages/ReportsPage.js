import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import Axios from "axios";
import { MdConstruction } from 'react-icons/md'

const ReportsPage = () => {
    const tempUser = localStorage.getItem('currentUser')
    const user = JSON.parse(tempUser);
    const [isLoading, setLoading] = useState(true);
    const [employees, setEmployees] = useState()
    const getEmployeeData = async () =>{
        try{
            const data = await Axios.get(`https://clockedin.herokuapp.com/user/${user._id}`)
            console.log(data.data.employees);
            setEmployees(data.data.employees)
            setLoading(false);
        } catch(e){
            console.log(e)
        }
    }

    useEffect(()=>{
        getEmployeeData();
    }, []);


    // const columns = [
    //     {dataField: "name", text: "Name"},
    //     {dataField: "work[0].hoursWorked", text: "Total Hours"}
    // ]

    if(isLoading){
        return <h1>Loading...</h1>
    }

    return ( 
    <Container className='my-5 d-flex align-items-center flex-column text-center'>
        <MdConstruction className='w-25 h-25'/>
        <h5>Page currently under construction...</h5>
        {/* <BootstrapTable 
            keyField="employeeId"
            data={employees}
            columns={columns}
        /> */}
    </Container> );
}
 
export default ReportsPage;