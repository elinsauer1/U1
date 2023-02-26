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

    document.querySelector(".link_to_register").addEventListener("click", (event) => {
        document.querySelector("#wrapper").style.transition = "background-color 1s"
        create_register_page();
    });

    document.querySelector(".button_login").addEventListener("click", async (event) => {

        let feedback_container = document.querySelector("#feedback");

        document.querySelector("#feedback_bg").classList.remove("invisible");
        feedback_container.classList.remove("invisible");

        alert_no_button("Contacting the server...");

        const un_input = document.querySelector(".un").value;
        const pw_input = document.querySelector(".pw").value;

        try {
            const check_credentials = await fetch_resource(`https://teaching.maumt.se/apis/access/?action=check_credentials&user_name=${un_input}&password=${pw_input}`);

            switch (check_credentials.status) {
                case 200:
                    create_quiz_page(un_input);
                    localStorage.setItem("user_name", un_input);
                    break;

                case 400:
                    alert_with_button("Please enter username and password", "CLOSE")
                    break;


                case 404:
                    hide_feedback();
                    document.querySelector(".ready").classList.add("wrong_credentials")
                    document.querySelector(".wrong_credentials").textContent = "Wrong user name or password"
                    break;

                case 418:
                    alert_with_button("The server thinks it´s not a teapot!", "CLOSE")
                    break;

                default:
                    break;
            }
        } catch (error) {
            console.log(error.message);
            if (error.message.includes("NetworkError")) {
                alert_with_button("Couldn't reach server, please try again", "CLOSE");
            }
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

        alert_no_button("Contacting the server...")

        const un_input = document.querySelector(".un").value;
        const pw_input = document.querySelector(".pw").value;

        try {
            const add_new_user = await fetch_resource(new Request("https://teaching.maumt.se/apis/access/", {
                method: "POST",
                body: JSON.stringify({
                    action: "register",
                    user_name: un_input,
                    password: pw_input
                }),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            }));



            switch (add_new_user.status) {
                case 200:
                    alert_with_button("Registration complete. Please proceed to login", "CLOSE")
                    break;

                case 400:
                    alert_with_button("Please enter username and password", "CLOSE")
                    break;

                case 409:
                    alert_with_button("Sorry, that name is taken. Please try with another one.", "CLOSE")
                    break;

                case 418:
                    alert_with_button("The server thinks it´s not a teapot!", "CLOSE")
                    break;

                default:
                    break;
            }
        } catch (error) {
            console.log(error.message);
            if (error.message.includes("NetworkError")) {
                alert_with_button("Couldn't reach server, please try again", "CLOSE")
            }
        }

        document.querySelector(".un").value = ``;
        document.querySelector(".pw").value = ``;
    })

}



