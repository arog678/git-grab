import { Component } from "react";
import "./style/cardBasic.css";
import db from "./utils/database";
import pushSearchData from "./utils/savingUtil";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { v4 as uuidv4 } from 'uuid'; //may be a bit heavy


class RecentSearchSelect extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			recentSearches: [],
			currentTab: this.props.tab
		};
		//this.fillRecentSearches();
	}

	async afte() {
		//this.fillRecentSearches();

	}

	async componentDidMount() {
		this.unlisten = this.props.history.listen(async (location, action) => {
		});
		//run after construct
		this.fillRecentSearches();
	}

	componentWillUnmount() {
		//console.log("UNMOUNT");
	}

	async fillRecentSearches() {
		const dbRef = {
			"topic": "recentProjectSearches",
			"user": "recentUserSearches",
			"saved": "recentSavedSearches",
		}
		const table = dbRef[this.props.tab]
		const recentSearches = await db[table].toArray();
		this.setState({
			recentSearches
		}, () => {
			//console.log("UPDAtE STATE");
		});
	}

	searchText(item) {
		const dbRef = {
			"topic": "recentProjectSearches",
			"user": "recentUserSearches",
			"saved": "recentSavedSearches",
		};

		const dbName = dbRef[this.props.tab];
			const newPath = "/" + this.props.tab + "?textSearch=" + item.textSearch;
			pushSearchData(item.textSearch, item.otherInfo, dbName);
			this.props.history.push(newPath);
	}

	getRecentSearchesList() {
		const searchCards = [];
		const className = this.props.small ? "basicCardDetail smallCard" : "basicCardDetail"
		let indexCount = 0;
		for (const item of this.props.recentSearches) {
			//uuidv4(); too heavy
			const keyName = "recentSearch" + this.state.tab + indexCount;
			searchCards.push(<div key={keyName} onClick={() => this.searchText(item)} className={className}>

				<span className="textSearchSpan">
					
					{item.textSearch}
				</span>
			</div>);
			indexCount ++;
		}
		return <div>{
			
			searchCards
		}</div>;
	}




	render() {
		const recent = this.props.recentSearches;
		const recentValid = recent.length !== undefined && recent.length !== 0;
		const recentSearchesList = this.getRecentSearchesList();
		return (
			<div>
				{recentValid ? 
				<div>
					<div className="gap"></div>
					{recentSearchesList}
				</div> :
				<div>
					<span> No Recent Searches</span>
				</div>
				}
				
			</div>
		)
	}

}

export default RecentSearchSelect;