import { Component } from "react";
import "../style/searchStyleComponents.css";

class SearchTextInput extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			textInput: ""
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

	handleTabChange(event) {
		const tab = event.target.value;
		this.setState({tab});
		this.props.tabChange(tab);
	}	


	render() {
		let textSearchButtonClass = false ? "textSearchIcon searchButtonAlt" : "textSearchIcon";
		const searchButtonClass = this.props.alt ? "searchButtonAlt" : "textSearchButton";
		return (
			<div className="searchComponentDiv altFull">
				<div className="textInputDiv">
					<input value={this.state.textInput} 
					onKeyPress={(e) => this.handleKeyPress(e)}
					onChange={(event) => this.changeTextInput(event)}
					name="textInput" className={this.props.alt ? "textInput altTextInput" : "textInput"} type="text"
					></input>
				</div>

				<div className="textInputDiv altDropdown">
					<select value={this.state.tab} onChange={(e) => this.handleTabChange(e)}>
						<option selected value="project">Projects</option>
						<option value="user">Users</option>
						<option value="saved">Saved</option>
					</select>
				</div>

				<div className="textSearchIcon altButton">
					<span  
					onClick={() => this.searchGit()}
					>SEARCH</span>
				</div>
			</div>
		)
	}

}

export default SearchTextInput;