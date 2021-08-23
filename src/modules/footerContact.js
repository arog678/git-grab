import { Component } from "react";
import "./style/footerContact.css";

class FooterContact extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return <footer className="footerDiv">
			<div className="contactInfoRow">
				<span className="title">Linkdin:</span>
				<span className="link">
					<a target="_blank" 
					rel="noreferrer" 
					href="https://www.linkedin.com/in/alex-rogers-b958a9218">
						www.linkedin.com/in/alex-rogers-b958a9218
					</a>
				</span>
			</div>
			<div className="contactInfoRow">
				<span className="title">Email:</span>
				<span className="link">
						alexrogers678@gmail.com	
				</span>
			</div>
		</footer>
	}
}

export default FooterContact