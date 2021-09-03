import React, { Component } from "react";
import SearchCheckBox from "./searchCheckBox";
import SearchSortButton from "./searchSortButton";
import SearchTextInput from "./searchTextInput";
import { pushSavedSearchData } from "../utils/savingUtil";

class SearchSaved extends Component {
	
	constructor(props) {
		super(props);
		const params = new URLSearchParams(props.history.location.search);
		this.dateSaved = params.get("dateSaved");
		//this.project = params.get("topic");
		this.project = params.get("topic");
		this.user = params.get("user");

		if (this.project === null || this.project === undefined) this.project = true;
		if (this.user === null || this.user === undefined) this.user = true;

		this.state = {};
		this.searchTextRef = React.createRef();

		this.nameRef = React.createRef();
		this.dateSavedRef = React.createRef();
		this.projectCheck = React.createRef();
		this.userCheck = React.createRef();
	}

	getCurrentSearchParams() {
		const sortIds = ["", "asc", "desc"];
		return {
			textSearch: this.searchTextRef.current.getTextInput(),
			dateSaved: sortIds[this.dateSavedRef.current.getSortID()],
			project: this.projectCheck.current.getCheckValue(),
			user: this.userCheck.current.getCheckValue()
		}	
	}

	searchSaved() {
		pushSavedSearchData(this.searchTextRef.current.getTextInput(), {});
		this.props.savedRequest(this.getCurrentSearchParams());
	}

	getSavedUrl() {
		const searchParams = this.getCurrentSearchParams();
	
		const urlStringList = [];

		
		if (searchParams.textSearch !== "") {
			urlStringList.push("textSearch=" + searchParams.textSearch.replace(" ", "+"));
		}

		if (searchParams.repositorsSort !== "") urlStringList.push("repositorsSort=" + searchParams.repositorsSort);

		if (searchParams.projectCheck !== "") urlStringList.push("topicCheck=" + searchParams.project);

		if (searchParams.userCheck !== "") urlStringList.push("userCheck=" + searchParams.user);
		
		const http = "?" + urlStringList.join("&");

		return http;
			
		
	}


	render() {
		//PROJECT TITLE CHANGED TO TOPIC TO FIX MASSIVE FUCKUP
		return (
			<div className="searchMain">
				<SearchTextInput searchSignal={() => this.searchSaved()} ref={this.searchTextRef}></SearchTextInput>
				<SearchCheckBox title="Topic" default={this.project} ref={this.projectCheck}></SearchCheckBox>
				<SearchCheckBox title="User" default={this.user} ref={this.userCheck}></SearchCheckBox>
				<SearchSortButton title="Date Saved" sortInput={this.dateSaved} ref={this.dateSavedRef}></SearchSortButton>
			</div>
		)
	}

}

export default SearchSaved;