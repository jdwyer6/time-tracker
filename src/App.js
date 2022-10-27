import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import 'filepond/dist/filepond.min.css';
import './App.css';
import HomePage from './pages/HomePage';
import Navigation from './components/Navbar';
import DemoPage from './pages/DemoPage';
import ClockInPage from './pages/ClockInPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BusinessProfilePage from './pages/BusinessProfilePage';
import EmployeeProfilePage from './pages/EmployeeProfilePage';
import ReportsPage from './pages/ReportsPage';
import LogoutPage from './pages/LogoutPage';
import Axios from 'axios';
import { useSelector } from "react-redux";

function App() {
	// const [currentUser, setCurrentUser] = useState();
	const { user } = useSelector(state => state.user);
	const [ listOfUsers, setListOfUsers ] = useState([]);

	useEffect(()=>{
		if(!user){
			const tempUser = localStorage.getItem('currentUser')
			Axios.get("https://clockedin.herokuapp.com/getUsers")
			.then((response) => {
				setListOfUsers(response.data);
			})
			.catch(error => {
				console.log(error.response)
			})

		}

    }, [])


  	return (
  	  	<div className="App">
			<Navigation />
			<Routes>
				<Route path='/' element={<HomePage />}/>
				<Route path='/demo' element={<DemoPage />}/>
				<Route path='/clockin' element={<ClockInPage />}/>
				<Route path='/login' element={<LoginPage />} />
				<Route path='/register' element={<RegisterPage />} />
				<Route path='/profile' element={<BusinessProfilePage />} />
				<Route path='/employeeProfile' element={<EmployeeProfilePage />} />
				<Route path='/logout' element={<LogoutPage />} />
				<Route path='/reports' element={<ReportsPage />} />
			</Routes>
			
  	  	</div>
  	);
}

export default App;
