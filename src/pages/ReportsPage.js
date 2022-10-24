import { Container } from "react-bootstrap";

const ReportsPage = () => {
    const tempUser = localStorage.getItem('currentUser')
    const user = JSON.parse(tempUser);
    return ( 
    <Container className='my-5'>
        <table className="table">
        <thead>
            <tr>
                <th scope="col">Employee Name</th>
                <th scope="col">Total Hours</th>
            </tr>
        </thead>
            <tbody>
                {user.employees.map((employee) => {
                    <>
              
                    {/* <p>{employee.name}</p>
                    {console.log(employee)}
                            <th scope="row">{employee.name}</th>
                            
                            <td>{employee.employeeId}</td>
                            <td>{employee}</td>
                            <td>@mdo</td> */}
   
                    </>


                })}

                <tr>
                <th scope="row">2</th>
                <td>{user.employees[0].name}</td>
                <td>Thornton</td>
                <td>@fat</td>
                </tr>
                <tr>
                <th scope="row">3</th>
                <td colSpan="2">Larry the Bird</td>
                <td>@twitter</td>
                </tr>
            </tbody>
        </table>
    </Container> );
}
 
export default ReportsPage;