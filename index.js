const cities = [];
let speed = 2000;
let imageInterval = null;

class City {
  constructor({ name, country, population, imageUrl }) {
    this.name = name;
    this.country = country;
    this.population = population;
    this.imageUrl = imageUrl;
  }
}

const loadParagraph = (textContent) => {
  const container = document.querySelector(".display-box");
  const element = document.createElement("p");
  element.textContent = textContent;
  container.appendChild(element);
};

const loadImage = () => {
  const container = document.querySelector(".display-box");

  container.innerHTML = "";

  const generatedIndex = Math.floor(Math.random() * cities.length);
  const city = cities[generatedIndex];

  if (city.imageUrl) {
    const img = document.createElement("img");
    img.src = city.imageUrl;
    container.appendChild(img);
  } else {
    loadParagraph("No image available for this city.");
  }

  loadParagraph(`City name: ${city.name} `);
  loadParagraph(`Country: ${city.country}`);
  loadParagraph(`Population: ${city.population}`);
};

const displayImage = () => {
  imageInterval = setInterval(() => {
    loadImage();
  }, speed);
};

const form = document.querySelector("#mainForm");
const boxForm = document.querySelector("#boxForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.querySelector("#name");
  const country = document.querySelector("#country");
  const population = document.querySelector("#population");
  const imageUrl = document.querySelector("#imageUrl");

  cities.push(
    new City({
      name: name.value,
      country: country.value,
      population: population.value,
      imageUrl: imageUrl.value,
    })
  );

  //Will only trigger once
  if (!imageInterval) {
    //Initially load image
    loadImage();

    //Trigger the Interval of Images
    displayImage();

    //Will make the speed form visible
    boxForm.style.display = "unset";
  }

  form.reset();
  name.focus();
});

const speedCounter = document.querySelector("#speedCounter");
speedCounter.value = speed;

boxForm.addEventListener("submit", (e) => {
  e.preventDefault();
  speed = speedCounter.value;
  clearInterval(imageInterval);
  displayImage();
});
