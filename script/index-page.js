const BASE_URL = "https://project-1-api.herokuapp.com";
const API_KEY = "5333cfb9-2926-49c0-b3e4-a759a4970ff9";
const apiKeyString = `?api_key=${API_KEY}`;
const getCommentsEndpoint = `${BASE_URL}/comments${apiKeyString}`;
let commentsArray;

function getComments() {
  axios.get(getCommentsEndpoint).then((response) => {
    commentsArray = response.data;
    //call the list of comments
    sortCommentsByDate(commentsArray);
    renderComments(commentsArray);
  });
}

const commentCards = document.querySelector(".comment-cards");

//remove all comments and re add with new comments if added or removed
function renderComments(commentsArray) {
  commentCards.innerHTML = "";
  //loop through comment list to display
  commentsArray.forEach((comment) => {
    //create comment card div with style
    const commentCardEl = document.createElement("div");
    commentCardEl.classList.add("comment-card");
    //create comment card image div with style
    const commentImageEl = document.createElement("div");
    commentImageEl.classList.add("comment-card__image");
    //create output div with style
    const commentOutputEl = document.createElement("div");
    commentOutputEl.classList.add("comment-card__output");
    //create info div with style
    const commentInfoEl = document.createElement("div");
    commentInfoEl.classList.add("comment-card__info");
    //create name p with style
    const commentNameEl = document.createElement("p");
    commentNameEl.classList.add("comment-card__name");
    commentNameEl.innerText = comment.name;
    //create date p with style
    const commentDateEl = document.createElement("p");
    commentDateEl.classList.add("comment-card__date");
    commentDateEl.innerText = changeTimeFormat(comment.timestamp);
    //create comment holder with style
    const commentHolderEl = document.createElement("div");
    commentHolderEl.classList.add("comment-card__comment");
    //create text p with style
    const commentTextEl = document.createElement("p");
    commentTextEl.classList.add("comment-card__text");
    commentTextEl.innerText = comment.comment;

    //append to parent
    commentCards.appendChild(commentCardEl);
    commentCardEl.appendChild(commentImageEl);
    commentCardEl.appendChild(commentOutputEl);

    commentOutputEl.appendChild(commentInfoEl);
    commentOutputEl.appendChild(commentHolderEl);

    commentInfoEl.appendChild(commentNameEl);
    commentInfoEl.appendChild(commentDateEl);
    commentHolderEl.appendChild(commentTextEl);
  });
}

const form = document.querySelector(".form-container__form");

form.addEventListener("submit", (event) => {
  //prevent page from reloading when form submits
  event.preventDefault();
  addComments(event.target.name.value, event.target.comment.value);
  //remove input text when form submits
  event.target.reset();
});

function addComments(name, comment) {
  axios
    .post(getCommentsEndpoint, {
      name,
      comment,
    })
    .then((response) => {
      console.log(response);
      getComments();

      axios.get(getCommentsEndpoint).then((response) => {
        commentsArray = response.data;
        sortCommentsByDate(commentsArray);
        commentCards.innerHTML = "";
        renderComments(commentsArray);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

//load list of comments when page first is loaded
getComments();

//sort comments by date
function sortCommentsByDate(array) {
  array.sort((commentA, commentB) => {
    return commentB.timestamp - commentA.timestamp;
  });
}

//change the time format
function changeTimeFormat(timestamp) {
  return new Date(timestamp).toLocaleDateString();
}
// function createElementWithClass(elementName, className) {
//   const element = document.createElement(elementName);
//   element.classList.add(className);
//   return element;
// }

// function createCommentCardElement() {
//   const commentCardEl = createElementWithClass("div", "comment-card");

//   return commentCardEl;
// }

// function createCardContent() {}
