import { Component } from "react";
import "./style/pageTrack.css"

class PageTrack extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			currentPage: 1
		};
	}

	atEnd() {
		const currentPage = this.props.currentPage + "";
		const lastPage = this.props.lastPage + "";
		return currentPage === lastPage;
	}

	atStart() {
		const currentPage = this.props.currentPage;
		return currentPage === 1;
	}


	//change state to props here
	firstPage(page) {
		if (!this.atStart()) return 1;
		else return null;
	}

	prevPage(page) {
		if (!this.atStart()) return page - 1;
		else return null;

	}

	nextPage(page) {
		if (!this.atEnd()) return page + 1;
		else return null;
	}

	lastPage(page) {
		if (!this.atEnd()) return this.props.lastPage;
		else return null;
	}

	movePage(moveRef) {
		const params = new URLSearchParams(this.props.history.location.search);
		const paramPage = params.get("page")
		let page = paramPage;
		if (page === undefined || page === null) page = 1;
		else page = parseInt(paramPage);
		const pageDict = {
			"first": 1,
			"prev": Math.max(1, (page - 1)),
			"next": Math.min(this.props.lastPage, (page + 1)),
			"last": this.props.lastPage
		}
		const pageNum = pageDict[moveRef];
		let path = this.props.history.location.search

		if (paramPage !== undefined && paramPage !== null) {
			const pageOld = "&page=" + paramPage;
			const pageNew = "&page=" + pageNum;
			path = path.replace(pageOld, pageNew);
		} else {
			const pageNew = "&page=" + pageNum;
			path = path + pageNew;
		}
		window.scrollTo(0, 0);

		this.props.history.push(path);
		
	}


	render() {
		const currentPage = this.props.currentPage;
		const lastPage = this.props.lastPage;

		const atStart = this.atStart();
		const atEnd = this.atEnd();
		const turnBackClass = atStart ? "pageButton disableClick" : "pageButton";
		const turnNextClass = atEnd ? "pageButton disableClick" : "pageButton";

		
		return (
			<div >
				<div className="pageDiv noSelect">
					<div onClick={() => this.movePage("first")} className={turnBackClass}>First</div>
					<div onClick={() => this.movePage("prev")} className={turnBackClass}>Prev</div>
					<div className="pageButton">{currentPage}/{lastPage}</div>
					<div onClick={() => this.movePage("next")} className={turnNextClass}>Next</div>
					<div onClick={() => this.movePage("last")} className={turnNextClass}>Last</div>
				</div>
				<div className="bottomGap"></div>
			</div>
		)
	}


}

export default PageTrack;