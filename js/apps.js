"use strict";

const elSpanResult = document.querySelector(".search-span");
const elBookmarkResult = document.querySelector(".bookmark-span");
const elFilmsList = document.querySelector(".list");
const elListBookmark = document.querySelector(".list-bookmark");
const elForm = document.querySelector(".form");
const elInput = document.querySelector(".input");
const elSelect = document.querySelector(".select");
const elButton = document.querySelector(".button");



elSpanResult.textContent = films.length;
const bookmarkedFilms  =[];
elSelect.innerHTML = null;

// Genres Select

const renderGenres = function(film){
  const unique = [];

  film.forEach(film => {
    film.genres.forEach(genre => {
      if(!unique.includes(genre)){
        unique.push(genre)
      }
    })
  })

  unique.forEach(element => {
    const newOption = document.createElement("option");

    newOption.textContent = element;
    newOption.value = element;

    elSelect.appendChild(newOption);
  })
}

// Input Value And Select Value Submit;

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  if(elInput.value) {
    elFilmsList.innerHTML = null;

    const inputValue = elInput.value;

    const findFilms = [];

    const inputValueFilms = films.find(film => film.title === inputValue);

    if(!findFilms.includes(inputValueFilms)){
      findFilms.push(inputValueFilms)
    }

    elSpanResult.textContent = findFilms.length;

    renderList(findFilms, elFilmsList);
  } else if(elSelect.value) {

    elFilmsList.innerHTML = null;

    const selectValue = elSelect.value;
    const filteredArr = [];

    films.forEach(film => {
      if(film.genres.includes(selectValue)){
        filteredArr.push(film)
      }
    })

    elSpanResult.textContent = filteredArr.length;

    renderList(filteredArr, elFilmsList)
  }

})

// Bookmark List;

const renderBookmarList = function(arr, htmlElement) {
  arr.forEach(film => {
    const newBookmarItem = document.createElement("li");
    const newBookmarImg = document.createElement("img");
    const newBookmarTitle = document.createElement("h3");
    const newBookmarWatch = document.createElement("a");
    const newBookmarBtn = document.createElement("button");

    newBookmarImg.setAttribute("src", film.poster)
    newBookmarTitle.textContent = film.title;
    newBookmarItem.setAttribute("class", "card card-body card-title");
    newBookmarWatch.textContent = "Watch Trailer";
    newBookmarWatch.setAttribute("class", "text-decoration-none btn btn-warning mb-2");
    newBookmarWatch.setAttribute("href", `https://www.youtube.com/watch?v=${film.id}`)
    newBookmarBtn.textContent = "Remove";
    newBookmarBtn.setAttribute("class", "btn btn-danger");

    newBookmarBtn.dataset.removeBtnId = film.id;

    htmlElement.appendChild(newBookmarItem);
    newBookmarItem.appendChild(newBookmarImg);
    newBookmarItem.appendChild(newBookmarTitle);
    newBookmarItem.appendChild(newBookmarWatch);
    newBookmarItem.appendChild(newBookmarBtn);
  })
}

elListBookmark.addEventListener("click", (evt) => {
  if (evt.target.matches(".btn-danger")){
    const removeBtnId = evt.target.dataset.removeBtnId;
    const findIndexRemove = bookmarkedFilms.findIndex(film => film.id === removeBtnId);

    elListBookmark.innerHTML = null;

    bookmarkedFilms.splice(findIndexRemove, 1);

    elBookmarkResult.textContent = bookmarkedFilms.length;

    renderBookmarList(bookmarkedFilms, elListBookmark)
  }
})

// Bookmark Click;

elFilmsList.addEventListener("click", (evt) => {
  if(evt.target.matches(".btn-bookmark")){
    const findBookmarkId = evt.target.dataset.bookmarkId * 1;
    const filterBookmark = films.find(todo => todo.id *1 === findBookmarkId);

    if(!bookmarkedFilms.includes(filterBookmark)){
      bookmarkedFilms.push(filterBookmark);
    }


      elListBookmark.innerHTML = null;

      elBookmarkResult.textContent = bookmarkedFilms.length;

      renderBookmarList(bookmarkedFilms, elListBookmark)
  }
})

const renderList = function(film, list){
  film.forEach(element => {
    const newItem = document.createElement("li");
    const newImg = document.createElement("img");
    const newDiv = document.createElement("div");
    const newTitle = document.createElement("h3");
    const newDesc = document.createElement("p");
    const newWatchBtn =document.createElement("a");
    const newBookmarkBtn = document.createElement("button");
    const newList = document.createElement("ul")


    newItem.style.width = "18rem";
    newItem.classList.add("card");
    newItem.classList.add("mt-5")
    newImg.setAttribute("src", element.poster);
    newWatchBtn.setAttribute("href", `https://www.youtube.com/watch?v=${element.id}`)
    newImg.classList.add("card-img-top");
    newDiv.classList.add("card-body");
    newTitle.classList.add("card-title");
    newDesc.classList.add("card-text");
    newWatchBtn.classList.add("btn")
    newWatchBtn.classList.add("btn-warning");
    newBookmarkBtn.classList.add("btn-bookmark");
    newBookmarkBtn.classList.add("btn");
    newBookmarkBtn.classList.add("btn-primary")
    newBookmarkBtn.classList.add("ms-3");
    newList.classList.add("mt-3");
    newList.classList.add("mb-3");
    newList.classList.add("list-unstyled");

    newBookmarkBtn.dataset.bookmarkId = element.id;


    newTitle.textContent = element.title;
    newDesc.textContent = element.overview;
    newWatchBtn.textContent = "Watch trieler";
    newBookmarkBtn.textContent = "Bookmark";


    element.genres.forEach(film => {
      const newGenresItem = document.createElement("li");

      newGenresItem.textContent = film;

      newGenresItem.style.fontSize = "18px";
      newGenresItem.style.fontWeight = "600";

      newList.appendChild(newGenresItem);
    })

    list.appendChild(newItem);
    newItem.appendChild(newImg);
    newItem.appendChild(newDiv)
    newDiv.appendChild(newTitle);
    newDiv.appendChild(newList)
    newDiv.appendChild(newDesc);
    newDiv.appendChild(newWatchBtn);
    newDiv.appendChild(newBookmarkBtn);
  })
}

renderList(films, elFilmsList);
renderGenres(films);
