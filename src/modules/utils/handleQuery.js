import db from './database';
import { getHttpRequest } from "./getGitHttp";
import  loadSaved  from "./loadInSaved";

export function userURL(paramsLocation) {
	const params = new URLSearchParams(paramsLocation);
	const textSearch = params.get('textSearch');
	const followerSort = parseInt(params.get('followerSort'));
	const repositorsSortID = parseInt(params.get('repositorsSort'));
	const joinedSortID = parseInt(params.get('joinedSort'));
	const page = params.get("page");

	console.log(joinedSortID);
	
	let http = "https://api.github.com/search/users?q=";
	const searchString = textSearch.replace(" ", "+");
	http = http + searchString;

	const sortList = ["", "asc", "desc"];
	const followSort = (followerSort !== 0) ? 
	"&sort=followers&order=" + sortList[followerSort] : "";
	const repositorsSort = repositorsSortID !== 0 ?
	"&sort=repositories&order=" + sortList[repositorsSortID] : "";
	const joinedSort = joinedSortID !== 0 ?
	"&sort=joined&order=" + sortList[joinedSortID] : "";

	const sortString = followSort + repositorsSort + joinedSort;
	if (sortString !== "&") {
		http = http + sortString;
	} else {
		http = http + "&sort=joined&order=desc"
	}
	if (page !== undefined && page !== null) http += "&page=" + page;
	console.log(http);
	return http;
	
}

export async function userQuery(paramsLocation) {
	const url = userURL(paramsLocation);
	console.log(url);
	return await getHttpRequest(url, "user");

}


export function projectURL(paramsLocation) {

	const params = new URLSearchParams(paramsLocation);
	const textSearch = params.get('textSearch');
	const featured = params.get('featured');
	const createdAtSortID = parseInt(params.get('createdAtSort'));
	const nameSortID = parseInt(params.get('nameSort'));
	const page = params.get("page");
	console.log(params);
	console.log(page);

	//const searchParams = this.getCurrentSearchParams();
	let http = "https://api.github.com/search/topics?q=";
	const searchString = textSearch.replace(" ", "+");
	const isFeature = featured ? "+is:featured" : "";
	http = http + searchString + isFeature;

	const sortList = ["", "asc", "desc"];
	const nameSort = nameSortID !== 0 ? 
	"&sort=name&order=" + sortList[nameSortID] : "";
	const createdAtSort = createdAtSortID !== 0 ? 
	"&sort=created&order=" + sortList[createdAtSortID] : "";
	const sortString = "" + nameSort + createdAtSort;
	if (sortString !== "") {
		http = http + sortString;
	}
	if (page !== undefined && page !== null) http += "&page=" + page;
	return http;	
	
}


export async function projectQuery(paramsLocation) {
	let url = projectURL(paramsLocation);

	const params = new URLSearchParams(paramsLocation);
	const requestPageSize = 100;
	const dispayPageSize = 25;
	let pageNum = params.get("page");
	let currentPage = 1;
	let pageSection = 1;
	let requestPageNum = 1;
	let requestIndex = 1;
	if (pageNum !== null) {
		requestIndex = (pageNum - 1) * dispayPageSize;
		requestPageNum = Math.floor((requestIndex/requestPageSize)) + 1;
		console.log(requestPageNum);
		url = url.replace(("&page=" + pageNum), ("&page=" + requestPageNum));
	} else {
		pageNum = 1;
	}

	//projectQuery.set("page", requestPageNum);

	console.log(params.get("featured"))
	url = url + "&per_page=100";

	//this is to fix that screw up
	const topicsRequest = await getHttpRequest(url, "project");
	topicsRequest["pageNum"] = pageNum;

	const indexStart = ((pageNum - 1) * dispayPageSize) % 100;
	let indexEnd = ((pageNum) * dispayPageSize) % 100;
	if (indexEnd === 0) indexEnd = 100;
	console.log(pageNum, indexStart, indexEnd, topicsRequest);
	if (topicsRequest["items"] !== undefined && topicsRequest["items"] !== null) {
		//sort 1 === asc 
		//sort 2 === desc
		const sortFunc = (sortParamName) => {
			const sortParam = params.get(sortParamName);
			if (sortParam !== undefined && sortParam !== null && sortParam !== "0") {
				console.log(sortParam, topicsRequest["items"][0], topicsRequest["items"][1]);
				console.log(sortParam === "1");
				topicsRequest["items"].sort((a, b) => {
					const aName = a.name.toLowerCase();
					const bName = b.name.toLowerCase();
					const nameCompare = (aName < bName ? 1 : -1);
					console.log(a,b,nameCompare);
					return (sortParam === "1" ? nameCompare : !nameCompare);
				});

			}
		};
		sortFunc("nameSort");
		sortFunc("createdAtSort")

	} 
	topicsRequest["items"] = topicsRequest["items"].slice(indexStart, indexEnd);



	
	return topicsRequest;

}

export async function savedQuery(paramsLocation) {

	const params = new URLSearchParams(paramsLocation);

	const options = {
		page: params.get("page"),
		textSearch: params.get("textSearch"),
		dateSaved: params.get("dateSaved"),
		projectCheck: params.get("projectCheck"),
		userCheck: params.get("userCheck"),
	}

	return await loadSaved(options);	
}

export async function queryMain(paramsLocation, type) {
	console.log(type);
	if (type === "saved") return await savedQuery(paramsLocation);
	if (type === "project") return await projectQuery(paramsLocation);
	if (type === "user") return await userQuery(paramsLocation);
}




