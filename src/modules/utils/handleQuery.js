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
	let http = "https://api.github.com/search/repositories?q=";
	const searchString = textSearch.replace(" ", "+");
	const isFeature = featured ? "+is:featured" : "";
	http = http + searchString + isFeature;

	const sortList = ["", "asc", "desc"];
	const nameSort = nameSortID !== 0 ? 
	"sort=name&order=" + sortList[nameSortID] : "";
	const createdAtSort = createdAtSortID !== 0 ? 
	"sort=created&order=" + sortList[createdAtSortID] : "";
	const sortString = "&sort=" + nameSort + createdAtSort;
	if (sortString !== "&sort=") {
		http = http + sortString;
	}
	if (page !== undefined && page !== null) http += "&page=" + page;
	return http;	
	
}


export async function projectQuery(paramsLocation) {
	const url = projectURL(paramsLocation);
	console.log(url)
	return await getHttpRequest(url, "project");

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
	if (type === "saved") return await savedQuery(paramsLocation);
	if (type === "project") return await projectQuery(paramsLocation);
	if (type === "user") return await userQuery(paramsLocation);
}




