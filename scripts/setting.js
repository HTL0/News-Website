'use strict'
//Get element by ID from setting page
const inputPageSize = document.getElementById("input-page-size");
const inputCategory = document.getElementById("input-category");
const settingBtn = document.getElementById("btn-submit");
let user;

//Get the user data form localStorage
if (typeof(Storage) !== "undefined") {
    const Obj = getFromStorage ("USER");
    if(Obj !== null){
      //Call convert data localStorage -> class instance function
      user = parseUser(Obj);
    }else console.log("get User error");
    console.log(localStorage);
}else {console.log("Sorry! No Web Storage support..");}

//Setting button event, check page size inputed or not
//Call the user setting function
//Save setting value into localStorage
//Move the user to the news page
settingBtn.addEventListener("click", function(){
  if(inputPageSize.value !== ""){
    user.userSetting(inputPageSize.value, inputCategory.value);
    saveToStorage("USER", user);
    window.location.href = '../pages/news.html';
  }else alert("please input News per page !");
})