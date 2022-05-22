const BASE_URL = "https://project-1-api.herokuapp.com";
const API_KEY = "5333cfb9-2926-49c0-b3e4-a759a4970ff9";
const apiKeyString = `?api_key=${API_KEY}`;
const getCommentsEndpoint = `${BASE_URL}/comments${apiKeyString}`;
let commentsArray;

//retrieve data from API and display on page
function getComments() {
  axios.get(getCommentsEndpoint).then((response) => {
    commentsArray = response.data;
    //sort data
    sortCommentsByDate(commentsArray);
    //display data
    renderComments(commentsArray);
  });
}

const commentCards = document.querySelector(".comment-cards");

//remove all comments and re add with new comments if added or removed
function renderComments(commentsArray) {
  commentCards.innerHTML = "";
  //loop through comment list to display
  commentsArray.forEach((comment) => {
    let commentCardEl = createCommentCardElement(comment);

    commentCards.appendChild(commentCardEl);
  });
}

const form = document.querySelector(".form-container__form");

form.addEventListener("submit", (event) => {
  //prevent page from reloading when form submits
  event.preventDefault();
  //add comments to page
  addComments(event.target.name.value, event.target.comment.value);
  //remove input text when form submits
  event.target.reset();
});

//add comments to API, retrieve them and display on page
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

//display list of comments when page first loads
getComments();

//create comment element with content
function createCommentCardElement(comment) {
  //create comment card div with style
  const commentCardEl = createElementWithClass("div", "comment-card");
  commentCards.appendChild(commentCardEl);

  //create comment card image div with style
  const commentImageEl = createElementWithClass("div", "comment-card__image");
  commentCardEl.appendChild(commentImageEl);

  //create output div with style
  const commentOutputEl = createElementWithClass("div", "comment-card__output");
  commentCardEl.appendChild(commentOutputEl);

  //create info div with style
  const commentInfoEl = createElementWithClass("div", "comment-card__info");
  commentOutputEl.appendChild(commentInfoEl);

  //create name p with style
  const commentNameEl = createElementWithClass("p", "comment-card__name");
  commentNameEl.innerText = comment.name;
  commentInfoEl.appendChild(commentNameEl);

  //create date p with style
  const commentDateEl = createElementWithClass("p", "comment-card__date");
  commentDateEl.innerText = changeDateFormat(comment.timestamp);
  commentInfoEl.appendChild(commentDateEl);

  //create comment holder with style
  const commentHolderEl = createElementWithClass(
    "div",
    "comment-card__comment"
  );
  commentOutputEl.appendChild(commentHolderEl);

  //create text p with style
  const commentTextEl = createElementWithClass("p", "comment-card__text");
  commentTextEl.innerText = comment.comment;
  commentHolderEl.appendChild(commentTextEl);

  return commentCardEl;
}

//function to create elements wit style
function createElementWithClass(elementName, className) {
  const element = document.createElement(elementName);
  element.classList.add(className);
  return element;
}

//sort comments by date
function sortCommentsByDate(array) {
  array.sort((commentA, commentB) => {
    return commentB.timestamp - commentA.timestamp;
  });
}

//change the date format
function changeDateFormat(timestamp) {
  return new Date(timestamp).toLocaleDateString();
}
