import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import 'filepond/dist/filepond.min.css';
import './App.css';
import Home from './pages/Home';
import EmployeeProfile from './pages/EmployeeProfile';
import { useSelector } from "react-redux";
import EmployeeReports from './pages/EmployeeReports';

function App() {
	// const [currentUser, setCurrentUser] = useState();
	const { user } = useSelector(state => state.user);
	const [ listOfUsers, setListOfUsers ] = useState([]);
	const [ loggedIn, setLoggedIn ] = useState();
	const [ loading, setLoading ] = useState(true)
	const [ currentElement, setCurrentElement ] = useState();

	useEffect(() => {
	  
		setLoggedIn(localStorage.getItem('loggedIn'))
		setLoading(false)
	
	}, [])
	
	if(loading){
		console.log('loading', 'logged in: ', loggedIn)
		return <p>Loading...</p>
	}


  	return (
  	  	<div className="App">
			
			<Routes>
				<Route path='/' element={<Home />}/>
				<Route exact path='/employeeprofile' element={<EmployeeProfile />} />
				<Route exact path='/employee-reports' element={<EmployeeReports />} />
			</Routes>
			
  	  	</div>
  	);
}

export default App;
