import React, { Component } from "react";
import GitCardList from "./gitCardList";
import PageTrack from "./pageTrack";
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
import pushSearchData from "./utils/savingUtil";

//for resizing
//https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs

class MainDiv extends Component {
	
	constructor(props) {
		super(props);
		let currentTab = this.props.history.location.pathname.slice(1);
		if (currentTab === "topic") currentTab = "topic";
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
		};
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
	}

	async componentDidMount() { //FIX THIS //componentWillMount
		this.updateWindowDimensions();
		window.addEventListener('resize', this.updateWindowDimensions);


		this.unlisten = this.props.history.listen(async (location, action) => {
			if (location.pathname === "/") return;
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
		this.unlisten();
		window.removeEventListener('resize', this.updateWindowDimensions);
	}

	updateWindowDimensions() {
		this.setState({ width: parseInt(window.innerWidth), height: parseInt(window.innerHeight) });
	}

	async getQuery() {
		this.setState({loading: true}); 
		let propParam = this.props.history.location.search;
		let tabCheck = this.props.history.location.pathname.slice(1);
		if (tabCheck === "topic") tabCheck = "topic"; //topic name fix
		if ((propParam === undefined || propParam === "") && (tabCheck !== "saved")) {
			if (this.state.currentTab !== tabCheck) {
				const recentSearches = await this.fillRecentSearches(tabCheck);
				this.setState({loading: false, currentTab: tabCheck, gitResponse: null, recentSearches});
			}
			return;
		} else if ((propParam === undefined || propParam === "") && (tabCheck === "saved")) {
			propParam = "?";
			await this.setState({currentTab: tabCheck});
		}
		//const queryRes = await queryMain(propParam, tabCheck === "saved" ? "saved" : this.state.currentTab);
		const queryRes = await queryMain(propParam, tabCheck);
		const params = new URLSearchParams(propParam);

		const totalCount = Math.min(queryRes.resp.total_count, 1000); //can only display first 1000
		const perPage = this.state.currentTab === "topic" ? 100 : 30; //100 per topic page, 25 displayed //30 by default 
		const lastPage = Math.ceil(totalCount / perPage);		

		let currentPage = params.get("page") !== null ? params.get("page") : 1;
		if (queryRes.pageNum !== undefined) {
			currentPage = queryRes.pageNum;
		} else if (lastPage < currentPage) {
			currentPage = lastPage;
		}
		//console.log(tabCheck);


		const currentTextSearch = params.get("textSearch");

		this.setState({
			gitResponse: queryRes.items,
			totalCount: queryRes.resp.total_count,
			currentTab: tabCheck,
			currentPage, 
			loading: false,
			lastPage,
			currentTextSearch,
		});
	}  

	async onNewSearch(options) {
		let currentPage = this.state.currentPage;
		let tab = this.state.currentTab;
		let urlDict = this.state.urlDict;
		let savedOptions = this.state.savedOptions;
		
		if (options.tab !== undefined && options.tab !== null) {
			currentPage = 1;
			tab = options.tab;		
		}

		if (options.url !== undefined && options.url !== null) {
			currentPage = 1;
			urlDict[tab] = options.url;
		}

		let url = urlDict[tab] !== undefined ? urlDict[tab] : null;

		if (options.page !== undefined && options.page !== null && tab !== "saved") {
			currentPage = options.page;
			url += "&page=" + options.page;
		}

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
			totalCount,
			lastPage,
			loading: false, 
			urlDict,
		});
	}

	async fillRecentSearches(tab = this.state.currentTab) {
		const dbRef = {
			"topic": "recentProjectSearches",
			"user": "recentUserSearches",
			"saved": "recentSavedSearches",
		}
		const table = dbRef[tab]
		const recentSearches = await db[table].toArray();
		return recentSearches;
	}


	getMainSearchContent() {
		
		if (this.state.loading) return (<div>Requesting Data</div>);
		else if (this.state.gitResponse !== null) {
			return (<div>
				<GitCardList gitInfo={this.state.gitResponse}></GitCardList>
				<PageTrack history={this.props.history} currentPage={this.state.currentPage} lastPage={this.state.lastPage}></PageTrack>
			</div>);

		} else {
			return (<div>
			<div><h2 className="recentSearchTitle">Recent Searches</h2></div>
				<RecentSearchSelect key="recentSearchBox" recentSearches={this.state.recentSearches} history={this.props.history} tab={this.state.currentTab}></RecentSearchSelect>
			</div>);
		}
	}

	searchGit() {
		//this.props.searchRequest(this.generateRequest());
		const requestParams = this.getSearchURL();
		const tabDict = {
			"topic": "recentProjectSearches",
			"user": "recentUserSearches",
			"saved": "recentSavedSearches"
		};
		if (requestParams !== "?") {
			//const currentPath = this.props.history.location.pathname;
			const newPath = this.state.tab + requestParams;
			pushSearchData(this.searchTextRef.current.getTextInput(), requestParams, tabDict[this.state.tab]);
			this.props.history.push(newPath);
		}
	}


	render() {
		//https://reactrouter.com/web/guides/quick-start
		//MUST USE ROUTES HERE
		

		const mainSearchContent = this.getMainSearchContent();
		//console.log("asd");
		return (
			<div >
				<div id="wrap">
					<div id="mainContent">
						<TopHeader history={this.props.history}></TopHeader>
						{!isMobile ? 
							<div className="largeBoxHolder">
								<LargeSearchBox isMobile={isMobile} defaultAdv={true} tabInput={this.state.currentTab} isMainDiv={true} history={this.props.history}></LargeSearchBox>
							</div> :

							<LargeSearchBox isMobile={isMobile} defaultAdv={true} tabInput={this.state.currentTab} isMainDiv={true} history={this.props.history}></LargeSearchBox>
						}
							
						<TopTabs totalResults={this.state.totalCount} history={this.props.history} currentTab={this.state.currentTab}></TopTabs>
						{mainSearchContent}
					</div>

				</div>
				<FooterContact></FooterContact>
			</div>
		);
	}


}

export default MainDiv;