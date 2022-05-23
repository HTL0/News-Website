'use strict'

//get element by ID from news page
const content = document.getElementById("news-container");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const pageNum = document.getElementById("page-num");

//Get the user data form localStorage
let user;
if (typeof(Storage) !== "undefined") {
    const Obj = getFromStorage ("USER");
    if(Obj !== null){
      //call convert data localStorage -> class instance function
      user = parseUser(Obj);
      //call render news page function
      btnStatus(pageNum);

    }else console.log("get User error");
    console.log(localStorage);
}else {console.log("Sorry! No Web Storage support..");}


//News page render function form page number
//check status of next button and previous button
//call api form getNew menthol of user 
function btnStatus(pageNum){
    user.getNew("jp", user.pageSize, user.Category, Number(pageNum.innerHTML), "830b457d706743e9b3af3662d9c2bbf6")
    .then(result => {
      let totalPage = parseInt(result.totalResults/5) + 1;
      if(pageNum.innerHTML == "1"){
        btnPrev.hidden = true;
        user.getNew("jp", user.pageSize, user.Category, 1, "830b457d706743e9b3af3662d9c2bbf6");
      }else if(Number(pageNum.innerHTML) >= totalPage){
        btnNext.hidden = true;
      }else {
      btnNext.hidden = false;
      btnPrev.hidden = false;
      }
    }).catch(err => { console.log(err);});
}

//Next button click event
btnNext.addEventListener("click", function(){
  pageNum.innerHTML = Number(pageNum.innerHTML) + 1 ;  
  btnStatus(pageNum);
})

//Previous button click event
btnPrev.addEventListener("click", function(){
  pageNum.innerHTML = Number(pageNum.innerHTML) - 1 ;  
  btnStatus(pageNum);
})

