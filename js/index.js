//Burger
const body = document.querySelector("body");
const burgerMenu = document.querySelector(".burger-menu");
const navigation = document.querySelector(".navigation");
const navigationItem = document.querySelectorAll(".navigation-item");
let activeNavItem = document.querySelector(".active-nav");

navigationItem.forEach((element) => {
  element.addEventListener("click", function () {
    if (!element.classList.contains("active-nav")) {
      activeNavItem.classList.remove("active-nav");
      element.classList.add("active-nav");
      activeNavItem = element;
    }

    if (body.classList.contains("blocked")) {
      body.classList.remove("blocked");
      burgerMenu.classList.remove("active");
      navigation.classList.remove("show");
    }
  });
});

burgerMenu.addEventListener("click", () => {
  burgerMenu.classList.toggle("active");
  body.classList.toggle("blocked");
  navigation.classList.toggle("show");
});

navigation.addEventListener("click", (e) => {
  if (e.target.classList.contains("show")) {
    body.classList.remove("blocked");
    burgerMenu.classList.remove("active");
    navigation.classList.remove("show");
  }
});

//Pop up
const popup = document.querySelector(".popup");
const closePopupBtn = document.querySelector(".popup-close");
let name = document.querySelector(".popup-title");
let img = document.querySelector(".popup-pic");
let petType = document.querySelector(".pet-type");
let breed = document.querySelector(".breed");
let description = document.querySelector(".popup-info");
let age = document.querySelector(".popup-age");
let inoculations = document.querySelector(".popup-inoculations");
let diseases = document.querySelector(".popup-diseases");
let parasites = document.querySelector(".popup-parasites");

closePopupBtn.addEventListener("click", () => {
  popup.classList.remove("active");
  body.classList.remove("blocked");
});

popup.addEventListener("click", (e) => {
  if (e.target.classList.contains("active")) {
    popup.classList.remove("active");
    body.classList.remove("blocked");
  }
});

async function fillPopup() {
  const res = await fetch("./js/pets.json");
  const pets = await res.json();
  let petID = this.id;
  showPopup(pets, petID);
}

function showPopup(data, myID) {
  let petIndex;
  for (let i = 0; i < data.length; i++) {
    if (data[i].name.toLowerCase() === myID) {
      petIndex = i;
    }
  }

  let petObj = data[petIndex];

  name.innerHTML = petObj.name;
  img.src = petObj.img;
  petType.innerHTML = petObj.type;
  breed.innerHTML = petObj.breed;
  description.innerHTML = petObj.description;
  age.innerHTML = petObj.age;
  inoculations.innerHTML = petObj.inoculations.join(", ");
  diseases.innerHTML = petObj.diseases.join(", ");
  parasites.innerHTML = petObj.parasites.join(", ");
  popup.classList.add("active");
  body.classList.add("blocked");
}

popup.onmouseover = (e) => {
  if (e.target === e.currentTarget) closePopupBtn.classList.add("hovered");
};

popup.onmouseout = (e) => {
  if (e.target === e.currentTarget) closePopupBtn.classList.remove("hovered");
};