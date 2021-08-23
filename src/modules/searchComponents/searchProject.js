import React, { Component } from "react";
import SearchCheckBox from "./searchCheckBox";
import SearchSortButton from "./searchSortButton";
import SearchTextInput from "./searchTextInput";
import "../style/searchStyle.css";
import { pushProjectSearchData } from "../utils/savingUtil";

class SearchProject extends Component {
	
	constructor(props) {
		super(props);
		this.state = {};
		this.searchTextRef = React.createRef();
		this.featuredCheck = React.createRef();
		this.nameOrder = React.createRef();
		this.createdAtOrder = React.createRef();
	}

	getCurrentSearchParams() {
		return {
			projectText: this.searchTextRef.current.getTextInput(),
			featuredCheck: this.featuredCheck.current.getCheckValue(),
			nameSort: this.nameOrder.current.getSortID(),
			createdAtSort: this.createdAtOrder.current.getSortID()
		}	
	}

	generateRequest() {

		const searchParams = this.getCurrentSearchParams();

		const urlStringList = [];

		
		if (searchParams.projectText !== "") {
			urlStringList.push("textSearch=" + searchParams.projectText.replace(" ", "+"));
		}

		if (searchParams.featuredCheck) urlStringList.push("featured=true");

		if (searchParams.nameSort !== "") urlStringList.push("nameSort=" + searchParams.nameSort);

		if (searchParams.createdAtSort !== "") urlStringList.push("createdAtSort=" + searchParams.createdAtSort);

		const http = "?" + (urlStringList.length !== 1 ? 
		urlStringList.join("&") : urlStringList[0]);

		return http;
		
	}

	searchProjects() {
		//this.props.searchRequest(this.generateRequest());
		const requestParams = this.generateRequest();
		if (requestParams !== "?") {
			const currentPath = this.props.history.location.pathname;
			const newPath = currentPath + requestParams;
			pushProjectSearchData(this.searchTextRef.current.getTextInput(), requestParams);
			this.props.history.push(newPath);
		}
	}

	testRequest() {
		console.log(this.props);
		console.log(this.generateRequest());
		const query = this.generateRequest();
		this.props.history.push(query);

	}


	render() {
		return (
			<div className="searchMain stickySearch">
				<SearchTextInput searchSignal={() => this.searchProjects()} ref={this.searchTextRef}></SearchTextInput>
				<SearchCheckBox title="Featured" ref={this.featuredCheck}></SearchCheckBox>
				<SearchSortButton title="Followers" ref={this.followerOrder}></SearchSortButton>
				<SearchSortButton title="Name" ref={this.nameOrder}></SearchSortButton>
				<SearchSortButton title="Created At" ref={this.createdAtOrder}></SearchSortButton>
			</div>
		)
	}

}

export default SearchProject;