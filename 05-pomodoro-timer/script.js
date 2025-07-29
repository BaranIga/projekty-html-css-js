const timeDisplay = document.getElementById("time");
const startBtn = document.getElementById("start-btn");

const pomodoroBtn = document.getElementById("pomodoro-btn");
const shortBtn = document.getElementById("short-btn");
const longBtn = document.getElementById("long-btn");

// tworzenie obiektu durations z czasami trwania dla każdego trybu (w sekundach)
let durations = {
  pomodoro: 45 * 60,
  short: 5 * 60,
  long: 15 * 60
};

// tryb poczatkowy
let currentMode = "pomodoro";
// ustawia pozostały czas na czas przypisany do aktualnego trybu
let timeLeft = durations[currentMode];
// zmienna timer będzie przechowywać identyfikator setInterval
let timer = null;
// okreslenie czy timer aktualnie działa
let isRunning = false;

// funkcja obliczająca min i sek do timeLeft, formatująca je do MM:SS i aktualizująca tekst w timeDispaly
function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);  // Math.floor - zaokraglanie do dołu
  const seconds = timeLeft % 60;
  timeDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;  // padStart - gdy jest mniej niz 2 znaki to dodaje na poczatek "0"
}

// funckja zmiany trybu: ustawia nowy tryb, resetuje licznik do danego trybu, aktualizuje wyświetlacz, zatrzymuje licznik i restuje stan przycisku i isRunning
function switchMode(mode) {
  currentMode = mode;
  timeLeft = durations[mode];
  updateDisplay();
  clearInterval(timer);
  isRunning = false;
  startBtn.textContent = "START";
}

// nasłuchiwanie kliknięcia trybów i ustawianie odpowiedniegi trybu przez switchMode
pomodoroBtn.addEventListener("click", () => switchMode("pomodoro"));
shortBtn.addEventListener("click", () => switchMode("short"));
longBtn.addEventListener("click", () => switchMode("long"));

// obsluga klikniecia przycisku START/PAUSE
startBtn.addEventListener("click", () => {
  // jeżeli licznik NIE jest uruchomiony
  if (!isRunning) {
    // odliczanie co sekundę i zmniejszanie timeLeft analizując wyświetlacz
    timer = setInterval(() => {
      timeLeft--;
      updateDisplay();
      // gdy czas się skończy: licznik się zatrzymuje, reset isRunning i przywrócenie przycisku "START"
      if (timeLeft <= 0) {
        clearInterval(timer);
        isRunning = false;
        startBtn.textContent = "START";
      }
    }, 1000);
    // gdy licznik jest uruchomiony, zamiana przycisku na "PAUSE" i isRunning na true
    startBtn.textContent = "PAUSE";
    isRunning = true;
  } else {
    // jeżeli timer już dziła to nastepuje zatrzymanie go i przywrócenie do "START"
    clearInterval(timer);
    startBtn.textContent = "START";
    isRunning = false;
  }
});

// po załadowaniu strony od razy wyświetla czas poczatkowy
updateDisplay();



// aktywny przycisk
function updateActiveButton(clickedButton) {
  // Usuwa klasę "active" ze wszystkich przycisków
  document.querySelectorAll(".mode-btn").forEach(btn => {
    btn.classList.remove("active");
  });
  // Dodaje ją tylko do klikniętego przycisku
  clickedButton.classList.add("active");
}

pomodoroBtn.addEventListener("click", () => {
  switchMode("pomodoro");
  updateActiveButton(pomodoroBtn);
});

shortBtn.addEventListener("click", () => {
  switchMode("short");
  updateActiveButton(shortBtn);
});

longBtn.addEventListener("click", () => {
  switchMode("long");
  updateActiveButton(longBtn);
});
