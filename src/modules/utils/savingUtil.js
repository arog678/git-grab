import db from './database';

export default function saveItem(item, type) {
	const newItem = {
		//data: item,
		name: item.name,
		itemId: item.id,
		dateSaved: new Date().getTime(),
		type	
	};

	db.savedItems.put(newItem);
	db[type].put(item);
}