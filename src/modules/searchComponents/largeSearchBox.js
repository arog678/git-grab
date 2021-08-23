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
		this.state = {
			tab: "project",
			advanced: false
		};

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

	}

	getCurrentSearchParams() {
		const paramDict = {
			textSearch: this.searchTextRef.current.getTextInput()
		}

		if (this.state.tab === "project") {
			paramDict["featuredCheck"] = this.featuredCheck.current.getCheckValue();
			paramDict["nameSort"] = this.nameOrder.current.getSortID();
			paramDict["createdAtSort"] = this.createdAtOrder.current.getSortID();
		} else if (this.state.tab === "user") {
			paramDict["repositorsSort"] = this.repositorsOrder.current.getSortID();
			paramDict["followSort"] = this.followerOrder.current.getSortID();
			paramDict["joinedSort"] = this.joinedOrder.current.getSortID();

		} else if (this.state.tab === "saved") {
			paramDict["followSort"] = this.dateSavedRef.current.getSortID();
			paramDict["repositorsSort"] = this.projectCheck.current.getCheckValue();
			paramDict["joinedSort"] = this.userCheck.current.getCheckValue();		
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
			if (searchParams.dateSaved !== "") urlStringList.push(this.dateSavedRef.current.getSortID());
			if (searchParams.project !== "") urlStringList.push(this.projectCheck.current.getCheckValue());
			if (searchParams.user !== "") urlStringList.push(this.userCheck.current.getCheckValue());
		}

		else if (this.state.tab === "project" || this.props.tab === "project") {
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
		const requestParams = this.getSearchURL();
		const tabDict = {
			"project": "recentProjectSearches",
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

	testRequest() {
		console.log(this.props);
		console.log(this.generateRequest());
		const query = this.generateRequest();
		this.props.history.push(query);

	}

	tabChangeState(tab) {
		this.setState({tab});
	}

	toggleAdvanced() {
		const advanced = !this.state.advanced;
		this.setState({advanced});
	}

	getProjectButtons() {
		return <div>
			<SearchCheckBox alt={true} title="Show only featured projects" ref={this.featuredCheck}></SearchCheckBox><br></br>
			<SearchSortButton alt={true} title="Order by followers of project" ref={this.followerOrder}></SearchSortButton><br></br>
			<SearchSortButton alt={true} title="Order by name of project" ref={this.nameOrder}></SearchSortButton><br></br>
			<SearchSortButton alt={true} title="Order by date of project creation" ref={this.createdAtOrder}></SearchSortButton><br></br>
		</div>
	}

	getUserButtons() {
		return <div>
			<SearchSortButton alt={true} title="Order by total users followers:" ref={this.followerOrder}></SearchSortButton><br></br>
			<SearchSortButton alt={true} title="Order by total user Repositors:" ref={this.repositorsOrder}></SearchSortButton><br></br>
			<SearchSortButton alt={true} title="Order by date Joined:" ref={this.joinedOrder}></SearchSortButton><br></br>
		</div>
	}

	getSavedButtons() {
		return <div className="searchButtons">
			<SearchCheckBox alt={true} title="Show saved projects?" default={true} ref={this.projectCheck}></SearchCheckBox><br></br>
			<SearchCheckBox alt={true} title="Show saved users?" default={true} ref={this.userCheck}></SearchCheckBox><br></br>
			<SearchSortButton alt={true} title="Order by dat saved:" ref={this.dateSavedRef}></SearchSortButton><br></br>
		</div>
	}


	render() {
		let advancedFeatures;
		if (this.state.tab === "project") advancedFeatures = this.getProjectButtons();
		else if (this.state.tab === "user") advancedFeatures = this.getUserButtons();
		else if (this.state.tab === "saved") advancedFeatures = this.getSavedButtons();
		return (
			<div className="largeSearchBox">
				{this.props.tab !== undefined ? 
				<SearchTextInput alt={true} searchSignal={() => this.searchGit()} ref={this.searchTextRef}></SearchTextInput>
				: <SearchTextTabInput alt={true} tabChange={(tab) => this.tabChangeState(tab)} searchSignal={() => this.searchGit()} ref={this.searchTextRef}></SearchTextTabInput>}
				
				<div className="advancedDiv">
					<span className="advancedToggle noSelect" onClick={() => this.toggleAdvanced()}>{!this.state.advanced ? "Show Advanced Options +" : "Hide Advanced Options -"}</span>
					<div className={this.state.advanced ? "advancedBox" : "advancedBox hidden"}>
						
						{advancedFeatures}
					</div>
				</div>

			</div>
		)
	}

}

export default LargeSearchBox;