import logo from './logo.svg';
import './App.css';
import MainDiv from './modules/mainDiv';
import HomePage from "./modules/homePage";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useHistory,
	useLocation,
	Redirect
  } from "react-router-dom";


  function useQuery() {
	return new URLSearchParams(useLocation().search);
  }
  

function App() {
	let query = useQuery();

	const history = useHistory()

  return (
    <div className="App">
		<Router>
			<Switch>
				<Route exact path="/"><div>home</div></Route>
				
			</Switch>
		</Router>
    </div>
  );
}

function About() {
	return <h3>ABOUT</h3>;
}

export default App;
