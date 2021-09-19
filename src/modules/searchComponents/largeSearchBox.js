import React, { Component } from "react";
import SearchCheckBox from "./searchCheckBox";
import SearchSortButton from "./searchSortButton";
import SearchTextInput from "./searchTextInput";
import "../style/searchStyle.css";
import pushSearchData from "../utils/savingUtil";
import SearchTextTabInput from "./searchTextTabInput";
import "../style/largeSearchBox.css";

class LargeSearchBox extends Component {
	
	constructor(props) {
		super(props);
		const defaultAdv = this.props.defaultAdv;
		//if (defaultAdv !== undefined && defaultAdv !== null) 
		this.state = {
			tab: this.props.tabInput,
			advanced: (defaultAdv !== undefined && defaultAdv !== null) ? defaultAdv : false
		};

		const params = new URLSearchParams(props.history.location.search);

		this.textSearch = params.get("textSearch");
		this.repositorsSort = params.get("repositorsSort");
		this.followerSort = params.get("followerSort");
		this.joinedSort = params.get("joinedSort");

		this.featured = params.get("featured");
		this.nameSort = params.get("nameSort");
		this.createdAtSort = params.get("createdAtSort");

		this.dateSaved = params.get("dateSaved");
		this.project = params.get("topic");
		this.user = params.get("user");



		//1.does not seem like enough feature to warrant advanced
		//2.The users will be git user, they will know what these are
		this.searchTextRef = React.createRef();

		this.featuredCheck = React.createRef();
		this.nameOrder = React.createRef();
		this.createdAtOrder = React.createRef();

		this.repositorsOrder = React.createRef();
		this.followerOrder = React.createRef();
		this.joinedOrder = React.createRef();

		this.dateSavedRef = React.createRef();
		this.projectCheck = React.createRef();
		this.userCheck = React.createRef();

		this.titleDict = {
			featuredCheck: {main: "Only Featured", home: "Show only featured topics"},
			nameSort: {main: "Name Order", home: "Order by name of topics"},
			dateSort: {main: "Date Created Order", home: "Order by date of topics creation"},

			followerSort: {main: "Follower Sort", home: "Order by total users followers"},
			repoSort: {main: "Repo Sort", home: "Order by total user Repositors"},
			joinSort: {main: "Date Joined", home: "Order by date Joined"},

			projectCheck: {main: "Show Topics", home: "Show saved topics?"},
			userCheck: {main: "Show Users", home: "Show saved users?"},
			dateSavedSort: {main: "Date Saved", home: "Order by date saved:"},

		};

	}

	componentDidUpdate(prevProps) {
		if (this.props.tabInput !== prevProps.tabInput) {
			this.setState({tab: this.props.tabInput });
		}
	  }
	  

	static componentDidUpdate() {
		console.log("HELLOW")
	}

	getCurrentSearchParams() {
		const paramDict = {
			textSearch: this.searchTextRef.current.getTextInput()
		}

		if (this.state.tab === "topic") {
			paramDict["featuredCheck"] = this.featuredCheck.current.getCheckValue();
			paramDict["nameSort"] = this.nameOrder.current.getSortID();
			paramDict["createdAtSort"] = this.createdAtOrder.current.getSortID();
		} else if (this.state.tab === "user") {
			paramDict["repositorsSort"] = this.repositorsOrder.current.getSortID();
			paramDict["followSort"] = this.followerOrder.current.getSortID();
			paramDict["joinedSort"] = this.joinedOrder.current.getSortID();

		} else if (this.state.tab === "saved") {
			paramDict["dateSaved"] = this.dateSavedRef.current.getSortID();
			paramDict["project"] = this.projectCheck.current.getCheckValue();
			paramDict["user"] = this.userCheck.current.getCheckValue();		
		}



		return paramDict;
	}

	getSearchURL() {
		const searchParams = this.getCurrentSearchParams();
		const urlStringList = [];
		
		if (searchParams.textSearch !== "") {
			urlStringList.push("textSearch=" + searchParams.textSearch.replace(" ", "+"));
		}

		if (this.state.tab === "saved" || this.props.tab === "saved") {
			if (searchParams.dateSaved !== "") urlStringList.push("dateSaved=" + searchParams.dateSaved);
			if (searchParams.project !== "") urlStringList.push("topic=" + searchParams.project);
			if (searchParams.user !== "") urlStringList.push("user=" +searchParams.user);
		}

		else if (this.state.tab === "topic" || this.props.tab === "topic") {
			if (searchParams.featuredCheck) urlStringList.push("featured=true");
			if (searchParams.nameSort !== "") urlStringList.push("nameSort=" + searchParams.nameSort);
			if (searchParams.createdAtSort !== "") urlStringList.push("createdAtSort=" + searchParams.createdAtSort);
		}

		else if (this.state.tab === "user" || this.props.tab === "user") {
			if (searchParams.repositorsSort !== "") urlStringList.push("repositorsSort=" + searchParams.repositorsSort);
			if (searchParams.followSort !== "") urlStringList.push("followerSort=" + searchParams.followSort);
			if (searchParams.joinedSort !== "") urlStringList.push("joinedSort=" + searchParams.joinedSort);
		}

		const http = "?" + (urlStringList.length !== 1 ? 
		urlStringList.join("&") : urlStringList[0]);
		return http;
	}



	searchGit() {
		//this.props.searchRequest(this.generateRequest());
		console.log("HELLO");
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

	tabChangeState(tab) {
		this.setState({tab});
	}

	toggleAdvanced() {
		const advanced = !this.state.advanced;
		this.setState({advanced});
	}

	getIsMainDiv() {
		return this.props.isMainDiv !== undefined && this.props.isMainDiv !== undefined ? this.props.isMainDiv : false;
	}

	getProjectButtons() {
		const isMainDiv = this.getIsMainDiv();
		const dictKey = isMainDiv ? "main" : "home";
		const alt = !this.props.isMobile;

		return <div>
			<SearchCheckBox default={this.featured} key="featuredCheck" alt={alt} title={this.titleDict["featuredCheck"][dictKey]} ref={this.featuredCheck}></SearchCheckBox>{alt ? <br></br> : null}
			<SearchSortButton sortInput={this.nameSort} key="nameSort" alt={alt} title={this.titleDict["nameSort"][dictKey]} ref={this.nameOrder}></SearchSortButton>{alt ? <br></br> : null}
			<SearchSortButton sortInput={this.createdAtSort} key="dateSort" alt={alt} title={this.titleDict["dateSort"][dictKey]} ref={this.createdAtOrder}></SearchSortButton>{alt ? <br></br> : null}
		</div>
	}

	getUserButtons() {
		const isMainDiv = this.getIsMainDiv();
		const dictKey = isMainDiv ? "main" : "home";
		const alt = !this.props.isMobile;

		return <div>
			<SearchSortButton sortInput={this.followerSort} key="followerSort" alt={alt} title={this.titleDict["followerSort"][dictKey]} ref={this.followerOrder}></SearchSortButton>{alt ? <br></br> : null}
			<SearchSortButton sortInput={this.repositorsSort} key="repoSort" alt={alt} title={this.titleDict["repoSort"][dictKey]} ref={this.repositorsOrder}></SearchSortButton>{alt ? <br></br> : null}
			<SearchSortButton sortInput={this.joinedSort} key="joinSort" alt={alt} title={this.titleDict["joinSort"][dictKey]} ref={this.joinedOrder}></SearchSortButton>{alt ? <br></br> : null}
		</div>
	}

	getSavedButtons() {
		const isMainDiv = this.getIsMainDiv();
		const dictKey = isMainDiv ? "main" : "home";
		const alt = !this.props.isMobile;

		return <div className="searchButtons">
			<SearchCheckBox default={this.project} key="projectCheck" alt={alt} title={this.titleDict["projectCheck"][dictKey]} ref={this.projectCheck}></SearchCheckBox>{alt ? <br></br> : null}
			<SearchCheckBox default={this.user} key="userCheck" alt={alt} title={this.titleDict["userCheck"][dictKey]} ref={this.userCheck}></SearchCheckBox>{alt ? <br></br> : null}
			<SearchSortButton sortInput={this.dateSaved} key="dateSavedSort" alt={alt} title={this.titleDict["dateSavedSort"][dictKey]} ref={this.dateSavedRef}></SearchSortButton>{alt ? <br></br> : null}
		</div>
	}

	searchSaved() {
		//pushSavedSearchData(this.searchTextRef.current.getTextInput(), {});
		this.props.savedRequest(this.getCurrentSearchParams());
	}

	testInput() {
		console.log("HELLO");
	}

	getElementClassName() {
		const isMainDiv = this.getIsMainDiv();
		if (this.props.isMobile && isMainDiv) return "stickyParent"
		else if (isMainDiv) return "largeSearchBox mainSearch stickyParent";
		else return "largeSearchBox stickyParent";
	}

	getElements(advancedFeatures) {
		const isMainDiv = this.getIsMainDiv();

		if (this.props.isMobile && isMainDiv) {
			return (
					<div className="searchMain stickySearch">
						<SearchTextInput key="mobileSearchInput" textInput={this.textSearch} 
						searchSignal={() => this.searchGit()}
						ref={this.searchTextRef}></SearchTextInput>
						{advancedFeatures}
					</div>
			);
		} else {
			return (
			<div>
				<SearchTextTabInput key="largeSearchInput"
				tabInput={this.state.tab} textInput={this.textSearch}  
				alt={true} isMainDiv={isMainDiv} tabChange={(tab) => this.tabChangeState(tab)} 
				searchSignal={() => this.searchGit()} ref={this.searchTextRef}></SearchTextTabInput>
				<div className="advancedDiv">
					<span className="advancedToggle noSelect" onClick={() => this.toggleAdvanced()}>
						{!this.state.advanced ? "Show Advanced Options +" : "Hide Advanced Options -"}
					</span>
					<div className={this.state.advanced ? "advancedBox" : "advancedBox hidden"}>			
						{advancedFeatures}
					</div>
				</div>
			</div>
		);
		}

	}


	render() {

		let advancedFeatures;
		if (this.state.tab === "topic") advancedFeatures = this.getProjectButtons();
		else if (this.state.tab === "user") advancedFeatures = this.getUserButtons();
		else if (this.state.tab === "saved") advancedFeatures = this.getSavedButtons();

		const searchElements = this.getElements(advancedFeatures);
		const mainClassName = this.getElementClassName();
		return (
			
			//{this.props.isMobile ? 
				<div className={mainClassName}>{searchElements}</div>
			//:
			//<div className="stickyParent">
			//	{searchItem}
			//</div>
			//}
		)
	}

}

export default LargeSearchBox;