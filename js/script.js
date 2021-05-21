/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

//Global variables
const itemsPerPage = 9;
const studentList = document.querySelector(".student-list");
const linkList = document.querySelector(".link-list");
const header = document.querySelector(".header");


function showPage(list, page) {
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = page * itemsPerPage;
   studentList.innerHTML = "";
 
   for (let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
         const studentItem = 
         `<li class="student-item cf">
            <div class="student-details">
               <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
               <h3>${list[i].name.first} ${list[i].name.last}</h3>
               <span class="email">${list[i].email}</span>
            </div>
            <div class="joined-details">
               <span class="date">Joined ${list[i].registered.date}</span>
            </div>
         </li>`;
         
         studentList.insertAdjacentHTML("beforeend", studentItem);
      }
   }
}

function addPagination(list) {
   const numOfPages = Math.ceil(list.length / itemsPerPage);
   linkList.innerHTML = "";
   
   for (let i = 1; i <= numOfPages; i++) {
      const button = 
      `<li>
         <button type="button">${i}</button>
      </li>`;
      
      linkList.insertAdjacentHTML("beforeend", button);
      const buttonClassName = document.querySelector(".link-list button");
      buttonClassName.className = "active";
   }
   
   linkList.addEventListener ("click", (e) => {
      const changeButton = e.target;

      if (changeButton.tagName === "BUTTON") {
         const prevActiveButton = document.querySelector("button.active");
         prevActiveButton.classList.remove("active");
         changeButton.className = "active";
         showPage(list, changeButton.textContent);
      }
   });
}

const searchBar = 
   `<label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>`;

header.insertAdjacentHTML("beforeend", searchBar);

function showSearchMatches(usersSearch, list) {
   const searchList = [];
   for (let i = 0; i < list.length; i++) {
      const fullName = `${list[i].name.first} ${list[i].name.last}`.toLowerCase();

      if (fullName.includes(usersSearch.toLowerCase())) {
         searchList.push(list[i]);
      }
   }
   return searchList;
}

function searchFunc(usersSearch) {
   const matchSearch = showSearchMatches(usersSearch, data);
   studentList.innerHTML = "";
   linkList.innerHTML = "";

   if (matchSearch.length === 0) {
      studentList.innerHTML = `<div><h2 style="font-size: 25px">Unfortunately, no results were found.</h2></div>`;
   }
   else {
      showPage(matchSearch, 1);
      addPagination(matchSearch);
   }
}

search.addEventListener("change", () => {
   search = document.querySelector("#search");
   searchFunc(search.value);
});

showPage(data, 1);
addPagination(data);