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
		this.state = {
			
		};
	}

	saveObject(info) {
		console.log(info);
		this.props.saveObject(info);
	}

	showMore(info) {
		this.props.showMore(info);
	}



	render() {
		//this.props.info for name and link stuff
		const info = this.props.info;
		//console.log(info);
		return (
			<div className="basicCardDetail">
				<div className="avatarDiv">
					<span><img alt={info.name} className="avatarImg" src={info.userImg}></img></span>
				</div>
				<div className="cardMain cardInfoBasic">
					<div className="titleInfo">
						{(this.props.type === "project") ?
							<span><a href={info.url}>{info.name}</a> - <a href={info.userLink}>{info.userName}</a></span> : 
							<span><a href={info.url}>{info.name}</a></span>
						}
					</div>
					<div className="descDiv">
						<div className="descText">{info.desc}</div>
					</div>
					<div className="bottomButtons">
						{this.props.isLoading ? 
							<button className="cardButton">LOADING</button> :
							<button className="cardButton" onClick={() => this.showMore(info)}>Show More</button>
						}
						<button className="cardButton" onClick={() => this.saveObject(info)}>Save</button>
					</div>
				</div>
				<div className="bottomDiv"></div>
			</div>
		)
	}

}

export default CardBasic;
