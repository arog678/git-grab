import { Component } from "react";
import CardBasic from "./cardComponents/cardBasic";
import CardExpandedUser from "./cardComponents/cardExpandedUser";
import CardExpandedProject from "./cardComponents/cardExpanedProject";
import db from "./utils/database";
import { getProjectDetails, getUserDetails } from "./utils/getGitHttp";
import { saveItem } from "./utils/savingUtil";
import "./style/gitCardList.css";
import FullImg from "./fullImg";

//import TransitionGroup from 'react-transition-group'; // ES6
//var ReactCSSTransitionGroup = require('react-transition-group'); // ES5 with npm



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
			extraInfo: {},
			notificationText: "",
			openImg: false,
			userImg: null
		};
		this.notificationTimeout = null;
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
		console.log(1)
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
		console.log(2)
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

	async saveObject(info, type) {
		console.log(saveItem);
		if (this.props.type === "saved") {
			const dbItem = await db.savedItems.get({itemId: info.id});
			const promiseArray = [];
			promiseArray.push(db.savedItems.delete(dbItem.id));
			promiseArray.push(db[type].delete(info.id));
			await Promise.All(promiseArray);
			this.deleteNotifiction();
			return;
		}

		const dbItem = await db.savedItems.get({itemId: info.id});
		//use this to double check status in db iteself not children
		const isSaved = dbItem !== undefined && dbItem !== null;

		console.log(info)
		if (isSaved) {
			//const dbItem = await db.savedItems.get({itemId: info.id});
			console.log(dbItem);
			const promiseArray = [];
			promiseArray.push(db[type].delete(info.id));
			promiseArray.push(db.savedItems.delete(dbItem.id));
			await Promise.all(promiseArray);
			//this.deleteNotifiction();
		
		} else {
			await saveItem(info, type);
			this.savedNotification();
		}
	}


	savedNotification() {
		console.log(3)
		this.setState({showSaved: true, notificationText: "Saved!"});
			clearTimeout(this.notificationTimeout);
			this.notificationTimeout = setTimeout(() => {
				console.log(4)
				this.setState({showSaved: false});
			}, 2000);
	}

	openFullImg(userImg) {
		console.log(userImg);
		console.log(5)
		//this.setState({userImg, openImg: true})
		//THIS WILL BE DISABLED BY DEFAULT
	}

	closeFullImg() {
		console.log(6)
		this.setState({openImg: false})
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
					showImg={(userImg) => this.openFullImg(userImg)}
					info={item} type={item.type}></CardBasic>);
			} else if (item.type === "user") {
				cardList.push(<CardExpandedUser info={this.state.extraInfo[item.id]} 
					saveObject={(info) => this.saveObject(info, item.type)}
					showImg={(userImg) => this.openFullImg(userImg)}
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
				{this.state.showSaved ? <div className="savedNote">{this.state.notificationText}</div> : null}
						

				{cardList}
				{this.state.openImg ?
					<div className="fullPageItem" >
						<FullImg closeImgSignal={() => this.closeFullImg()} userImg={this.state.userImg}></FullImg>
					</div>
				 : null}
				
			</div>
		)
	}


}

export default GitCardList;