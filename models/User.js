'use strict'

//Create class the User
 class User {
    constructor(firstName, lastName, userName, Password, pageSize, Category){
         this.firstName = firstName;
         this.lastName = lastName;
         this.userName = userName;
         this.Password = Password;
         //Set default value for pageSize and Category if value is undefined
         if(pageSize == "" || pageSize == undefined){
             this.pageSize = 5;
         }else {
             this.pageSize = pageSize;
         }
         if(Category !== undefined){
            this.Category = Category;
         }else{
            this.Category = "business";
         }
    }

//Change value of pageSize and Category 
    userSetting = function(pageSize, Category){
        this.pageSize = pageSize;
        this.Category = Category;
    }

//Get news from newsApi
getNew = async function(Country, Category, pageSize, Page, apiKey){
    try{
        const res = await fetch(`https://newsapi.org/v2/top-headlines?country=${Country}&category=${this.Category}&pageSize=${this.pageSize}&page=${Page}&apiKey=${apiKey}`);
        const data = await res.json();
        // console.log(data);
        content.innerHTML = "";
        for(let i = 0; i < data.articles.length; i++){
            // console.log(data.articles[i]);
            
            const divTag = document.createElement("div");
            divTag.style = "height: 300px; margin-bottom: 25px; border: 1px groove black;";
            divTag.innerHTML = `<img style = "height: 300px; width:300px; float: left; margin-right: 20px" src= "${data.articles[i].urlToImage}" arl = "">
                            <h5>${data.articles[i].title}</h5>
                            <p>${data.articles[i].description}</p>
                            <button class="btn btn-primary" ><a href="${data.articles[i].url}" style = "color: white">View</a></button>`;
            content.appendChild(divTag);
        }
        return data;
    } catch(err){
        console.error(err);
    }
}

//Search API form newsApi
search = async function(Query, Page, apiKey){
    try{
      const res = await fetch(`https://newsapi.org/v2/everything?q=${Query}&sortBy=popularity&pageSize=${this.pageSize}&page=${Page}&apiKey=${apiKey}`);
      const dataSearch = await res.json();
    //   console.log(dataSearch);
    //   newsContainer.innerHTML = "";
    //   for(let i = 0; i < dataSearch.articles.length; i++){
    //     // console.log(dataSearch.articles[i]);
    //     const divTag = document.createElement("div");
    //     divTag.style = "height: 300px; margin-bottom: 25px; border: 1px groove black;";
    //     divTag.innerHTML = `<img style = "height: 300px; width:300px; float: left; margin-right: 20px" src= "${dataSearch.articles[i].urlToImage}" arl = "">
    //                        <h5>${dataSearch.articles[i].title}</h5>
    //                        <p>${dataSearch.articles[i].description}</p>
    //                        <button class="btn btn-primary" ><a href="${dataSearch.articles[i].url}" style = "color: white">View</a></button>`;
    //     content.appendChild(divTag);
    //   }
      return dataSearch;
    }catch(error){
      console.log(error);
    }
  }
}

