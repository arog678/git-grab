import "./App.css";
import MainDiv from "./modules/mainDiv";
import HomePage from "./modules/homePage";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faCheckSquare, faHome, faSave, faQuestionCircle, faSearch, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

import {
	Switch,
	Route,
	useHistory,
	useLocation,
	HashRouter,
	Redirect
  } from "react-router-dom";

  library.add(fab, faCheckSquare, faHome, faSave, faQuestionCircle, faSearch, faChevronDown, faChevronUp);


  function useQuery() {
	return new URLSearchParams(useLocation().search);
  }
  

function App() {
	let query = useQuery();

	const history = useHistory()

  return (
    <div className="App">
		<HashRouter >
			<Switch>
			<Route exact path="/"><Redirect to="/home" /></Route>
				<Route path="/home" history={history} component={HomePage}></Route>
				<Route path="/topic" history={history} tab="topic" component={MainDiv}/>
				<Route path="/user" history={history} tab="user" component={MainDiv}/>
				<Route path="/saved" history={history} tab="saved" component={MainDiv}/>
				<Route path="/about" tab={query.get("tab")}>
					<About/>
				</Route>
			</Switch>
		</HashRouter >
    </div>
  );
}

function About() {
	return <h3>ABOUT</h3>;
}

export default App;
