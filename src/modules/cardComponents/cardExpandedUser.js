import { Component } from "react";
import CardDetailCell from "./cardDetailRow";
//import "../style/cardExpandedStyle.css"
import "../style/cardBasic.css";


class CardExpandedUser extends Component {
	
	constructor(props) {
		super(props);
		//props.name
		//props.url
		//props.created at
		//props.updated at
		//description
		//owner img
		//owner name
		//owner link
		this.state = {
			
		};

		//COMPONENT MOUNT FOR THIS
	}

	showLess() {
		this.props.hideItem(this.props.info);
	}

	saveObject() {
		this.props.saveObject(this.props.info);
	}

	showImgFunc() {
		const img = this.props.info.userImg;
		this.props.showImg(img);
	}




	render() {
		//change to load after get request
		if (this.props.info !== undefined) {
			const name = <span>{this.props.info.name}</span>;
			const username = <span>{this.props.info.username}</span>;
			const url = <span><a href={this.props.info.url}>{this.props.info.url}</a></span>;
			const userImg = <span><a href={this.props.info.userImg}>{this.props.info.userImg}</a></span>;
			const publicRepos = <span>{this.props.info.publicRepos}</span>;
			const publicGists = <span>{this.props.info.publicGists}</span>;
			const followers = <span>{this.props.info.followers}</span>;
			const following = <span>{this.props.info.following}</span>;
			const company = <span><a href={this.props.info.company}>{this.props.info.company}</a></span>;
			const blog = <span><a href={this.props.info.blog}>{this.props.info.blog}</a></span>;
			const email = <span>{this.props.info.email}</span>;
			const bio = <span>{this.props.info.bio}</span>;

			return (
				<div className="basicCardDetail">
					<div className="avatarDiv">
						<span><img alt={this.props.info.name} onClick={() => this.showImgFunc()} className="avatarImg" src={this.props.info.userImg}></img></span>
					</div>
					<div className="cardMain">
						<CardDetailCell title="Name" content={name}></CardDetailCell>
						<CardDetailCell title="username" content={username}></CardDetailCell>
						<CardDetailCell title="url" content={url}></CardDetailCell>
						<CardDetailCell title="userImg" content={userImg}></CardDetailCell>
						<CardDetailCell title="publicRepos" content={publicRepos}></CardDetailCell>
						<CardDetailCell title="publicGists" content={publicGists}></CardDetailCell>
						<CardDetailCell title="followers" content={followers}></CardDetailCell>
						<CardDetailCell title="following" content={following}></CardDetailCell>
						<CardDetailCell title="company" content={company}></CardDetailCell>
						<CardDetailCell title="blog" content={blog}></CardDetailCell>
						<CardDetailCell title="email" content={email}></CardDetailCell>
						<CardDetailCell title="bio" content={bio}></CardDetailCell>
						<div className="bottomButtons expanded">
							<button className="cardButton" onClick={() => this.showLess()}>show less</button>
						</div>
					</div>
				</div>
			)
		} else {
			return (
				<div className="cardDetailed">
					<span>LOADING</span>
				</div>
			);
		}
		
		
	}

}

export default CardExpandedUser;
