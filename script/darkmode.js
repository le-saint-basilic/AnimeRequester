const main = document.getElementById("main");
const button = document.getElementById("bg-switch");

const mode = ["clair", "sombre"]

main.classList.add("light");
button.textContent = "Passer en mode sombre";

button.addEventListener("click", () => {
    main.classList.toggle("dark");
    main.classList.toggle("light");

    if (main.classList.contains("dark")) {
        button.textContent = "Passer en mode clair";
    } else {
        button.textContent = "Passer en mode sombre";
    }
});
