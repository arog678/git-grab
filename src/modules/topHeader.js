import { Component } from "react";
import "./style/topHeader.css";
import AboutSection from "./aboutSection";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class TopHeader extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			showAbout: false
		};
	}

	goToFront() {
		this.props.history.push("/");
	}
	
	goToSaved() {
		this.props.history.push("/saved");
	}

	closeAbout() {
		this.setState({showAbout: false});
	}

	openAboutSection() {
		this.setState({showAbout: true});
	}


	render() {
		//const ldButtons = 				
		//	<div className="styleButtonsDiv">
		//		<div className="styleButton">Light</div>
		//		<div className="styleButton">Dark</div>
		//	</div>
		//const oldTitle = 
		//	<div className="titleBox">
		//		<span onClick={() => this.goToFront()} className="headerText">GIT GRAB</span>
		//	</div>
		//may bring back at some point

		return (
			<div className="HeaderDiv">
				<span className="topMenu" onClick={() => this.goToFront()}>
					<div className="icon"><FontAwesomeIcon icon="home" /></div>
					Home
				</span>
				<span className="topMenu" onClick={() => this.goToSaved()}>
					<div className="icon"><FontAwesomeIcon icon="save" /></div>
					Saved
				</span>
				<span  className="topMenu" onClick={() => this.openAboutSection()}>
					<div className="icon"><FontAwesomeIcon icon="question-circle" /></div>
					About
				</span>
				{this.state.showAbout ? 
					<div className="fullPageItem" onClick={() => this.closeAbout()}>
						<AboutSection onClick={this.closeAbout} closeAboutSignal={() => this.closeAbout()}></AboutSection>
					</div>
				:null}
			</div>
		)
	}

}

export default TopHeader;
