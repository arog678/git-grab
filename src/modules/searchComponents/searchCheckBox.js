import { Component } from "react";
import "../style/searchStyleComponents.css";

class SearchCheckBox extends Component {
	
	constructor(props) {
		super(props);
		const checkValue = this.props.default !== undefined ? this.props.default : false;
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


	render() {
		const checkboxClass = "checkBoxInputDiv" + 
		(this.state.checkValue ? " checkedItem" : "")
		return (
			<div className="searchComponentDiv noSelect">
				<div className={checkboxClass} 
				onClick={() => this.setCheckbox()}>
					<span>{this.props.title}</span>
					<input checked={this.state.checkValue}
					labelStyle={{color: 'white'}}
					iconStyle={{fill: 'white'}}				  
					name="textInput" className="textInput" type="checkbox"
					></input>
				</div>
			</div>
		)
	}

}

export default SearchCheckBox;