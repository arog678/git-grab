import { Component } from "react";
import "./style/topTabs.css";

class TopTabs extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			currentTab: "project"
		};
	}

	tabClick(name) {
		//this.props.tabChange(name);
		if (this.props.currentTab !== name){
			this.props.history.push("/" + name);
		}
	}

	oldTabSystem(tabItemsList) {
		const tabElements = [];

		for (const tab of tabItemsList) {
			let name = tab.toLowerCase();
			const isSelected = this.props.currentTab === name;
			if (!isSelected) continue; //use to remove not selected tabs
			const className = "tabItem" + (isSelected ? " tabSelected" : "");
			let tabName = tab;
			if (tab === "Project") tabName = "Topics" //WORK AROUND TO FIX MASSIVE PROJECT TOPIC FUCKUP
			tabElements.push(
				<div className={className} name={name} onClick={() => this.tabClick(name)}>{tabName}</div>
			);
		}
		return tabElements;
	}

	getTextSearch() {
		const params = new URLSearchParams(this.props.history.location.search);
		return params.get("textSearch");
	}

	newTabElements(name) {
		const firstChar = name.charAt(0).toUpperCase();
		const tabName = firstChar + name.slice(1);
		const searchTerm = this.getTextSearch();
		const resultsNum = this.props.totalResults >= 1000 ? "1000+" : this.props.totalResults;

		return <div 
		className="tabItem" name={name} 
		>
			Search Results for "{searchTerm}" - {tabName} ({resultsNum} Results)
		</div>
	}



	render() {
		//change name to id if issues come up
		const tabItemsList = ["Project", "User", "Saved"];
		const tabElements = this.newTabElements(this.props.currentTab);

		

		return (
			<div className="tabContainer">
				{tabElements}
			</div>
		)
	}

}

export default TopTabs;
