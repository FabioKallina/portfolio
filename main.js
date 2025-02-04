
// This will make navbar/header section update to higlight the active link as you scroll h
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");
let currentSection = "";

document.addEventListener("scroll", function() {
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
    
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            currentSection = section.getAttribute("id");
        }
    });
    
    navLinks.forEach((link) => {
        link.classList.remove("active");
        if(link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }
    });
});

// This will make navbar/header section update to highlight the active link when you click

navLinks.forEach(link => {
    link.addEventListener("click", function() {
        navLinks.forEach(link => link.classList.remove("active"));

        this.classList.add("active");
    });
});

// This makes it so that the navbar/header section has its own background color when you scroll through the sections

window.addEventListener("scroll", () => {
    const header = document.querySelector(".header");

    if(window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

//This makes each project in the project section a clickable link

document.getElementById("weather-app").addEventListener("click", function () {
    window.open("Projects/WeatherApp/index.html", "_blank");
  });
  
  document.getElementById("hangman").addEventListener("click", function () {
    window.open("Projects/HangMan/hangman.html", "_blank");
  });

  document.getElementById("rock-paper-scissors").addEventListener("click", function () {
    window.open("Projects/RockPaperScissors/RockPaperScissors.html", "_blank");
  });
  
  document.getElementById("bouncing-balls").addEventListener("click", function () {
    window.open("Projects/BouncingBalls/bouncing.html", "_blank");
  });

  document.getElementById("nutrition-info").addEventListener("click", function () {
    window.open("Projects/NutritionalDisplay/index.html", "_blank");
  });

  document.getElementById("toDo-list").addEventListener("click", function () {
    window.open("Projects/ToDoList/FrontEnd/index.html", "_blank");
  });

  document.getElementById("notes-app").addEventListener("click", function () {
    window.open("https://github.com/FabioKallina/NoteTakingApp", "_blank");
  });