import Dexie from 'dexie';

const db = new Dexie('myDb');
db.version(1).stores({
    project: `id, name, url, createdAt, updatedAt, desc, userImg, userName, userLink`,
	user: "id, name, url, createdAt, updatedAt, desc, userImg",
	savedItems: "++id, itemId, dateSaved, type, name"
});

export default db;

//userText: match this with what is in local db,
//dateSaved: order by date saved,
//nameRef: order by title,
//projectCheck: if this is true look for items that are projects
//userCheck: if this is true look for items that are users

//See if you can pull in a bunch of file based on ids first before saving everything
//may only need to create savedItemsDB

///gitDB
//name
//url
//createdAt
//updatedAt
//desc
//userImg
//userName
//userLink

///userDB
//name
//url
//createdAt
//updatedAt
//desc
//userImg

///savedItemsDB
//itemId
//dateSaved
//type

//put in past searches?
//put in favorite searches

//put this in files that will use saved
//import db from './mydatabase';
