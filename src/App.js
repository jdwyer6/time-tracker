import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import './App.css';
import HomePage from './pages/HomePage';
import Navigation from './components/Navbar';
import DemoPage from './pages/DemoPage';
import ClockInPage from './pages/ClockInPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BusinessProfilePage from './pages/BusinessProfilePage';

function App() {
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
			</Routes>
			
  	  	</div>
  	);
}

export default App;
