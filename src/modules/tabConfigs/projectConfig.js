const tabName = "project";

const searchItems = "";
const urlName = "repositories";
const acceptHeader = "application/vnd.github.v3+json"
//https://docs.github.com/en/rest/reference/search#:~:text=Setting%20to%20application/vnd.github.v3%2Bjson%20is%20recommended.See%20preview%20notice

const queryOrder = ["textSearch", "stars", "helpWanted", "updated"];

const queryItems = {
	textSearch: {  //will be default 
		id: "textSearch",
		titleDict: {
			"min": "Search",
			"reg": "Search Keywords",
			"max": "Search Keywords",
		},
		type: "text",
		paramName: "textSearch",
		url: "?q=",
		required: true
	}, 
	stars: {
		id: "stars",
		titleDict: {
			"min": "Stars",
			"reg": "Sort By Stars",
			"max": "Order by star given to this project",
		},
		type: "sort",
		paramName: "stars",
		url: "&sort=stars&order="
	},
	helpWantedIssues: {
		id: "helpWantedIssues",
		titleDict: {
			"min": "Issues",
			"reg": "Sort By Issues",
			"max": "Order by Help Wanted Issues on the project",
		},
		type: "sort",
		paramName: "helpWantedIssues",
		url: "&sort=help-wanted-issues&order="
	},
	updated: {
		id: "updated",
		titleDict: {
			"min": "Issues",
			"reg": "Sort By Issues",
			"max": "Order by Help Wanted Issues on the project",
		},
		type: "sort",
		paramName: "updated",
		url: "&sort=updated&order="
	}

}

//const 

//query avaliable
	//name: {min, reg, max}
	//id
	//type
	//paramName
	//urlName
//query process
	//
//queryparams
//search components
//git url

//get info preprocess
//get info post
//get info special

//db
	//dbname
	//db strucutre
	//saved db sturcture
//display basic info
	//img
	//link 
	//details
//display expanded info
	//{title: content}

