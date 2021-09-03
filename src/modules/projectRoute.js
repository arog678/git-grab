import { Component } from "react";
import GitCardList from "./gitCardList";
import PageTrack from "./pageTrack";
import SearchHeader from "./searchHeader";
import TopHeader from "./topHeader";
import TopTabs from "./topTabs";
import db from "./utils/database";
import { getHttpRequest } from "./utils/getGitHttp";
import  loadSaved  from "./utils/loadInSaved";
import queryMain from "./utils/handleQuery";

class MainDiv extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			currentTab: "topic",
			gitResponse: null,
			currentPage: 1,
			searchParams: {},
			urlDict: {},
			lastPage: 1,
		};

	}

	async componentDidMount() {
		const response = this.gitRespLoad();

		const totalCount = Math.min(response.resp.total_count, 1000); //can only display first 1000
		const perPage = 30; //30 by default
		const lastPage = Math.ceil(totalCount / perPage);

		const params = new URLSearchParams(this.props.location.search);
		const page = params.get('page');
		const tab = params.get("tab");

		this.setState({
			currentTab: tab,
			gitResponse: response.items,
			currentPage: page, 
			lastPage
		});
	}

	async gitRespLoad() {
		return await queryMain(this.props.location.search);
	}

	
	render() {
		return (
			<div >
				
				<TopHeader></TopHeader>
				<button onClick={() => this.testLoad()}>loadInSaved</button>
				<TopTabs currentTab={this.state.currentTab} ></TopTabs>
				<SearchHeader tab={this.state.currentTab} searchParams={this.state.searchParams}></SearchHeader>
				{this.state.gitResponse !== null ? 
				<GitCardList gitInfo={this.state.gitResponse}></GitCardList> : null}
				<PageTrack currentPage={this.state.currentPage} lastPage={this.state.lastPage}></PageTrack>
			</div>
		);
	}


}

export default MainDiv;