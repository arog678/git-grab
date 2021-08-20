import React, { Component } from "react";
import SearchSortButton from "./searchSortButton";
import SearchTextInput from "./searchTextInput";

class SearchUser extends Component {
	
	constructor(props) {
		super(props);
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
		//this.props.searchRequest(this.generateRequest());
		const requestParams = this.generateRequest();
		if (requestParams !== "?") {
			const currentPath = this.props.history.location.pathname;
			const newPath = currentPath + requestParams;
			this.props.history.push(newPath);
		}
	}



	render() {
		return (
			<div className="searchMain">
				<SearchTextInput searchSignal={() => this.searchUsers()} ref={this.searchTextRef}></SearchTextInput>
				<SearchSortButton title="Followers" ref={this.followerOrder}></SearchSortButton>
				<SearchSortButton title="Repositors" ref={this.repositorsOrder}></SearchSortButton>
				<SearchSortButton title="Joined" ref={this.joinedOrder}></SearchSortButton>
			</div>
		)
	}

}

export default SearchUser;