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



	render() {
		//change name to id if issues come up
		const tabItemsList = ["Project", "User", "Saved"];
		const tabElements = [];
		for (const tab of tabItemsList) {
			let name = tab.toLowerCase();
			const isSelected = this.props.currentTab === name;
			const className = "tabItem" + (isSelected ? " tabSelected" : "");
			let tabName = tab;
			if (tab === "Project") tabName = "Topics" //WORK AROUND TO FIX MASSIVE PROJECT TOPIC FUCKUP
			tabElements.push(
				<div className={className} name={name} onClick={() => this.tabClick(name)}>{tabName}</div>
			);
		}

		return (
			<div className="tabContainer noSelect">
				{tabElements}
			</div>
		)
	}

}

export default TopTabs;
