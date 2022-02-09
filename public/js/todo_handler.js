'use strict';

var form = document.getElementById("add_form");
function handleForm(event) {
    event.preventDefault();
    todo.add()
}
form.addEventListener('submit', handleForm);

var todo = {
    action: function action(e) {
        var target = e.target;
        if (target.classList.contains("todo__action")) {
            var action = target.dataset.todoAction;
            var elemItem = target.closest(".todo__item");
            if (action === "deleted" && elemItem.dataset.todoState === "deleted") {
                elemItem.remove();
            } else {
                elemItem.dataset.todoState = action;
            }
            this.save();
        }
    },

    add: function add() {
        const elemText = document.querySelector(".todo__text");
        if (elemText.disabled || !elemText.value.length) {
            return;
        }
        document.querySelector(".todo__items").insertAdjacentHTML("afterBegin", this.create(elemText.value));
        elemText.value = "";
        this.save();
        document.getElementById("todo_text_input").focus();
    },
    create: function create(text) {
        return '<li class="todo__item" data-todo-state="active"><span class="todo__task">'.concat(
            text, '</span><span class="todo__action todo__action_restore" data-todo-action="active"></span><span class="todo__action todo__action_complete" data-todo-action="completed"></span><span class="todo__action todo__action_delete" data-todo-action="deleted"></span></li>');
    },
    init: function() {
        var fromStorage = localStorage.getItem("todo");
        if (fromStorage) {
            document.querySelector(".todo__items").innerHTML = fromStorage;
        }
        document.querySelector(".todo__options").addEventListener("change", this.update);
        document.addEventListener("click", this.action.bind(this));
    },
    update: function() {
        var option = document.querySelector(".todo__options").value;
        document.querySelector(".todo__items").dataset.todoOption = option;
        document.querySelector(".todo__text").disabled = option !== "active";
    },
    delete: function () {
        localStorage.removeItem("todo");
        document.querySelector(".todo__items").innerHTML = ""
    },
    save: function() {
        try {
            localStorage.setItem(
                "todo",
                document.querySelector(".todo__items").innerHTML
            );
        } catch (e) {
            if (e == QUOTA_EXCEEDED_ERR) {
                alert("Превышен лимит по памяти")
            }
        }
    }
};
todo.init();