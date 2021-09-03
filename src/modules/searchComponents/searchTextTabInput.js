import { Component } from "react";
import "../style/searchStyleComponents.css";

class SearchTextInput extends Component {
	
	constructor(props) {
		super(props);
		const pt = props.textInput;
		const tb = props.tabInput;
		this.state = {
			textInput: (pt !== null && pt !== undefined) ? pt : "",
			tab: (tb !== null && tb !== undefined) ? tb : "tab",
		};
	}

	componentDidUpdate(prevProps) {
		if (this.props.tabInput !== prevProps.tabInput) {
			this.setState({tab: this.props.tabInput});
		}
	}

	changeTextInput(event) {
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
		return (
			<div className={"searchComponentDiv altFull"+(this.props.isMainDiv ? " isMain" : "")}>
				<div className="textInputDiv">
					<input value={this.state.textInput} 
					onKeyPress={(e) => this.handleKeyPress(e)}
					onChange={(event) => this.changeTextInput(event)}
					name="textInput" className={this.props.alt ? "textInput altTextInput" : "textInput"} type="text"
					></input>
				</div>

				<div className="textInputDiv altDropdown">
					<select value={this.state.tab} onChange={(e) => this.handleTabChange(e)}>
						<option defaultValue value="topic">Topics</option>
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