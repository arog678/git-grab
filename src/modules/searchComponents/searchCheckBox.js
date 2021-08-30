import { Component } from "react";
import "../style/searchStyleComponents.css";

class SearchCheckBox extends Component {
	
	constructor(props) {
		super(props);
		const checkValue = this.props.default !== undefined ? this.props.default : false;
		console.log(checkValue, this.props.default);
		this.state = {
			checkValue
		};
	}

	setCheckbox() {
		this.setState({checkValue: !this.state.checkValue});
	}

	getCheckValue() {
		return this.state.checkValue;
	}

	checkChange() {

	}


	render() {
		const checkboxClass = "checkBoxInputDiv" + 
		(this.state.checkValue ? " checkedItem" : "")
		let mainClass="searchComponentDiv noSelect";
		if (this.props.alt) mainClass += " altStyle";
		return (
			<div className={mainClass}>
				<div className={checkboxClass} 
				onClick={() => this.setCheckbox()}>
					<span>{this.props.title}</span>
					<input checked={this.state.checkValue}
					labelstyle={{color: 'white'}}
					iconstyle={{fill: 'white'}}	
					onChange={() => this.checkChange()}			  
					name="textInput" className="textInput" type="checkbox"
					></input>
				</div>
			</div>
		)
	}

}

export default SearchCheckBox;