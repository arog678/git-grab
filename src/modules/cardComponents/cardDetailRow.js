import { Component } from "react";
import "../style/cardCellDetail.css";

class CardDetailCell extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			
		};
	}



	render() {
		return (
			<div className="cardRow">
				<div className="rowTitle noSelect">
					{this.props.title}
				</div>
				<div className="rowContent">
					{this.props.content}
				</div>
			</div>
		)
	}

}

export default CardDetailCell;
