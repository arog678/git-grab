import { Component } from "react";
import "./style/goToTopButton.css"

class GoToTopButton extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
		
		return (
			<div className="buttonContainer">
				<div className="toTopButton">
					<span className="buttonInner">TOP</span>
				</div>
			</div>
		)
	}


}

export default GoToTopButton;