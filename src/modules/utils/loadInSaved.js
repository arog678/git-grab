import db from './database';

export default async function loadSaved(options) {
	//users 
	//projects
	//date saved sort
	//page
	//textSearch

	const typeList = []
	if (options.user) typeList.push("user");
	if (options.project) typeList.push("project");

	const filterFunc = (i) => {
		console.log(i);
		if (!typeList.includes(i.type)) return false;
		console.log(i);
		if (!i.name.includes(options.textSearch)) return false;
		return true
	};

	console.log(await db.savedItems.filter(filterFunc).toArray());
	
	console.log(await db.savedItems.where("type").anyOf(typeList).toArray());
	let savedItems;
	
	if (options.dateSaved === undefined || options.dateSaved === "") 
		savedItems = await db.savedItems.filter(filterFunc).toArray();
	else if (options.dateSaved === "asc") 
		savedItems = await db.savedItems.filter(filterFunc).sortBy("dateSaved").toArray();
	else 
		savedItems = await db.savedItems.filter(filterFunc).reverse().sortBy("dateSaved").toArray();

	const pageSize = 30;
	const len = savedItems.length;
	const lastPage = Math.ceil(len/pageSize);

	let currentPage = 1;
	let currentPageStart = 0; //index = 1
	if (options.page !== undefined && options.page !== 1) {
		currentPage = Math.min(options.page, lastPage);
		currentPageStart = (currentPage - 1) * pageSize;
	}
	//let currentPageLen = pageSize; //index = 30
	//if ((currentPage * pageSize) > len) {
	//	currentPageLen = len;
	//}

	const savedItemsOnPage = savedItems.splice(currentPageStart, pageSize);

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