'use strict'
//Get users array form localStorage
const userArray = [];
if (typeof(Storage) !== "undefined") {
    const Objs = getFromStorage ("USER_ARRAY");
    if(Objs !== null){
      for(let i = 0; i < Objs.length; i++){
        userArray.push(parseUser(Objs[i]));
      }
    }else console.log("No user data in local storage!");
    console.log(localStorage);
    console.log(userArray);
}else console.log("Sorry! No Web Storage support..");


//get element by ID from login page
const inputUserName = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const loginBtn = document.getElementById("btn-submit");

//Validate login form function
function Validate(inputUserName, inputPassword){
    if(inputUserName.value == "" || inputPassword.value == ""){
        alert("Please, input Username and Password");
    }else return true;
}

//Check the user is registered or not
function checkLogin(userArray){
    for(const obj of userArray){
        if(obj.userName === inputUserName.value && obj.Password === inputPassword.value){
            saveToStorage("USER", obj);
            return true;
        }
    }
    return false;
}

//Login button event
//Call login form validate function
//Check the user is registered or not
//Login completed and move the user to the index page
loginBtn.addEventListener("click", function(){
    if(Validate(inputUserName,inputPassword)){
        if(checkLogin(userArray)){
            alert(`Login completed.`);
            window.location.href = '../index.html';
        }else alert(`Username or Password Wrong !!!`);
    }
})

