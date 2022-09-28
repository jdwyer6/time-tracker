import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Link } from "react-router-dom";
import './App.css';
import HomePage from './pages/HomePage';
import Navigation from './components/Navbar';
import DemoPage from './pages/DemoPage_Home';

function App() {
  	return (
  	  	<div className="App">
			<Navigation />
			<Routes>
				<Route path='/' element={<HomePage />}/>
				<Route path='demo' element={<DemoPage />}/>
			</Routes>
			
  	  	</div>
  	);
}

export default App;
