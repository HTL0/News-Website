#Hi, I’m LONG

This is News-Website with integrated todo list management feature

This project using HTML, CSS, BOOTSTRAP, API from "newsapi.org"(defalut location is Japan), JAVASCRIPT (OOP and Asynchronous)

This project has the following features:

- 1.Register

- 2.Login

- 3.Get news

- 4.Setting news change category

- 5.Todo list management

I use developer Plan $0 CORS enabled for localhost https://newsapi.org/pricing 
with key API is "830b457d706743e9b3af3662d9c2bbf6"

So this API works only in local host.
You need to create a local host environment before testing "get news feature" of this website.
Or not 426 error will appear. sorry about that...

## Implementation details
### 1. Class User: This class will include the following basic fields:
- firstName and lastName (username and last name)
- username
- password
### 2. Register: new user creation function
- To manage users, use an array called userArr, this array will contain Instances created from Class User
- save this userArray to localStorage
- Every time go to the Register page, will need to reload userArr from Localstorage.
- Click the Register button: Get input data from form, Call the validate function to check the form is valid, Initialize new user with valid data, Add user to array, save array to localStorage, Go to login screen.
- Validate the information entered by the user: No fields are left blank. Username cannot be the same as the Username of previous users. Password and Confirm Password must be the same. Password must be more than 8 characters.
### 3. Login: 
- This interface will include 2 fields: Username and Password. The user will enter the corresponding information and click Login. If the information entered matches the User already in the list, it means the login is successful, otherwise, an error message should be reported to the user.
- If the user is successfully logged in, it is necessary to save the current user information under LocalStorage, so that other sites can get data about the logged in user later. Then it will return to the Home page.
- validate the user has entered enough Username and Password.
- check whether the user is logged in or not, you have to save 1 more variable in localStorage, currentUser - to save logged in user information. On successful login will save currentUser to localStorage
### 4. Home Page:
- This will be the first interface displayed when the user accesses the application. This page will include 2 modes: If the user is not logged in, a screen with login and registration buttons should be displayed as follows, If the user is already logged in, a welcome message and a Logout button will be displayed.
- file index.html, In this interface will include two <div> with id login-modal and main-content. just check if the user is logged in and display the corresponding <div> tag.
### 5. Logout:
- When this button is clicked, simply delete the current User in Localstorage and return the user to the Login page
- Logout button click event, will delete current User in LocalStorage and return user to Login page.
### 6. Display news:
- To get the news data, it will be necessary to use an API from newsapi.org (https://newsapi.org/v2/top-headlines)
- This API will have parameters like country, category, pageSize, page, apiKey(Key for authentication, this is a required parameter to be able to use the API)
- Use the fetch function and call the API, note that this function will return a Promise, so need to use await, async to handle this asynchronously
- "Previous" or "Next" button to display the respective news, In the data returned from the API there will be a totalResults field - the maximum number of articles that the API can return, need use it.
### 7. Todo List
- Create a new Class Task to contain information about the Task in the Todo List. This class will include the following fields: task, owner, isDone
- Create a todoArr array to hold the symbolic Instances for each task. And save that data under LocalStorage.
- Every time the user clicks the button to add a new Todo, task: is taken from the input tag that the user enters, owner: Username will be taken according to the User currently logged into the system, isDone: When creating a new one, the default is false.
- Display task: get data from LocalStorage and display it as Template. Note: only show Tasks whose owner matches the current user's username.
- Toggle Task: clicking on a Task can mark that Task as completed or incomplete, this data is also updated to the corresponding LocalStorage.
- Delete Task: remove the corresponding task from the arr
### 8. Settings
- Can be set News per page and News Category
- update these 2 parameters for User, will also change the display for the News page with the corresponding settings.
### 9. Search
- Need to use Search API (https://newsapi.org/docs/endpoints/everything)
- Validate whether the user has entered a keyword or not. If not, display an error message.
