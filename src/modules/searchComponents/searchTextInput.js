import { Component } from "react";
import "../style/searchStyleComponents.css";

class SearchTextInput extends Component {
	
	constructor(props) {
		super(props);
		
		const pt = props.textInput
		this.state = {
			textInput: (pt !== null && pt !== undefined) ? pt : ""
		};
	}

	changeTextInput(event) {
		//console.log(event);
		this.setState({textInput: event.target.value});
	}

	//VALIDATE???

	searchGit() {
		if (this.state.textInput === "") {
			alert("NEED INPUT HERE");
		} else {
			this.props.searchSignal();
		}
	}

	getTextInput() {
		return this.state.textInput;
	}

	handleKeyPress(e) {
		if(e.charCode === 13){
			this.searchGit();   
		} 
		
	}


	render() {
		return (
			<div className="searchComponentDiv mobileGap">
				<div className="textInputDiv">
					<input value={this.state.textInput} 
					onKeyPress={(e) => this.handleKeyPress(e)}
					onChange={(event) => this.changeTextInput(event)}
					name="textInput" className="textInput" type="text"
					></input>
				</div>
				<div className="textSearchIcon noSelect">
					<span className="textSearchButton" 
					onClick={() => this.searchGit()}
					>SEARCH</span>
				</div>
			</div>
		)
	}

}

export default SearchTextInput;