import { Component } from "react";
import GitCardList from "./gitCardList";
import PageTrack from "./pageTrack";
import SearchHeader from "./searchHeader";
import TopHeader from "./topHeader";
import TopTabs from "./topTabs";
import db from "./utils/database";
import { getHttpRequest } from "./utils/getGitHttp";
import  loadSaved  from "./utils/loadInSaved";
import { queryMain } from "./utils/handleQuery";
import RecentSearchSelect from "./recentSearchSelect";
import FooterContact from "./footerContact";
import "./style/mainStyle.css";
import LargeSearchBox from "./searchComponents/largeSearchBox";
import "./style/homePage.css";

class HomePage extends Component {
	
	constructor(props) {
		super(props);
		//const params = new URLSearchParams(props.history.location.search);
		this.state = {
			recentSearchesDict: {
				project: [], 
				user: [], 
				saved: []
			},
		};
		
	}

	async componentWillMount() {
		this.unlisten = this.props.history.listen(async (location, action) => {
			//console.log("MOVE");
			//this.getQuery();
		});
		//run after construct
		const params = new URLSearchParams(this.props.history.location.search);
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
		console.log(options);
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

		console.log(options);
		if (options.page !== undefined && options.page !== null && tab !== "saved") {
			currentPage = options.page;
			//tab = options.tab;		
			url += "&page=" + options.page;
		}

		//url
		//tab
		//page

		if (url === null && tab !== "saved") {
			
			if (tab !== this.state.currentTab) {
				this.setState({currentTab: tab});
			}
			console.log("FAILED");
			return
		};

		if (tab === "saved" && options.savedOptions !== undefined) {
			savedOptions = options.savedOptions;
			console.log(savedOptions);
		} else if (tab === "saved" && savedOptions === undefined && options.savedOptions === undefined) {
			this.setState({currentTab: "saved"});
			return;
		}
		console.log("HERE");


		let response;
		if (tab === "saved" && savedOptions !== undefined) {
			savedOptions.page = currentPage;
			response = await loadSaved(savedOptions);
		} else {
			response = await getHttpRequest(url, tab);
		}
		
		//const response = await getHttpRequest(url, tab);
		console.log(response);
		//const searchParams = this.state.searchParams;
		//searchParams[this.state.currentTab] = params
		//need to save params
		const totalCount = Math.min(response.resp.total_count, 1000); //can only display first 1000
		const perPage = 30; //30 by default
		console.log(response);
		const lastPage = Math.ceil(totalCount / perPage);		

		if (lastPage < currentPage) {
			currentPage = lastPage;
		}
		console.log(currentPage);



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

		const [project, user, saved] = await Promise.all(promiseArray);
		console.log(project, user, saved);

		return {project, user, saved};
	}

	pageMove() {

	}

	testLoad() {
		console.log(this.props);
		const params = new URLSearchParams(this.props.location.search);
		const tab = params.get('tab');
		console.log(tab);

		loadSaved({users: true, projects: true, textSearch: "tetris"});
		loadSaved({users: true, projects: true, textSearch: "tetris"});
	}

	render() {
		//https://reactrouter.com/web/guides/quick-start
		//MUST USE ROUTES HERE
		//<RecentSearchSelect recentSearches={this.state.recentSearches} history={this.props.history} tab={this.state.currentTab} searchSaved={(savedOptions) => this.onNewSearch({savedOptions})}></RecentSearchSelect>
		console.log(this.state.currentTab);
		return (
			<div >
				<div id="wrap">
					<div id="mainContent">

						<TopHeader history={this.props.history}></TopHeader>
						<div>
							<LargeSearchBox history={this.props.history}></LargeSearchBox>
						</div>
						<div><h2 className="recentSearchTitle">Recent Searches</h2></div>
						<div className="recentSearchContainer">
							<div className="recentSearchesMain">
								<div className="recentSearchBox">
									<div className="recentSectionTitle"><span>Topics</span></div>
									<RecentSearchSelect 
									recentSearches={this.state.recentSearchesDict["project"]} 
									history={this.props.history} tab="project" 
									searchSaved={(savedOptions) => this.onNewSearch({savedOptions})} 
									small={true}></RecentSearchSelect>
								</div>
							</div>

							<div className="recentSearchesMain">
								<div className="recentSearchBox">
									<div className="recentSectionTitle"><span>User</span></div>
									<RecentSearchSelect 
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