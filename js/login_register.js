"use strict"

function create_register_page() {

    document.querySelector("main").innerHTML = `
    <h1>REGISTER</h1>
    <p class="username">User Name:</p>
    <input class="un"type="text">
    <p class="password">Password:</p>
    <input class="pw"type="password">
    <p class="ready">Ready when you are...</p>
    <button class="button_register">Register</button>
    <p class="link_to_login">Already have an account? Go to login</p>`;

    document.querySelector(".button_register").addEventListener("click", async (event) => {

        let feedback_container = document.querySelector("#feedback");
        feedback_container.classList.remove("invisible");
        feedback_container.textContent = "Contacting the server..."

        const un = document.querySelector(".un").value;
        const pw = document.querySelector(".pw").value;

        const add_new_user = await fetch_resource(new Request("https://teaching.maumt.se/apis/access/", {
            method: "POST",
            body: JSON.stringify({
                action: "register",
                user_name: un,
                password: pw
            }),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        }));

        console.log(add_new_user);

        document.querySelector(".un").value = ``;
        document.querySelector(".pw").value = ``;

        switch (add_new_user.status) {
            case 200:
                alert("Registration complete. Please proceed to login")
                break;

            case 409:
                alert("Sorry, that name is taken. Please try with another one.")
                break;

            case 418:
                alert("The server thinks it´s not a teapot!")
                break;

            default:
                break;
        }

    })

}

function alert(message) {

    const feedback_container = document.querySelector("#feedback");
    feedback_container.textContent = message;

    const feedback_button = document.createElement("button");
    feedback_button.textContent = "Close";
    feedback_container.append(feedback_button);

    feedback_button.addEventListener("click", (event) => {
        feedback_container.classList.add("invisible")
    })
}

