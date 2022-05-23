const BASE_URL = "https://project-1-api.herokuapp.com";
const API_KEY = "5333cfb9-2926-49c0-b3e4-a759a4970ff9";
const apiKeyString = `?api_key=${API_KEY}`;
const getShowsEndpoint = `${BASE_URL}/showdates${apiKeyString}`;
let showsArray;

//get show data from API
function getShows() {
  axios.get(getShowsEndpoint).then((response) => {
    showsArray = response.data;

    renderShows(showsArray);

    //add style to selected card and remove when another is selected
    const allShowCards = document.querySelectorAll(".show-card");
    allShowCards.forEach((card) => {
      card.addEventListener("click", (event) => {
        allShowCards.forEach((card) => {
          card.classList.remove("show-card--selected");
        });
        card.classList.add("show-card--selected");
      });
    });
  });
}

//display show data on load
getShows();

//create show container
const main = document.querySelector("main");

const showsSection = createElementWithClass("div", "shows");

const showsContainer = createElementWithClass("div", "shows-container");

const showsTitle = createElementWithClass("h2", "shows-container__title");
showsTitle.innerHTML = "Shows";

const showsContainerInner = createElementWithClass(
  "div",
  "shows-container__inner"
);

const tabletLabelsContainer = createElementWithClass("div", "tablet-labels");

const dateLabel = createElementWithClass("p", "tablet-labels__label", "label");
dateLabel.innerHTML = "Date";

const venueLabel = createElementWithClass("p", "tablet-labels__label", "label");
venueLabel.innerHTML = "Venue";

const locationLabel = createElementWithClass(
  "p",
  "tablet-labels__label",
  "label"
);
locationLabel.innerHTML = "Location";

const showCards = createElementWithClass("div", "show-cards");

main.appendChild(showsSection);
showsSection.appendChild(showsContainer);
showsContainer.appendChild(showsTitle);
showsContainer.appendChild(showsContainerInner);

showsContainerInner.appendChild(tabletLabelsContainer);
showsContainerInner.appendChild(showCards);

tabletLabelsContainer.appendChild(dateLabel);
tabletLabelsContainer.appendChild(venueLabel);
tabletLabelsContainer.appendChild(locationLabel);

//display all shows on page from list
function renderShows(showsArray) {
  showsArray.forEach((show) => {
    //create each card
    const showCard = createElementWithClass("div", "show-card");

    //create date label with style
    const cardLabelDate = createElementWithClass(
      "h3",
      "label",
      "show-card__label"
    );
    cardLabelDate.innerText = "Date";

    //create date info with style
    const cardInfoDate = createElementWithClass("p", "show-card__info");
    cardInfoDate.innerText = changeDateFormat(show.date);

    //create venue label with style
    const cardLabelVenue = createElementWithClass(
      "h3",
      "label",
      "show-card__label"
    );
    cardLabelVenue.innerText = "Venue";

    //create venue info with style
    const cardInfoVenue = createElementWithClass("p", "show-card__info");
    cardInfoVenue.innerText = show.place;

    //create location label with style
    const cardLabelLocation = createElementWithClass(
      "h3",
      "label",
      "show-card__label"
    );
    cardLabelLocation.innerText = "Location";

    //create location info with style
    const cardInfoLocation = createElementWithClass("p", "show-card__info");
    cardInfoLocation.innerText = show.location;

    //create button with style
    const cardBtn = createElementWithClass("button", "show-card__button");
    cardBtn.innerText = "Buy Tickets";

    //append to parent
    showCards.appendChild(showCard);
    showCard.appendChild(cardLabelDate);
    showCard.appendChild(cardInfoDate);
    showCard.appendChild(cardLabelVenue);
    showCard.appendChild(cardInfoVenue);
    showCard.appendChild(cardLabelLocation);
    showCard.appendChild(cardInfoLocation);
    showCard.appendChild(cardBtn);
  });
}

function changeDateFormat(date) {
  return new Date(Number(date)).toDateString();
}

function createElementWithClass(elementName, className1, className2) {
  const element = document.createElement(elementName);
  element.classList.add(className1, className2);
  return element;
}
