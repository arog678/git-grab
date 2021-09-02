import { Component } from "react";
import "./style/aboutSection.css";

class FullImg extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}
	
	closeImg = e => {
		e.stopPropagation();  //  <------ Here is the magic
		//this.props.closeAboutSignal();
	}

	close() {
		this.props.closeImgSignal();
	}

	render() {
		return (
			<div className="aboutContainer imgDiv" >
				<div className="gapItem"></div>

			<div onClick={this.closeImg} className="aboutInfo">
				<div><span className="closePopup" onClick={() => this.close()}>CLOSE</span></div>
				<div>
					<img alt="avatar" src={this.props.userImg}></img>
				</div>
				<div><a href={this.props.userImg}>{this.props.userImg}</a></div>
			</div>
			</div>
		);
	}
}

export default FullImg;