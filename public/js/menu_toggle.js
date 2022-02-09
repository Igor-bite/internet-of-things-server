const hamburger_menu = document.querySelector(".hamburger-menu");
const container = document.querySelector(".container");

hamburger_menu.addEventListener("click", () => {
    container.classList.toggle("active");
    container.classList.toggle("add_overflow")

    if (container.classList.contains("active")) {
        change();
    }
})

function changeActiveTo(active) {
    const home = document.getElementById("home");
    const projects = document.getElementById("your_projects");
    const prices = document.getElementById("prices");
    const account = document.getElementById("account");
    const contacts = document.getElementById("contacts");

    try { home.classList.remove("active"); }
    catch (err) {}
    try { projects.classList.remove("active"); }
    catch (err) {}
    try { prices.classList.remove("active"); }
    catch (err) {}
    try { account.classList.remove("active"); }
    catch (err) {}
    try { contacts.classList.remove("active"); }
    catch (err) {}

    document.getElementById(active).classList.add("active");
}

function change() {
    const site_location = new URL(document.location).pathname

    if (site_location === "/Web_ITMO_2021.github.io/projects.html") {
        changeActiveTo("your_projects");
    }
    if (site_location === "/Web_ITMO_2021.github.io/home.html") {
        changeActiveTo("home");
    }
    if (site_location === "/Web_ITMO_2021.github.io/prices.html") {
        changeActiveTo("prices");
    }
    // if (site_location === "/Web_ITMO_2021.github.io/account.html") {
    //     changeActiveTo("account");
    // }
    // if (site_location === "/Web_ITMO_2021.github.io/contacts.html") {
    //     changeActiveTo("contacts");
    // }
}