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

elFilmsList.addEventListener("click", (evt) => {
  if(evt.target.matches(".btn-bookmark")){
    const findBookmarkId = evt.target.dataset.bookmarkId * 1;
    const filterBookmark = films.find(todo => todo.id *1 === findBookmarkId);

    if(!bookmarkedFilms.includes(filterBookmark)){
      bookmarkedFilms.push(filterBookmark);
    }

    bookmarkedFilms.forEach(film => {

      elListBookmark.innerHTML = null;

      elBookmarkResult.textContent = bookmarkedFilms.length;

      renderList(bookmarkedFilms, elListBookmark);
    })
  }
})

elListBookmark.addEventListener("click", (evt) => {
  if (evt.target.matches(".btn-remove")){
    const removeBtnId = evt.target.dataset.removeBtn * 1;
    const findIndexRemove = bookmarkedFilms.findIndex(film => film.id *1 === removeBtnId);

    elListBookmark.innerHTML = null;

    console.log(findIndexRemove);

    bookmarkedFilms.splice(findIndexRemove, 1);

    elBookmarkResult.textContent = bookmarkedFilms.length;

    renderList(bookmarkedFilms, elListBookmark)
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
    const newRemoveBtn = document.createElement("button");
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
    newRemoveBtn.classList.add("btn-remove");
    newRemoveBtn.classList.add("btn");
    newRemoveBtn.classList.add("btn-danger");
    newRemoveBtn.classList.add("mt-3");
    newRemoveBtn.style.marginLeft = "80px";

    newBookmarkBtn.dataset.bookmarkId = element.id;
    newRemoveBtn.dataset.removeBtn = element.id;


    newTitle.textContent = element.title;
    newDesc.textContent = element.overview;
    newWatchBtn.textContent = "Watch trieler";
    newBookmarkBtn.textContent = "Bookmark";
    newRemoveBtn.textContent = "Remove"


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
    newDiv.appendChild(newRemoveBtn);
  })
}

renderList(films, elFilmsList);
renderGenres(films);

// elButton.addEventListener("click", () => {

//   const selectValue = elSelect.value;
//   console.log(selectValue);
// })