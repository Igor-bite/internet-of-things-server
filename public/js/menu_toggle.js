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

    if (site_location.includes("projects")) {
        changeActiveTo("your_projects");
    } else if (site_location.includes("prices")) {
        changeActiveTo("prices");
    } else {
        changeActiveTo("home");
    }

    // if (site_location.includes("account")) {
    //     changeActiveTo("account");
    // }
    // if (site_location.includes("contacts")) {
    //     changeActiveTo("contacts");
    // }
}