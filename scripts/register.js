'use strict';

//Get users array form localStorage
const userArray = [];
if (typeof(Storage) !== "undefined") {
    const Objs = getFromStorage ("USER_ARRAY");
    if(Objs !== null){
      for(let i = 0; i < Objs.length; i++){
        userArray.push(parseUser(Objs[i]));
      }
    }else console.log("local storage none user data!");
    console.log(userArray);
    }else console.log("Sorry! No Web Storage support..");

//get element by ID from register page
const inputFirstName = document.getElementById("input-firstname");
const inputLastName = document.getElementById("input-lastname");
const inputUserName = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const inputPasswordConfirm = document.getElementById("input-password-confirm");
const registerBtn = document.getElementById("btn-submit");

//Check the user already exists function
function checkUserNameExited(userArray){
    for(const obj of userArray){
        if(obj.userName === inputUserName.value) return true;
    }
}

//Valadate register form function
//Call Check the user already exists function
function Validate(inputFirstName, inputLastName, inputUserName, inputPassword, inputPasswordConfirm){
    const regex = '^[a-z0-9_-]{8,}$'; //Check password "over 8 characters with uppercase, lowercase and number" with regex
    if(inputFirstName.value == "" || inputLastName.value == "" || inputUserName.value == "" || inputPassword.value == "" || inputPasswordConfirm.value == ""){
        alert("Please, input into form register !");
    }else if(checkUserNameExited(userArray)){
        alert("Username has exited !");
    }else if(!(inputPassword.value === inputPasswordConfirm.value)){
        alert("The password and confirmation password do not match !");
    }else if(!(inputPassword.value.match(regex))){
        alert("Password needs more than 8 characters !");
    }else{
        return true;
    }
}

//submit button event
//call validate function
//Add the user instance into user array
//Save the user array into localStorage
//Move the user to the login page 
registerBtn.addEventListener("click", function(){
    if(Validate(inputFirstName, inputLastName, inputUserName, inputPassword, inputPasswordConfirm)){
        const userData = {
            firstName: inputFirstName.value,
            lastName: inputLastName.value,
            userName: inputUserName.value,
            Password: inputPassword.value,
        }

        userArray.push(parseUser(userData));
        saveToStorage("USER_ARRAY", userArray);
        console.log(userArray);
        window.location.href = '../pages/login.html';
    }
})

