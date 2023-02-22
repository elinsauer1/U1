"use strict"

function create_login_page() {

    document.querySelector("main").innerHTML = `
    <h1>LOGIN</h1>
    <p class="username">User Name:</p>
    <input class="un"type="text">
    <p class="password">Password:</p>
    <input class="pw"type="password">
    <p class="ready">Let the magic start!</p>
    <button class="button_login">Login</button>
    <p class="link_to_register">New to this? Register for free</p>`;

    document.querySelector("#wrapper").style.backgroundColor = "#d992a9";

    document.querySelector(".link_to_register").addEventListener("click", create_register_page);

    document.querySelector(".button_login").addEventListener("click", async (event) => {


        document.querySelector("#feedback_bg").classList.remove("invisible");

        let feedback_container = document.querySelector("#feedback");
        feedback_container.classList.remove("invisible");
        feedback_container.textContent = "Contacting the server..."

        const un_input = document.querySelector(".un").value;
        const pw_input = document.querySelector(".pw").value;

        const check_credentials = await fetch_resource(`https://teaching.maumt.se/apis/access/?action=check_credentials&user_name=${un_input}&password=${pw_input}`);

        console.log(check_credentials);

        // document.querySelector(".un").value = ``;
        document.querySelector(".pw").value = ``;

        feedback_container.classList.add("invisible");
        document.querySelector("#feedback_bg").classList.add("invisible");

        console.log(check_credentials.status);

        switch (check_credentials.status) {
            case 200:
                create_quiz_page(un_input);
                break;

            case 404:

                document.querySelector(".ready").classList.add("wrong_credentials")
                document.querySelector(".wrong_credentials").textContent = "Wrong user name or password"
                break;

            case 418:
                alert("The server thinks it´s not a teapot!")
                break;

            default:
                break;
        }

    });


}



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

    document.querySelector("#wrapper").style.backgroundColor = "#aebda4";

    document.querySelector(".link_to_login").addEventListener("click", create_login_page);

    document.querySelector(".button_register").addEventListener("click", async (event) => {

        let feedback_container = document.querySelector("#feedback");
        feedback_container.classList.remove("invisible");
        document.querySelector("#feedback_bg").classList.remove("invisible");
        feedback_container.textContent = "Contacting the server..."

        const un_input = document.querySelector(".un").value;
        const pw_input = document.querySelector(".pw").value;

        const add_new_user = await fetch_resource(new Request("https://teaching.maumt.se/apis/access/", {
            method: "POST",
            body: JSON.stringify({
                action: "register",
                user_name: un_input,
                password: pw_input
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

    console.log(message);

    const feedback_container = document.querySelector("#feedback");
    feedback_container.classList.remove("invisible");
    feedback_container.textContent = message;

    document.querySelector("#feedback_bg").classList.remove("invisible");

    const feedback_button = document.createElement("button");
    feedback_button.textContent = "Close";
    feedback_container.append(feedback_button);

    feedback_button.addEventListener("click", (event) => {
        feedback_container.classList.add("invisible")
        document.querySelector("#feedback_bg").classList.add("invisible");
    })
}

