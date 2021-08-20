import { Component } from "react";
import "./style/topHeader.css";

class TopHeader extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			
		};
	}



	render() {
		return (
			<div className="HeaderDiv">
				<div className="headerText">GIT GRAB</div>
				<div className="styleButtonsDiv">
					<div className="styleButton">Light</div>
					<div className="styleButton">Dark</div>
				</div>
			</div>
		)
	}

}

export default TopHeader;
