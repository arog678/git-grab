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
		const currentPage = this.props.currentPage;
		const lastPage = this.props.lastPage;
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

	movePage(callback) {
		const params = new URLSearchParams(this.props.location.search);
		const paramPage = params.get("page")
		let page = paramPage;
		if (page === undefined) page = 1;
		const pageNum = callback(page);
		if (paramPage !== undefined) {
			const pageOld = "page=" + paramPage;
			const pageNew = "page=" + pageNum;
			this.props.history.location.search.replace(pageOld, pageNew);
		}
		const path = this.props.history.location.search + this.props.history.location.search
		this.props.history.push(path);
		

	}




	render() {
		const pageItems = [];
		const currentPage = this.props.currentPage;
		const lastPage = this.props.lastPage;

		const atStart = this.atStart();
		const atEnd = this.atEnd();
		const turnBackClass = atStart ? "pageButton disableClick" : "pageButton";
		const turnNextClass = atEnd ? "pageButton disableClick" : "pageButton";

		pageItems.push(<div onClick={() => this.firstPage()} className={turnBackClass}>First</div>);
		pageItems.push(<div  onClick={() => this.prevPage()} className={turnBackClass}>Prev</div>);
		pageItems.push(<div className="pageButton">{currentPage}/{lastPage}</div>);
		pageItems.push(<div onClick={() => this.nextPage()} className={turnNextClass}>Next</div>);
		pageItems.push(<div onClick={() => this.lastPage()} className={turnNextClass}>Last</div>);

		
		return (
			<div >
				<div className="pageDiv">
					{pageItems}
				</div>
			</div>
		)
	}


}

export default PageTrack;