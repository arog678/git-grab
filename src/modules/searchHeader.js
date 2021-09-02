import { Component } from "react";
import SearchProject from "./searchComponents/searchProject";
import "./style/searchStyle.css";
import SearchUser from "./searchComponents/searchUser";
import SearchSaved from "./searchComponents/searchSaved";


class SearchHeader extends Component {
	
	constructor(props) {
		super(props);
		this.state = {};
	}
	
	newSearch(url) {
		this.props.newSearch(url);
	}

	searchSaved(options) {
		this.props.searchSaved(options);
	}

	render() {
		let searchItem;
		if (this.props.tab === "project") searchItem = <SearchProject history={this.props.history} type="project" searchRequest={(url) => this.newSearch(url)}></SearchProject>
		if (this.props.tab === "user") searchItem = <SearchUser history={this.props.history} type="user" searchRequest={(url) => this.newSearch(url)}></SearchUser>
		if (this.props.tab === "saved") searchItem = <SearchSaved history={this.props.history} type="saved" savedRequest={(options) => this.newSearch(options)} searchRequest={(url) => this.newSearch(url)}></SearchSaved>

		return (
			<div className="stickyParent">
				{searchItem}
			</div>
		)
	}

}

export default SearchHeader;
