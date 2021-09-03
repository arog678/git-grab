//this is a general look at how continuing the project would like
//what if instead of implementing 2 searches all of them were implemented
//this is the general template for how that would work

//General template will be used more of as a builder function
//These are whats used as sort of templates

const tabName = "topic";

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

function basicDataCard(data) {
	return {
		img: {
			show: true,
			url: ["owner", "userImg"], //this is worng
			expand: false, //may implement in the future
			//size?
		},
		title: {
			show: true,
			content: <span><a href={data.url}>{data.name}</a><a href={data.owner.url}>{data.owner.name}</a></span>,
		},
		desc: {
			show: true,
			content: <span>{data.desc}</span>,
		}
	};
}

function dataCardDetailed(data) {
	return [
		{titile: "id", id:"id", content: <span>data.name</span>, show: false},
		{titile: "Name", id:"name", content: <span>(data.display_name === null ? data.name : data.display_name)</span>, show: true},
		{titile: "Url", id:"url", content: <span>"https://github.com/" + urlName + "/" + data.name</span>, show: true},
		{titile: "Created At", id:"createdAt", content: <span>data.created_at</span>, show: true},
		{titile: "Updated At", id:"updatedAt", content: <span>data.updated_at</span>, show: true},
		{titile: "Released", id:"released", content: <span>data.released</span>, show: true},
		{titile: "Description", id:"desc", content: <span>data.desc</span>, show: true},
		{title: "User-Name", id: "userName", content: <span>data.owner.login</span>, show: true},
		{title: "User-Link", id: "userLink", content: <span>data.owner.html_url</span>, show: true},
		{title: "UserImg", id: "userImg", content: <span>data.owner.avatar_url</span>, show: true},
		{titile: "Saved", id:"saved", content: false, show: false},
		{titile: "type", id:"type", content: "topic", show: false},
	];
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

