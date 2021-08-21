import { Component } from "react";
import "./style/topHeader.css";

class TopHeader extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			
		};
	}



	render() {
		const ldButtons = 				
			<div className="styleButtonsDiv">
				<div className="styleButton">Light</div>
				<div className="styleButton">Dark</div>
			</div>
		//may bring back at some point

		return (
			<div className="HeaderDiv">
				<div className="titleBox">
					<span className="headerText">GIT GRAB</span>
				</div>
			</div>
		)
	}

}

export default TopHeader;
