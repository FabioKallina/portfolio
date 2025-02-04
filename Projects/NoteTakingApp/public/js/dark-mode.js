
document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("dark-mode-toggle");
    const body = document.body;

    // Check if dark mode was previously enabled
    if (localStorage.getItem("dark-mode") === "enabled") {
        body.classList.add("dark-mode");
        toggleButton.textContent = "☀️ Light Mode"; // Change button text
    }

    toggleButton.addEventListener("click", () => {
        body.classList.toggle("dark-mode");

        // Store user preference
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("dark-mode", "enabled");
            toggleButton.textContent = "☀️ Light Mode";
        } else {
            localStorage.setItem("dark-mode", "disabled");
            toggleButton.textContent = "🌙 Dark Mode";
        }
    });
});