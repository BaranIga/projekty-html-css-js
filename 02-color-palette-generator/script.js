// DOM: Pobranie przycisku generującego oraz kontenera palety
const generateBtn = document.getElementById("generate-btn");
const paletteContainer = document.querySelector(".palette-container");

// Kliknięcie przycisku = wywołanie funkcji generatePalette
generateBtn.addEventListener("click", generatePalette);

// Obsługa kliknięcia
paletteContainer.addEventListener("click", function (e) {
  // Kliknięcie ikony kopiowania
  if (e.target.classList.contains("copy-btn")) {
    const hexValue = e.target.previousElementSibling.textContent;

    navigator.clipboard
      .writeText(hexValue)
      .then(() => showCopySuccess(e.target))
      .catch((err) => console.log(err));

  // Kliknięcie pola koloru
  } else if (e.target.classList.contains("color")) {
    const hexValue = e.target.nextElementSibling.querySelector(".hex-value").textContent;

    navigator.clipboard
      .writeText(hexValue)
      .then(() => showCopySuccess(e.target.nextElementSibling.querySelector(".copy-btn")))
      .catch((err) => console.log(err));
  }
});

// Zmiana ikony kopiowania na zielony ptaszek na 1.5 sekundy
function showCopySuccess(element) {
  element.classList.remove("far", "fa-copy");
  element.classList.add("fas", "fa-check");
  element.style.color = "#48bb78";

  setTimeout(() => {
    element.classList.remove("fas", "fa-check");
    element.classList.add("far", "fa-copy");
    element.style.color = "";
  }, 1500);
}

// Generuje 5 losowych kolorów i wyświetla je
function generatePalette() {
  const colors = [];

  for (let i = 0; i < 5; i++) {
    colors.push(generateRandomColor());
  }

  updatePaletteDisplay(colors);
}

// Tworzy losowy kolor HEX, np. #A1B2C3
function generateRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}

// Wstawia kolory do kodu HTML: tło i wartość HEX
function updatePaletteDisplay(colors) {
  const colorBoxes = document.querySelectorAll(".color-box");

  colorBoxes.forEach((box, index) => {
    const color = colors[index];
    const colorDiv = box.querySelector(".color");
    const hexValue = box.querySelector(".hex-value");

    colorDiv.style.backgroundColor = color;
    hexValue.textContent = color;
  });
}

// Odkomentowane, aby paleta była generowana od razu po załadowaniu strony
generatePalette();
