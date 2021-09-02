import db from './database';

export async function saveItem(item, type) {
	const newItem = {
		//data: item,
		name: item.name,
		itemId: item.id,
		dateSaved: new Date().getTime(),
		type	
	};

	await db.savedItems.put(newItem);
	await db[type].put(item);
	return item;
}

export default async function pushSearchData(textSearch, params, type) {
	const findItems = await db[type].get({"textSearch": textSearch});
	const dbLen = await db[type].count();
	if ((findItems !== undefined && findItems !== null) || dbLen >= 10) {
		const dbArray = await db[type].toArray();
		let newArray = [{id: 1, textSearch, otherInfo: params}];
		let newID = 2;
		for (const item of dbArray) {
			if (newID > 10) continue;
			if (item.textSearch !== textSearch) {
				newArray.push(
					{id: newID, textSearch: item.textSearch, otherInfo: item.otherParams}
				);
				newID += 1;
			}
			
		}
		db[type].bulkPut(newArray);
	} else {
		db[type].put({textSearch, otherInfo: params});
	}
}

export function pushProjectSearchData(textSearch, params) {
	pushSearchData(textSearch, params, "recentProjectSearches");
}

export function pushUserSearchData(textSearch, params) {
	pushSearchData(textSearch, params, "recentUserSearches");
}
export function pushSavedSearchData(textSearch, params) {
	pushSearchData(textSearch, params, "recentSavedSearches");
}

