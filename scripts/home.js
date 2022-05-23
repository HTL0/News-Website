'use strict'

//Check browser has support localStorage
//Get the user data form localStorage
//Check the user logged or not, if the user logged show welcome message. not show login modal
if (typeof(Storage) !== "undefined") {
    const Obj = getFromStorage ("USER");
    if(Obj !== null){
      const user = parseUser(Obj);
      document.getElementById("login-modal").hidden = true;
      document.getElementById("welcome-message").innerHTML = `Welcome ${user.firstName}`;
    }else document.getElementById("main-content").hidden = true;
    console.log(localStorage);
}else console.log("Sorry! No Web Storage support..");

//Logout button event, bring the user back to the login page
document.getElementById("btn-logout").addEventListener("click", function(){
    localStorage.removeItem("USER");
    window.location.href = '../pages/login.html';
})