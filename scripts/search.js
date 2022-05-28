'use strict';

const searchBtn = document.getElementById("btn-submit");
const inputQuery = document.getElementById("input-query");
const newsContainer = document.getElementById("news-container");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const pageNum = document.getElementById("page-num");
const navPageNum = document.getElementById("nav-page-num");
let user;



//Get the user data form localStorage
if (typeof(Storage) !== "undefined") {
    const Obj = getFromStorage ("USER");
    if(Obj !== null){
      //Call convert data localStorage -> class instance function
      user = parseUser(Obj);
    }else{
      alert("You need to login to use this page!");//check user login.
      window.location.href = '../pages/login.html';
    }
    console.log(localStorage);
}else {console.log("Sorry! No Web Storage support..");}

//Call search methol of the user
//check page number, hidden or appear next button to previous button
//Catch error and print console 
function searchRequest(Query, pageNum){
  user.search(Query, Number(pageNum.innerHTML), "830b457d706743e9b3af3662d9c2bbf6")
  .then(result =>{
    let totalPage = parseInt(result.totalResults/5) + 1;
    if(pageNum.innerHTML == "1"){
      btnPrev.hidden = true;
      // user.search(Query, 1, "830b457d706743e9b3af3662d9c2bbf6");
      renderRequest(result);
    }else if(Number(pageNum.innerHTML) >= totalPage){
      btnNext.hidden = true;
      renderRequest(result);
    }else{
      btnNext.hidden = false;
      btnPrev.hidden = false;
      renderRequest(result);
    }
  }).catch(error => console.log(error));
}

//Next button click event
//Call search methol of the user by searchRequest function
//Move scroll to top
btnNext.addEventListener("click", function(){
  pageNum.innerHTML = Number(pageNum.innerHTML) + 1 ;  
  searchRequest(inputQuery.value, pageNum);
  window.scrollTo(0,0);
})

//Previous button click event
//Call search methol of the user by searchRequest function
//Move scroll to top
btnPrev.addEventListener("click", function(){
  pageNum.innerHTML = Number(pageNum.innerHTML) - 1 ;  
  searchRequest(inputQuery.value, pageNum);
  window.scrollTo(0,0);
})

//render request into news container
function renderRequest(dataSearch){
  newsContainer.innerHTML = "";
      for(let i = 0; i < dataSearch.articles.length; i++){
        // console.log(dataSearch.articles[i]);
        const divTag = document.createElement("div");
        divTag.style = "height: 300px; margin-bottom: 25px; border: 1px groove black;";
        divTag.innerHTML = `<img style = "height: 300px; width:300px; float: left; margin-right: 20px" src= "${dataSearch.articles[i].urlToImage}" arl = "">
                           <h5>${dataSearch.articles[i].title}</h5>
                           <p>${dataSearch.articles[i].description}</p>
                           <button class="btn btn-primary" ><a href="${dataSearch.articles[i].url}" style = "color: white">View</a></button>`;
        newsContainer.appendChild(divTag);
      }
}

//Set nav page num hidden if not search
navPageNum.hidden = true;

//search button event
//Check inputed key word or not
//Reset page number 
//set nav page num appear
//Call search methol of the user by searchRequest function
searchBtn.addEventListener("click", function(){
  if(inputQuery.value !== ""){
    pageNum.innerHTML = 1;
    searchRequest(inputQuery.value, pageNum);
    navPageNum.hidden = false;
  }else alert("Please input search query !");
})

