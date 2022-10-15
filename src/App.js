import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import Navigation from './components/Navbar';
import DemoPage from './pages/DemoPage';
import ClockInPage from './pages/ClockInPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BusinessProfilePage from './pages/BusinessProfilePage';
import Axios from 'axios';

function App() {
	const [currentUser, setCurrentUser] = useState();
	const [ listOfUsers, setListOfUsers ] = useState([]);
    const tempUser = localStorage.getItem('currentUser')

	useEffect(()=>{
        Axios.get("http://localhost:3001/getUsers")
        .then((response) => {
            setListOfUsers(response.data);
        })
		setCurrentUser(tempUser)
    }, [])


  	return (
  	  	<div className="App">
			<Navigation currentUser={currentUser} listOfUsers={listOfUsers}/>
			<Routes>
				<Route path='/' element={<HomePage />}/>
				<Route path='/demo' element={<DemoPage />}/>
				<Route path='/clockin' element={<ClockInPage />}/>
				<Route path='/login' element={<LoginPage currentUser={currentUser} setCurrentUser={setCurrentUser} listOfUsers={listOfUsers}/>} />
				<Route path='/register' element={<RegisterPage />} />
				<Route path='/profile' element={<BusinessProfilePage currentUser={currentUser} listOfUsers={listOfUsers} setCurrentUser={setCurrentUser}/>} />
			</Routes>
			
  	  	</div>
  	);
}

export default App;
