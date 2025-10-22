const toggleBtn = document.getElementById("dark-mode-btn");

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});