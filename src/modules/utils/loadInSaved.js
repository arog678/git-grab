import db from './database';

export default async function loadSaved(options) {
	//users 
	//projects
	//date saved sort
	//page
	//textSearch

	if (options.project === undefined) options["project"] = true;
	if (options.user === undefined) options["user"] = true;
	console.log(options);


	const typeList = []
	if (options.user) typeList.push("user");
	if (options.project) typeList.push("project");
	options.textSearch = options.textSearch.toLowerCase();

	const filterFunc = (i) => {
		console.log(i);
		if (!typeList.includes(i.type)) return false;
		console.log(i);
		if (!i.name.toLowerCase().includes(options.textSearch)) return false;
		console.log(i);
		return true
	};

	console.log(await db.savedItems.filter(filterFunc).toArray());
	
	console.log(await db.savedItems.where("type").anyOf(typeList).toArray());
	let savedItems = await db.savedItems.filter(filterFunc).toArray();
	
	if (options.dateSaved === "asc") {
		savedItems = savedItems.sortBy("dateSaved").toArray();
	} else if (options.dateSaved === "desc") {
		savedItems = savedItems.reverse().sortBy("dateSaved").toArray();
	}

	const pageSize = 30;
	const len = savedItems.length;
	const lastPage = Math.ceil(len/pageSize);

	let currentPage = 1;
	let currentPageStart = 0; //index = 1
	if (options.page !== undefined && options.page !== 1) {
		currentPage = Math.max(Math.min(options.page, lastPage), 1); //temp fix to page = 0 bug
		currentPageStart = (currentPage - 1) * pageSize;
	}
	//let currentPageLen = pageSize; //index = 30
	//if ((currentPage * pageSize) > len) {
	//	currentPageLen = len;
	//}

	console.log(options);
	console.log(savedItems);
	console.log(currentPageStart, pageSize);

	const savedItemsOnPage = savedItems.slice(currentPageStart, pageSize);

	const idList = savedItemsOnPage.reduce((arr, i) => {
		arr.push(i.itemId);
		return arr;
	}, []);

	console.log(idList);

	let savedPage = [];

	if (options.project) {
		const projects = await db.project.where("id").anyOf(idList).toArray();
		savedPage = savedPage.concat(projects);
		console.log(projects);
	}

	if (options.user) {
		const users = await db.user.where("id").anyOf(idList).toArray()
		console.log(users)
		savedPage = savedPage.concat(users);
	}

	const finalPage = [];
	for (const item of savedItemsOnPage) {
		const savedItem = savedPage.find(i => i.id === item.itemId);
		finalPage.push(savedItem);
	}

	return {items: finalPage, resp: {total_count: len}};

	
	
	
}