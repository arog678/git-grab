import { Component } from "react";
import "../style/cardBasic.css";

class CardBasic extends Component {
	
	constructor(props) {
		super(props);
		//owner.avatar //do after mount
		// owner.login dtrupenn
		//name
		//"html_url" 
		//last update "updated_at"

		//created at "created_at
		const isSaved = this.props.info.saved || this.props.type === "saved";
		this.state = {
			isSaved
		};
	}

	saveObject(info) {
		console.log(info);
		this.props.saveObject(info);
		const isSaved = !this.state.isSaved;
		this.setState({isSaved});
	}

	showMore(info) {
		this.props.showMore(info);
	}

	showImgFunc() {
		const img = this.props.info.userImg
		this.props.showImg(img);
	}




	render() {
		//this.props.info for name and link stuff
		const info = this.props.info;
		return (
			<div className="basicCardDetail">
				<div className="avatarDiv">
				{(this.props.type === "user") ?
					<span><img onClick={() => this.showImgFunc()} alt={info.name} className="avatarImg" src={info.userImg}></img></span>
					:null}
				</div>
				<div className="cardMain cardInfoBasic">
					<div className="titleInfo">
						<span><a href={info.url}>{info.name}</a></span>
					</div>
					<div className="descDiv">
						<div className="descText">{info.desc}</div>
					</div>
					<div className="bottomButtons">
						{this.props.isLoading ? 
							<button className="cardButton">LOADING</button> :
							<button className="cardButton" onClick={() => this.showMore(info)}>Show More</button>
						}
						<button className={"cardButton" + (this.state.isSaved ? " saved" : "")} onClick={() => this.saveObject(info)}>{this.state.isSaved ? "Saved" : "Save"}</button>
					</div>
				</div>
				<div className="bottomDiv"></div>
			</div>
		)
	}

}

export default CardBasic;
