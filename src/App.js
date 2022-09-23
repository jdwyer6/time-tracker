import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import HomePage from './pages/HomePage';
import Navigation from './components/Navbar';

function App() {
  	return (
  	  	<div className="App">
			<Navigation />
			<HomePage />
  	  	</div>
  	);
}

export default App;
