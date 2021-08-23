import { Component } from "react";
import "./style/aboutSection.css";

class AboutSection extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}
	
	closeAbout = e => {
		console.log("CLOSE STOP");
		e.stopPropagation();  //  <------ Here is the magic
		//this.props.closeAboutSignal();
	}

	close() {
		this.props.closeAboutSignal();
	}

	render() {
		return (
			<div className="aboutContainer" >
				<div className="gapItem"></div>

			<div onClick={this.closeAbout} className="aboutInfo">
				<div><span className="header">git-grab</span><span className="closePopup" onClick={() => this.close()}>CLOSE</span></div>
				<div>This app is made as a git search test but has expanded a little bit.</div>
				<div>Comes with saving searched items and recent search history.</div>
				<br></br>
				<div>I had some issues with routing, first time I've done so much using them.</div>
				<div>The project was done over about 2 and half days.</div>
				<div>Theres probably load that I need to polish up.</div>
				<div>Any issues just let me know.</div>
				<br></br>
				<div>Contact: </div>
				<div>
					www.linkedin.com/in/alex-rogers-b958a9218
				</div>
				<div>alexrogers678@gmail.com</div>
			</div>
			</div>
		);
	}
}

export default AboutSection;