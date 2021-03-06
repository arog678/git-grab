import db from './database';

export default async function loadSaved(options) {
	//need ro trim
	//all elements will be saved 
	//need to unsave
	//users 
	//projects
	//date saved sort
	//page
	//textSearch

	if (options.topic === undefined) options["topic"] = true;
	if (options.user === undefined) options["user"] = true;

	const typeList = []
	if (options.user) typeList.push("user");
	if (options.topic) typeList.push("topic");
	if (options.textSearch) options.textSearch = options.textSearch.toLowerCase();

	const filterFunc = (i) => {
		if (!typeList.includes(i.type)) return false;
		if (options.textSearch && !i.name.toLowerCase().includes(options.textSearch)) return false;
		return true
	};

	let savedItems = await db.savedItems.filter(filterFunc).toArray();
	
	if (options.dateSaved === "asc") {
		savedItems = savedItems.sort((a, b) => {
			return a.dateSaved - b.dateSaved
		});
	} else if (options.dateSaved === "desc") {
		savedItems = savedItems.sort((a, b) => {
			return b.dateSaved - a.dateSaved
		});
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

	const savedItemsOnPage = savedItems.slice(currentPageStart, currentPageStart + pageSize);

	const idList = savedItemsOnPage.reduce((arr, i) => {
		arr.push(i.itemId);
		return arr;
	}, []);

	let savedPage = [];

	if (options.topic) {
		const projects = await db.topic.where("id").anyOf(idList).toArray();
		savedPage = savedPage.concat(projects);
	}

	if (options.user) {
		const users = await db.user.where("id").anyOf(idList).toArray()
		savedPage = savedPage.concat(users);
	}

	const finalPage = [];
	for (const item of savedItemsOnPage) {
		const savedItem = savedPage.find(i => i.id === item.itemId);
		if (savedItem !== undefined) {//save error if true
			finalPage.push(savedItem); 
			savedItem["saved"] = true;
		}
	}

	return {items: finalPage, resp: {total_count: len}};

	
	
	
}