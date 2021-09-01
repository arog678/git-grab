import React, { Component } from "react";
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
import {isMobile} from 'react-device-detect';


//for resizing
//https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs

class MainDiv extends Component {
	
	constructor(props) {
		super(props);
		console.log(props.history.location);
		console.log(props.history.location.pathname);
		let currentTab = this.props.history.location.pathname.slice(1);
		if (currentTab === "topic") currentTab = "project";
		//const params = new URLSearchParams(props.history.location.search);
		this.state = {
			currentTab,
			gitResponse: null,
			currentPage: 1,
			searchParams: {},
			urlDict: {},
			lastPage: 1,
			totalCount: 0,
			recentSearches: [],
			currentTextSearch: "",
			loading: true,
			prevUrl: ""
			//tabData: {},
		};

		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
		
	}

	async componentDidMount() { //FIX THIS //componentWillMount
		this.updateWindowDimensions();
		window.addEventListener('resize', this.updateWindowDimensions);


		this.unlisten = this.props.history.listen(async (location, action) => {
			if (location.pathname === "/") return;
			console.log("MOVE");
			this.getQuery();
		});
		//run after construct
		const params = new URLSearchParams(this.props.history.location.search);
		if (params.get("textSearch") !== null) {
			this.getQuery();
		} else if (params.get("textSearch") === null && this.state.currentTab === "saved") { 
			this.getQuery();
		} else {
			const recentSearches = await this.fillRecentSearches();
			this.setState({recentSearches, currentTextSearch: ""});
		}
	}


	componentWillUnmount() {
		window.removeEventListener('resize', this.updateWindowDimensions);
	}

	updateWindowDimensions() {
		console.log("DIM");
		this.setState({ width: parseInt(window.innerWidth), height: parseInt(window.innerHeight) });
	}

	async getQuery() {
		this.setState({loading: true}); 
		console.log("on route change");
		console.log("componentDidMount");
		//const params = new URLSearchParams(this.props.history.location.pathname);
		let propParam = this.props.history.location.search;
		console.log(propParam);
		let tabCheck = this.props.history.location.pathname.slice(1);
		if (tabCheck === "topic") tabCheck = "project"; //topic name fix
		if ((propParam === undefined || propParam === "") && (tabCheck !== "saved")) {
			if (this.state.currentTab !== tabCheck) {
				//const tabData = this.state.tabData;
				//tabData[this.state.currentTab] = this.
				console.log("TAB CHECK");
				const recentSearches = await this.fillRecentSearches(tabCheck);
				this.setState({loading: false, currentTab: tabCheck, gitResponse: null, recentSearches});
			}
			return;
		} else if ((propParam === undefined || propParam === "") && (tabCheck === "saved")) {
			propParam = "?textSearch=";
			this.setState({currentTab: tabCheck});
		}
		console.log("ahsid");
		console.log(this.state.currentTab);
		
		const queryRes = await queryMain(propParam, tabCheck === "saved" ? "saved" : this.state.currentTab);
		console.log(queryRes);
		const params = new URLSearchParams(propParam);

		const totalCount = Math.min(queryRes.resp.total_count, 1000); //can only display first 1000
		const perPage = this.state.currentTab === "project" ? 100 : 30; //100 per topic page, 25 displayed //30 by default 
		const lastPage = Math.ceil(totalCount / perPage);		

		let currentPage = params.get("page") !== null ? params.get("page") : 1;
		if (queryRes.pageNum !== undefined) {
			currentPage = queryRes.pageNum;
		} else if (lastPage < currentPage) {
			currentPage = lastPage;
		}

		console.log("currentPage", currentPage)

		const currentTextSearch = params.get("textSearch");

		this.setState({
			gitResponse: queryRes.items,
			totalCount: queryRes.resp.total_count,
			currentPage, 
			loading: false,
			lastPage,
			currentTextSearch,
		});
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
			totalCount,
			lastPage,
			loading: false, 
			urlDict,
		});
	}

	async fillRecentSearches(tab = this.state.currentTab) {
		const dbRef = {
			"project": "recentProjectSearches",
			"user": "recentUserSearches",
			"saved": "recentSavedSearches",
		}
		const table = dbRef[tab]
		const recentSearches = await db[table].toArray();
		return recentSearches;
	}

	pageMove() {

	}

	toastTest() {
		console.log(this.toastContainer);
		this.toastContainer.success(`hi! Now is `, `///title\\\\\\`, {
			closeButton: true,
		  });
	}

	testLoad() {
		console.log(this.props);
		const params = new URLSearchParams(this.props.location.search);
		const tab = params.get('tab');
		console.log(tab);

		loadSaved({users: true, projects: true, textSearch: "tetris"});
		loadSaved({users: true, projects: true, textSearch: "tetris"});
	}

	//newTabChange() {
	//	const hist = this.props.history
	//	if (hist.pathname === "/saved") {
	//		this.props.history.push(this.state.lastUrl);
	//	} else {
	//		const lastUrl = hist.pathname + hist.search;
	//		this.setState({lastUrl});
	//	}
	//	
	//}

	getMainSearchContent() {
		
		if (this.state.loading) return (<div>Requesting Data</div>);
		else if (this.state.gitResponse !== null) {
			return (<div>
				<GitCardList gitInfo={this.state.gitResponse}></GitCardList>
				<PageTrack history={this.props.history} currentPage={this.state.currentPage} lastPage={this.state.lastPage} pageMove={(page) => this.onNewSearch({page})}></PageTrack>
			</div>);

		} else {
			return (<div>
			<div><h2 className="recentSearchTitle">Recent Searches</h2></div>
				<RecentSearchSelect key="recentSearchBox" recentSearches={this.state.recentSearches} history={this.props.history} tab={this.state.currentTab} searchSaved={(savedOptions) => this.onNewSearch({savedOptions})}></RecentSearchSelect>
			</div>);
		}
	}

	render() {
		//https://reactrouter.com/web/guides/quick-start
		//MUST USE ROUTES HERE
		console.log(this.state.currentTab);
		

		const mainSearchContent = this.getMainSearchContent();
		return (
			<div >
				<div id="wrap">
					<div id="mainContent">

						<TopHeader history={this.props.history}></TopHeader>
						{!isMobile ? 
							<div class="largeBoxHolder">
								<LargeSearchBox isMainDiv={true} history={this.props.history}></LargeSearchBox>
							</div> :
							<SearchHeader textSearch={this.state.currentTextSearch} 
							history={this.props.history} tab={this.state.currentTab} 
							searchSaved={(savedOptions) => this.onNewSearch({savedOptions})} 
							newSearch={(url) => this.onNewSearch({url})}></SearchHeader>

						}
							
						<TopTabs totalResults={this.state.totalCount} history={this.props.history} currentTab={this.state.currentTab} tabChange={(tab) => this.onNewSearch({tab})}></TopTabs>
						{mainSearchContent}
					</div>

				</div>
				<FooterContact></FooterContact>
			</div>
		);
	}


}

export default MainDiv;