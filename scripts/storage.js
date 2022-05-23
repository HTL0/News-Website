'use strict'
//Save localStorage func
function saveToStorage (Key, Value){
    localStorage.setItem(Key, JSON.stringify(Value));
}

//Get data from localStorage
function getFromStorage(Key){
    const Obj = JSON.parse(localStorage.getItem(Key));
    return Obj;
}

//convert localStorage data to class instance
function parseUser(userData) {
	const user = new User(userData.firstName, userData.lastName, userData.userName, userData.Password, userData.pageSize, userData.Category);

	return user
}