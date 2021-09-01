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
			const url = <span><a href={this.props.info.url}>{this.props.info.url}</a></span>
			const createdAt = <span>{this.props.info.createdAt}</span>
			const updatedAt = <span>{this.props.info.updatedAt}</span>
			const released = <span>{this.props.info.released}</span>
			const desc = <span>{this.props.info.decsLong}</span>
	
			return (
				<div className="basicCardDetail">
					
					<div className="cardMain">
						<CardDetailCell title="Name" content={name}></CardDetailCell>
						<CardDetailCell title="Url" content={url}></CardDetailCell>
						<CardDetailCell title="CreatedAt" content={createdAt}></CardDetailCell>
						<CardDetailCell title="UpdatedAt" content={updatedAt}></CardDetailCell>
						<CardDetailCell title="Desc" content={desc}></CardDetailCell>
						<CardDetailCell title="Released" content={released}></CardDetailCell>
						<div className="bottomButtons expanded">
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

