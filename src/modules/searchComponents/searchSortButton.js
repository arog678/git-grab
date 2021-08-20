import { Component } from "react";
import "../style/searchStyleComponents.css";

class SearchSortButton extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			name: this.props.name,
			sortID: 0
		};
	}

	changeSort() {
		let sortID = this.state.sortID + 1;
		this.setState({
			sortID: sortID === 3 ? 0 : sortID
		});
	}

	getSortID() {
		return this.state.sortID;
	}


	render() {
		const checkboxClass = "checkBoxInputDiv" + 
		(this.state.sortID ? " checkedItem" : "")
		const sortDisp = ["", "ASC", "DESC"];
		return (
			<div className="searchComponentDiv"
			onClick={() => this.changeSort()}>
				<div className={checkboxClass} >
					<span>{this.props.title}</span>
					<span className="sortDisp">{sortDisp[this.state.sortID]}</span>
				</div>
			</div>
		)
	}

}

export default SearchSortButton;