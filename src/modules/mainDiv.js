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

class MainDiv extends Component {
	
	constructor(props) {
		super(props);
		console.log(props.history.location);
		console.log(props.history.location.pathname);
		//const params = new URLSearchParams(props.history.location.search);
		this.state = {
			currentTab: this.props.history.location.pathname.slice(1),
			gitResponse: null,
			currentPage: 1,
			searchParams: {},
			urlDict: {},
			lastPage: 1,
		};
		
	}

	async componentWillMount() {
		this.unlisten = this.props.history.listen(async (location, action) => {
			this.getQuery();
		});
		//run after construct
		const params = new URLSearchParams(this.props.history.location.search);
		if (params.get("textSearch") !== null) {
			this.getQuery();
		}
	}

	async getQuery() {
		console.log("on route change");
		console.log("componentDidMount");
		//const params = new URLSearchParams(this.props.history.location.pathname);
		const propParam = this.props.history.location.search;
		console.log(propParam);
		if (propParam === undefined || propParam === "") {
			const tabCheck = this.props.history.location.pathname.slice(1);
			if (this.state.currentTab !== tabCheck) {
				this.setState({currentTab: tabCheck});
			}
			return;
		}
		console.log("ahsid");
		const queryRes = await queryMain(propParam, this.state.currentTab);
		console.log(queryRes);
		const params = new URLSearchParams(propParam);

		const totalCount = Math.min(queryRes.resp.total_count, 1000); //can only display first 1000
		const perPage = 30; //30 by default
		const lastPage = Math.ceil(totalCount / perPage);		

		let currentPage = params.get("page") !== null ? params.get("page") : 1;
		if (lastPage < currentPage) {
			currentPage = lastPage;
		}

		console.log("currentPage", currentPage)

		this.setState({
			gitResponse: queryRes.items,
			currentPage, 
			lastPage,
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
			lastPage,
			urlDict
		});
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
		console.log(this.state.currentTab);
		return (
			<div >
				
				<TopHeader></TopHeader>
				<TopTabs history={this.props.history} currentTab={this.state.currentTab} tabChange={(tab) => this.onNewSearch({tab})}></TopTabs>
				<SearchHeader history={this.props.history} tab={this.state.currentTab} searchSaved={(savedOptions) => this.onNewSearch({savedOptions})} newSearch={(url) => this.onNewSearch({url})}></SearchHeader>
				{this.state.gitResponse !== null ? 
				<GitCardList gitInfo={this.state.gitResponse}></GitCardList> : null}
				<PageTrack history={this.props.history} currentPage={this.state.currentPage} lastPage={this.state.lastPage} pageMove={(page) => this.onNewSearch({page})}></PageTrack>
			</div>
		);
	}


}

export default MainDiv;