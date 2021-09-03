import { Component } from "react";
import TopHeader from "./topHeader";
import db from "./utils/database";
import { getHttpRequest } from "./utils/getGitHttp";
import  loadSaved  from "./utils/loadInSaved";
import RecentSearchSelect from "./recentSearchSelect";
import FooterContact from "./footerContact";
import "./style/mainStyle.css";
import LargeSearchBox from "./searchComponents/largeSearchBox";
import "./style/homePage.css";
import {isMobile} from 'react-device-detect';

class HomePage extends Component {
	
	constructor(props) {
		super(props);
		//const params = new URLSearchParams(props.history.location.search);
		this.state = {
			recentSearchesDict: {
				topic: [], 
				user: [], 
				saved: []
			},
		};
		
	}

	async componentDidMount() { //FIX THIS //componentWillMount
		this.unlisten = this.props.history.listen(async (location, action) => {
			//this.getQuery();
		});
		//run after construct
		const recentSearchesDict = await this.fillRecentSearches();
		this.setState({recentSearchesDict});
	}

	

	componentWillUnmount() {
		this.unlisten();
	}
  
	moveToNewTab(tab) {
		//OBSELETE
		this.setState = {
			currentTab: tab,
			//gitResponse: {},
			currentPage: 1,
			//searchParams: {}
			
		};
	}	

	async onNewSearch(options) {
		let currentPage = this.state.currentPage;
		let tab = this.state.currentTab;
		let urlDict = this.state.urlDict;
		let savedOptions = this.state.savedOptions;
		
		if (options.tab !== undefined && options.tab !== null) {
			currentPage = 1;
			tab = options.tab;		
			//urlDict[tab] = url; //should it work like this?
		}

		if (options.url !== undefined && options.url !== null) {
			currentPage = 1;
			//tab = options.tab;		
			urlDict[tab] = options.url;
		}

		let url = urlDict[tab] !== undefined ? urlDict[tab] : null;

		if (options.page !== undefined && options.page !== null && tab !== "saved") {
			currentPage = options.page;
			url += "&page=" + options.page;
		}

		//url
		//tab
		//page

		if (url === null && tab !== "saved") {
			
			if (tab !== this.state.currentTab) {
				this.setState({currentTab: tab});
			}
			return
		};

		if (tab === "saved" && options.savedOptions !== undefined) {
			savedOptions = options.savedOptions;
		} else if (tab === "saved" && savedOptions === undefined && options.savedOptions === undefined) {
			this.setState({currentTab: "saved"});
			return;
		}


		let response;
		if (tab === "saved" && savedOptions !== undefined) {
			savedOptions.page = currentPage;
			response = await loadSaved(savedOptions);
		} else {
			response = await getHttpRequest(url, tab);
		}
		
		//need to save params
		const totalCount = Math.min(response.resp.total_count, 1000); //can only display first 1000
		const perPage = 30; //30 by default
		const lastPage = Math.ceil(totalCount / perPage);		

		if (lastPage < currentPage) {
			currentPage = lastPage;
		}



		this.setState({
			currentTab: tab,
			gitResponse: response.items,
			currentPage, 
			lastPage,
			urlDict,
		});
	}

	async fillRecentSearches() {

		const promiseArray = [];
		promiseArray.push(db.recentProjectSearches.toArray());
		promiseArray.push(db.recentUserSearches.toArray());
		promiseArray.push(db.recentSavedSearches.toArray());

		const [topic, user, saved] = await Promise.all(promiseArray);

		return {topic, user, saved};
	}

	pageMove() {

	}


	render() {
		//https://reactrouter.com/web/guides/quick-start
		//MUST USE ROUTES HERE
		//<RecentSearchSelect recentSearches={this.state.recentSearches} history={this.props.history} tab={this.state.currentTab} searchSaved={(savedOptions) => this.onNewSearch({savedOptions})}></RecentSearchSelect>
		
		return (
			<div >
				<div id="wrap">
					<div id="mainContent">

						<TopHeader history={this.props.history}></TopHeader>
						<div><h2 className="recentSearchTitle">Home</h2></div>
						<div className="largeBoxContainer">
							<LargeSearchBox tabInput={"topic"} isMainDiv={isMobile} history={this.props.history}></LargeSearchBox>
						</div>
						<div><h2 className="recentSearchTitle">Recent Searches</h2></div>
						<div className="recentSearchContainer">
							<div className="recentSearchesMain">
								<div className="recentSearchBox">
									<div className="recentSectionTitle"><span>Topics</span></div>
									<RecentSearchSelect 
									key="projectRecent"
									recentSearches={this.state.recentSearchesDict["topic"]} 
									history={this.props.history} tab="topic" 
									searchSaved={(savedOptions) => this.onNewSearch({savedOptions})} 
									small={true}></RecentSearchSelect>
								</div>
							</div>

							<div className="recentSearchesMain">
								<div className="recentSearchBox">
									<div className="recentSectionTitle"><span>User</span></div>
									<RecentSearchSelect 
									key="userRecent"
									recentSearches={this.state.recentSearchesDict["user"]} 
									history={this.props.history} tab="user" 
									searchSaved={(savedOptions) => this.onNewSearch({savedOptions})} 
									small={true}></RecentSearchSelect>
								</div>
							</div>

							<div className="recentSearchesMain">
								<div className="recentSearchBox">
									<div className="recentSectionTitle"><span>Saved</span></div>
									<RecentSearchSelect 
									key="savedRecent"
									recentSearches={this.state.recentSearchesDict["saved"]} 
									history={this.props.history} tab="saved" 
									searchSaved={(savedOptions) => this.onNewSearch({savedOptions})} 
									small={true}></RecentSearchSelect>
								</div>
							</div>
						</div>
						
						
						
					</div>

				</div>
				<FooterContact></FooterContact>
			</div>
		);
	}


}

export default HomePage;