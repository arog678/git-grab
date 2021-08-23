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
				<Route exact path="/"><Redirect to="/home" /></Route>
				<Route path="/home" history={history} component={HomePage}></Route>
				<Route path="/project" history={history} tab="projects" component={MainDiv}/>
				<Route path="/user" history={history} tab="user" component={MainDiv}/>
				<Route path="/saved" history={history} tab="saved" component={MainDiv}/>
				<Route path="/about" tab={query.get("tab")}>
					<About/>
				</Route>
			</Switch>
		</Router>
    </div>
  );
}

function About() {
	return <h3>ABOUT</h3>;
}

export default App;
