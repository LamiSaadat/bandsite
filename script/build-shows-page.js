const shows = [
  {
    date: "Mon Sept 06 2021",
    venue: "Ronald Lane",
    location: "San Francisco, CA",
  },
  {
    date: "Tue Sept 21 2021",
    venue: "Pier 3 East",
    location: "San Francisco, CA",
  },
  {
    date: "Fri Oct 15 2021",
    venue: "View Lounge",
    location: "San Francisco, CA",
  },
  {
    date: "Sat Nov 06 2021",
    venue: "Hyatt Agency",
    location: "San Francisco, CA",
  },
  {
    date: "Fri Nov 26 2021",
    venue: "Moscow Center",
    location: "San Francisco, CA",
  },
  {
    date: "Wed Dec 15 2021",
    venue: "Press Club",
    location: "San Francisco, CA",
  },
];

const showCards = document.querySelector(".show-cards");

//display all shows on page from list
shows.forEach((show) => {
  //create each card
  const showCard = document.createElement("div");
  showCard.classList.add("show-card");
  //create date label with style
  const cardLabelDate = document.createElement("h3");
  cardLabelDate.classList.add("label", "show-card__label");
  cardLabelDate.innerText = "Date";
  //create date info with style
  const cardInfoDate = document.createElement("p");
  cardInfoDate.classList.add("show-card__info");
  cardInfoDate.innerText = show.date;
  //create venue label with style
  const cardLabelVenue = document.createElement("h3");
  cardLabelVenue.classList.add("label", "show-card__label");
  cardLabelVenue.innerText = "Venue";
  //create venue info with style
  const cardInfoVenue = document.createElement("p");
  cardInfoVenue.classList.add("show-card__info");
  cardInfoVenue.innerText = show.venue;
  //create location label with style
  const cardLabelLocation = document.createElement("h3");
  cardLabelLocation.classList.add("label", "show-card__label");
  cardLabelLocation.innerText = "Location";
  //create location info with style
  const cardInfoLocation = document.createElement("p");
  cardInfoLocation.classList.add("show-card__info");
  cardInfoLocation.innerText = show.location;
  //create button with style
  const cardBtn = document.createElement("button");
  cardBtn.classList.add("show-card__button");
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

const allShowCards = document.querySelectorAll(".show-card");

//add style to selected card and remove when another is selected
allShowCards.forEach((card) => {
  card.addEventListener("click", (event) => {
    allShowCards.forEach((card) => {
      card.classList.remove("show-card--selected");
    });
    card.classList.add("show-card--selected");
  });
});
