import { Component } from "react";
import CardBasic from "./cardComponents/cardBasic";
import CardExpandedUser from "./cardComponents/cardExpandedUser";
import CardExpandedProject from "./cardComponents/cardExpanedProject";
import db from "./utils/database";
import { getProjectDetails, getUserDetails } from "./utils/getGitHttp";
import saveItem from "./utils/savingUtil";


class GitCardList extends Component {
	
	constructor(props) {
		super(props);
		//owner.avatar //do after mount
		// owner.login dtrupenn
		//name
		//"html_url" 
		//last update "updated_at"

		//created at "created_at"

		this.state = {
			openDict: this.setupOpenDict(),
			extraInfo: {}
		};
	}

	async addExtraInfo(item, type) {
		let newData;
		if (type === "user") {
			newData = await getUserDetails(item.name, type);
		} else {
			console.log(item);
			//COMPLICATED API HANG UP HERE
			//WILL JUST USE OBJECT AS WORK AROUND
			//newData = await getProjectDetails(item.id, type);
			newData = item;
		}
		console.log(newData);
		const extraInfo = this.state.extraInfo;
		extraInfo[item.id] = newData;
		this.setState({extraInfo});

	}

	async openDictToggle(item, type) {
		const openDict = this.state.openDict;
		const extraInfo = this.state.extraInfo;
		if (openDict[item.id]) {
			openDict[item.id] = false;
		} else {
			openDict[item.id] = true;
			if (extraInfo[item.id] === undefined) {
				this.addExtraInfo(item, type);
			}
		}
		this.setState({openDict});
	}

	setupOpenDict() {
		const openDict = {};
		for (const item of this.props.gitInfo) {
			openDict[item.id] = false;
		}
		return openDict;
	}

	//mountcomponent stuff here

	saveObject(info, type) {
		console.log(saveItem);
		saveItem(info, type);
	}



	render() {
		const cardList = [];
		//const isUser = this.props.type === "user";
		//add user to items
		for (const item of this.props.gitInfo) {
			if (!this.state.openDict[item.id] || this.state.extraInfo[item.id] === undefined) {
				const isLoading = this.state.extraInfo[item.id] === undefined && this.state.openDict[item.id]
				cardList.push(<CardBasic 
					isLoading={isLoading}
					saveObject={(info) => this.saveObject(info, item.type)}
					showMore={(info) => this.openDictToggle(info, item.type)}
					info={item} type={item.type}></CardBasic>);
			} else if (item.type === "user") {
				cardList.push(<CardExpandedUser info={this.state.extraInfo[item.id]} 
					saveObject={(info) => this.saveObject(info, item.type)}
					hideItem={(info) => this.openDictToggle(info, item.type)}></CardExpandedUser>);
			} else {
				cardList.push(<CardExpandedProject info={this.state.extraInfo[item.id]}
				saveObject={(info) => this.saveObject(info, item.type)}
				hideItem={(info) => this.openDictToggle(info, item.type)}
				></CardExpandedProject>);
			}
		}

		return (
			<div >
				{cardList}
			</div>
		)
	}


}

export default GitCardList;