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

	setAltSortID(sortID) {
		if (sortID === this.state.sortID) sortID = 0;
		this.setState({
			sortID
		});

	}

	


	render() {
		const checkboxClass = "checkBoxInputDiv" + 
		(this.state.sortID ? " checkedItem" : "")
		const sortDisp = ["", "ASC", "DESC"];

		let mainClass="searchComponentDiv noSelect";
		if (this.props.alt) {
			mainClass += " altStyle";
			const ascClass = this.state.sortID === 1 ? "sortDisp" : "altStyleButton sortDisp";
			const descClass = this.state.sortID === 2 ? "sortDisp" : "altStyleButton sortDisp";
			const classChecked = this.state.sortID === 0 ? "checkBoxInputDiv" : "checkBoxInputDiv checkedItem"
			return (
				<div className={mainClass}>
					<div className={classChecked} >
						<span>{this.props.title}</span>
						
						<span className={ascClass} onClick={() => this.setAltSortID(1)}>ASC</span>
						<span className={descClass} onClick={() => this.setAltSortID(2)}>Desc</span>
					</div>
				</div>
			)
		} else {
			return (
				<div className={mainClass}
				onClick={() => this.changeSort()}>
					<div className={checkboxClass} >
						<span>{this.props.title}</span>
						
						{this.state.sortID !== 0 ? 
						<span className="sortDisp">{sortDisp[this.state.sortID]}</span> : null}
					</div>
				</div>
			)
		}

	}

}

export default SearchSortButton;