const add_cell = document.querySelector(".add_cell")
add_cell.addEventListener('click', addNewProject)

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let projects_counter = 0

function addNewProject() {
    const rand_num = getRandomInt(1, 1025)
    projects_counter += 1
    const cur_id = projects_counter
    add_cell.insertAdjacentHTML("beforebegin", "<div class=\"project_cell\" id=\"project_" + projects_counter + "\">\n" +
        "                                <div class=\"project_header\"> New Image </div>\n" +
        "                                <div class=\"loader-" + getRandomInt(3, 6) + " center\"><span></span></div>\n" +
        "                            </div>")
    fetch("https://picsum.photos/id/" + rand_num + "/info")
        .then(response => response.json())
        .then(json => {
            setTimeout(() => {
                const elem = document.getElementById("project_" + cur_id)
                elem.outerHTML = "<div class=\"project_cell\">\n" +
                    "                                <div class=\"project_header\">"  + json.author + "</div>\n" +
                    "                                <img src=https://picsum.photos/id/" + json.id + "/800/500>\n" +
                    "                            </div>"

                let xhr = new XMLHttpRequest();
                const site = new URL(document.location).origin
                xhr.open("POST", site + "/api/projects");

                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");

                let data = `{
                  "title": "${json.author}",
                  "backgroundImageUrl": "https://picsum.photos/id/${json.id}/800/500"
                }`;

                xhr.send(data);

                socket.emit('msgToServer', 'Project added!')
            }, getRandomInt(1, 3) * 1000)
        })
        .catch(() => {
            const elem = document.getElementById("project_" + cur_id)
            elem.outerHTML = "<div class=\"project_cell\">\n" +
                "                                <div class=\"project_header\"> Something went wrong </div>\n" +
                "                            </div>"
        })
}