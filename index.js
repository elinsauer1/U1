"use strict"

create_login_page();
load_page();


function random_number(max) {
    return Math.floor(max * Math.random());
}

function hide_feedback() {
    const feedback_container = document.querySelector("#feedback");
    feedback_container.classList.add("invisible");
    document.querySelector("#feedback_bg").classList.add("invisible");
}

function alert_with_button(message, text_for_button) {

    const feedback_container = document.querySelector("#feedback");
    feedback_container.textContent = message;

    document.querySelector("#feedback_bg").classList.remove("invisible");
    feedback_container.classList.remove("invisible");

    const feedback_button = document.createElement("button");
    feedback_button.textContent = text_for_button;
    feedback_container.append(feedback_button);
    feedback_button.classList.add("close_button");

    feedback_button.addEventListener("click", (event) => {
        feedback_container.classList.add("invisible")
        document.querySelector("#feedback_bg").classList.add("invisible");
    })
}

function alert_no_button(message) {

    const feedback_container = document.querySelector("#feedback");
    feedback_container.innerText = message;
    feedback_container.style.backgroundColor = "white";

    feedback_container.classList.remove("invisible");
    document.querySelector("#feedback_bg").classList.remove("invisible");
}

function load_page() {

    if (localStorage.getItem("user_name") === null) {
        create_login_page();
    } else {
        create_quiz_page(localStorage.getItem("user_name"));
    }

}