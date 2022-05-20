'use strict';

var form = document.getElementById("add_form");
function handleForm(event) {
    event.preventDefault();
    todo.add()
}
form.addEventListener('submit', handleForm);

const todo = {
    action: function action(e) {
        const target = e.target;

        if (target.classList.contains("todo__action")) {
            const action = target.dataset.todoAction;
            const elemItem = target.closest(".todo__item");
            const state = elemItem.dataset.todoState
            const id = elemItem.dataset.todoId
            if (action === "completed" && state === "active") {
                let xhr = new XMLHttpRequest();
                const site = new URL(document.location).origin
                xhr.open("PUT", site + "/api/todos/" + id, true);

                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");

                let data = `{
                        "state": "COMPLETED"
                     }`;
                xhr.send(data);

                elemItem.dataset.todoState = action
            }
            if (action === "deleted") {
                if (state === "deleted") {
                    let xhr = new XMLHttpRequest();
                    const site = new URL(document.location).origin
                    xhr.open("DELETE", site + "/api/todos/" + id, true);

                    xhr.setRequestHeader("Accept", "application/json");
                    xhr.setRequestHeader("Content-Type", "application/json");
                    xhr.send(null);

                    elemItem.remove()
                } else {
                    let xhr = new XMLHttpRequest();
                    const site = new URL(document.location).origin
                    xhr.open("PUT", site + "/api/todos/" + id, true);

                    xhr.setRequestHeader("Accept", "application/json");
                    xhr.setRequestHeader("Content-Type", "application/json");

                    let data = `{
                        "state": "DELETED"
                     }`;
                    xhr.send(data);

                    elemItem.dataset.todoState = action
                }
            }
            if (action === "active") {
                if (state !== "active") {
                    let xhr = new XMLHttpRequest();
                    const site = new URL(document.location).origin
                    xhr.open("PUT", site + "/api/todos/" + id, true);

                    xhr.setRequestHeader("Accept", "application/json");
                    xhr.setRequestHeader("Content-Type", "application/json");

                    let data = `{
                        "state": "ACTIVE"
                     }`;
                    xhr.send(data);

                    elemItem.dataset.todoState = action
                }
            }
        }
    },

    add: function add() {
        const elemText = document.querySelector(".todo__text");
        if (elemText.disabled || !elemText.value.length) {
            return;
        }
        const title = elemText.value;

        let xhr = new XMLHttpRequest();
        const site = new URL(document.location.origin)
        xhr.open("POST", site + "/api/todos", true);

        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json");

        let data = `{
                        "title": "${title}"
                     }`;

        xhr.responseType = 'json';
        xhr.onload  = function() {
            const jsonResponse = xhr.response;
            const buildHtml = function create(title, id) {
                  return '<li class="todo__item" data-todo-state="active" data-todo-id=\"'.concat(id, '\"><span class="todo__task">',
                    title, '</span><span class="todo__action todo__action_restore" data-todo-action="active"></span><span class="todo__action todo__action_complete" data-todo-action="completed"></span><span class="todo__action todo__action_delete" data-todo-action="deleted"></span></li>');
              };
            document.querySelector(".todo__items").insertAdjacentHTML("afterBegin", buildHtml(jsonResponse.title, jsonResponse.id));
            document.getElementById("todo_text_input").focus();
        };
        xhr.send(data);
        elemText.value = "";
    },
    init: function() {
        document.querySelector(".todo__options").addEventListener("change", this.update);
        document.addEventListener("click", this.action.bind(this));
    },
    update: function() {
        const option = document.querySelector(".todo__options").value;
        document.querySelector(".todo__items").dataset.todoOption = option;
        document.querySelector(".todo__text").disabled = option !== "active";
    }
};
todo.init();