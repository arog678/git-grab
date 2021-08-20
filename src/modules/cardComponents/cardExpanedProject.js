import { Component } from "react";
import CardDetailCell from "./cardDetailRow";
import "../style/cardBasic.css";

class CardExpandedProject extends Component {
	
	constructor(props) {
		props = props.info
		super(props);
		//props.name
		//props.url
		//props.created at
		//props.updated at
		//description
		//owner img
		//owner name
		//owner link
		this.state = {
			
		};
	}

	showLess() {
		this.props.hideItem(this.props.info);
	}

	saveObject() {
		this.props.saveObject(this.props.info);
	}



	render() {
		//could tighten this up
		if (this.props.info !== undefined) {
			const name = <span>{this.props.info.name}</span>
			const url = <span>{this.props.info.url}</span>
			const createdAt = <span>{this.props.info.createdAt}</span>
			const updatedAt = <span>{this.props.info.updatedAt}</span>
			const desc = <span>{this.props.info.desc}</span>
			const userImg = <span>{this.props.info.userImg}</span>
			const userName = <span>{this.props.info.userName}</span>
			const userLink = <span>{this.props.info.userLink}</span>
	
			return (
				<div className="basicCardDetail">
					<div className="avatarDiv">
						<span><img alt={this.props.info.name} className="avatarImg" src={this.props.info.userImg}></img></span>
					</div>
					<div className="cardMain">
						<CardDetailCell title="Name" content={name}></CardDetailCell>
						<CardDetailCell title="Url" content={url}></CardDetailCell>
						<CardDetailCell title="CreatedAt" content={createdAt}></CardDetailCell>
						<CardDetailCell title="UpdatedAt" content={updatedAt}></CardDetailCell>
						<CardDetailCell title="Desc" content={desc}></CardDetailCell>
						<CardDetailCell title="UserImg" content={userImg}></CardDetailCell>
						<CardDetailCell title="UserName" content={userName}></CardDetailCell>
						<CardDetailCell title="UserLink" content={userLink}></CardDetailCell>
						<div className="bottomButtons">
							<button className="cardButton" onClick={() => this.showLess()}>Show Less</button>
							<button className="cardButton" onClick={() => this.saveObject()}>Save</button>
						</div>
					</div>
					<div className="bottomDiv"></div>

				</div>
			)
		} else {
			return (
				<div className="cardDetailed">
					<span>LOADING</span>
				</div>
			);
		}
		
	}

}

export default CardExpandedProject;

