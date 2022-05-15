//default comments when page loads
const commentsList = [
  {
    name: "Connor Walton",
    date: "02/17/2021",
    text: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
  },
  {
    name: "Emilie Beach",
    date: "01/09/2021",
    text: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
  },
  {
    name: "Miles Acosta",
    date: "12/20/2020",
    text: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
  },
];

const commentCards = document.querySelector(".comment-cards");

function renderComments() {
  commentCards.innerHTML = "";

  //loop through comment list to display
  commentsList.forEach((comment) => {
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
    commentDateEl.innerText = comment.date;
    //create comment holder with style
    const commentHolderEl = document.createElement("div");
    commentHolderEl.classList.add("comment-card__comment");
    //create text p with style
    const commentTextEl = document.createElement("p");
    commentTextEl.classList.add("comment-card__text");
    commentTextEl.innerText = comment.text;

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

//add new comment to coment lists and show comment on page
function displayComment(newComment) {
  //add comment to top of comment list
  commentsList.unshift(newComment);
  renderComments();
}

const form = document.querySelector(".form-container__form");

form.addEventListener("submit", (event) => {
  //prevent page from reloading when form submits
  event.preventDefault();

  //display live comment
  displayComment({
    name: event.target.name.value,
    text: event.target.comment.value,
    date: new Date().toLocaleDateString(),
  });

  //remove input text when form submits
  event.target.reset();

  //render comment to page
  // renderComments();
});

renderComments();
