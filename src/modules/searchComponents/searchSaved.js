import React, { Component } from "react";
import SearchCheckBox from "./searchCheckBox";
import SearchSortButton from "./searchSortButton";
import SearchTextInput from "./searchTextInput";

class SearchSaved extends Component {
	
	constructor(props) {
		super(props);
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
		this.props.savedRequest(this.getCurrentSearchParams());
	}

	getSavedUrl() {
		const searchParams = this.getCurrentSearchParams();
	
		const urlStringList = [];

		
		if (searchParams.textSearch !== "") {
			urlStringList.push("textSearch=" + searchParams.textSearch.replace(" ", "+"));
		}

		if (searchParams.repositorsSort !== "") urlStringList.push("repositorsSort=" + searchParams.repositorsSort);

		if (searchParams.projectCheck !== "") urlStringList.push("projectCheck=" + searchParams.project);

		if (searchParams.userCheck !== "") urlStringList.push("userCheck=" + searchParams.user);
		
		const http = "?" + urlStringList.join("&");

		return http;
			
		
	}


	render() {
		return (
			<div className="searchMain">
				<SearchTextInput searchSignal={() => this.searchSaved()} ref={this.searchTextRef}></SearchTextInput>
				<SearchSortButton title="Date Saved" ref={this.dateSavedRef}></SearchSortButton>
				<SearchCheckBox title="Project" ref={this.projectCheck}></SearchCheckBox>
				<SearchCheckBox title="User" ref={this.userCheck}></SearchCheckBox>
			</div>
		)
	}

}

export default SearchSaved;