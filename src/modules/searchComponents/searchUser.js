import React, { Component } from "react";
import SearchSortButton from "./searchSortButton";
import SearchTextInput from "./searchTextInput";
import { pushUserSearchData } from "../utils/savingUtil";

class SearchUser extends Component {
	
	constructor(props) {
		super(props);

		const params = new URLSearchParams(props.history.location.search);
		this.textSearch = params.get("textSearch");
		this.repositorsSort = params.get("repositorsSort");
		this.followerSort = params.get("followerSort");
		this.joinedSort = params.get("joinedSort");

		this.state = {};
		this.searchTextRef = React.createRef();
		this.followerOrder = React.createRef();
		this.repositorsOrder = React.createRef();
		this.joinedOrder = React.createRef();
	}

	getCurrentSearchParams() {
		return {
			userText: this.searchTextRef.current.getTextInput(),
			followSort: this.followerOrder.current.getSortID(),
			repositorsSort: this.repositorsOrder.current.getSortID(),
			joinedSort: this.joinedOrder.current.getSortID()
		}	
	}

	generateRequest() {
		const searchParams = this.getCurrentSearchParams();
	
		const urlStringList = [];

		
		if (searchParams.userText !== "") {
			urlStringList.push("textSearch=" + searchParams.userText.replace(" ", "+"));
		}

		if (searchParams.repositorsSort !== "") urlStringList.push("repositorsSort=" + searchParams.repositorsSort);

		if (searchParams.followSort !== "") urlStringList.push("followerSort=" + searchParams.followSort);

		if (searchParams.joinedSort !== "") urlStringList.push("joinedSort=" + searchParams.joinedSort);
		
		const http = "?" + (urlStringList.length !== 1 ? 
		urlStringList.join("&") : urlStringList[0]);

		return http;
		
	
	}

	searchUsers() {
		const requestParams = this.generateRequest();
		if (requestParams !== "?") {
			const currentPath = this.props.history.location.pathname; // redundant will alway how user
			const newPath = currentPath + requestParams;
			pushUserSearchData(this.searchTextRef.current.getTextInput(), requestParams);
			this.props.history.push(newPath);
		}
	}



	render() {

		return (
			<div className="searchMain">
				<SearchTextInput textInput={this.textSearch} searchSignal={() => this.searchUsers()} ref={this.searchTextRef}></SearchTextInput>
				<SearchSortButton sortInput={this.followerSort} title="Followers" ref={this.followerOrder}></SearchSortButton>
				<SearchSortButton sortInput={this.repositorsSort} title="Repositors" ref={this.repositorsOrder}></SearchSortButton>
				<SearchSortButton sortInput={this.joinedSort} title="Joined" ref={this.joinedOrder}></SearchSortButton>
			</div>
		)
	}

}

export default SearchUser;