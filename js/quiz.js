function create_quiz_page(un_input) {

    document.querySelector("#wrapper").style.backgroundColor = "#c1afe4"
    document.querySelector("#wrapper").classList.add("bg_img");
    alert_no_button("Getting a random image..")

    document.querySelector("main").innerHTML = `
    <div class="header">
        <p>${un_input}</p>
        <button>logout</button>
    </div>
    <div id="quiz_container">
        <img src="">
        <div id="alternatives">
        </div>
    </div>
    `

    document.querySelector(".header button").addEventListener("click", button_action);

    function button_action(event) {
        create_login_page();
        document.querySelector("#wrapper").style.transition = "background-color 1s";
        document.querySelector("#wrapper").classList.remove("bg_img");
        localStorage.removeItem("user_name");
    }



    create_quiz();

    async function create_quiz() {

        let array_breeds = [];

        while (array_breeds.length < 4) {
            const dog_breed = ALL_BREEDS[random_number(ALL_BREEDS.length)];
            console.log(dog_breed);
            if (!array_breeds.includes(dog_breed)) {
                array_breeds.push(dog_breed);
            }
        }

        const random_breed = array_breeds[random_number(array_breeds.length)];

        const image_for_random_breed = await (await fetch_resource(`https://dog.ceo/api/breed/${random_breed.url}/images/random`)).json();

        document.querySelector("#quiz_container img").src = await image_for_random_breed.message;
        document.querySelector("#wrapper").classList.remove("bg_img");
        hide_feedback();

        array_breeds.forEach(breed => {
            const alternative_button = document.createElement("div");
            alternative_button.classList.add("alternative_button");
            document.querySelector("#alternatives").append(alternative_button);
            alternative_button.textContent = breed.name;

            alternative_button.addEventListener("click", (event => {

                if (event.target.textContent === random_breed.name) {
                    alert_with_button("Correct answer!", "ONE MORE");
                    document.querySelector("#feedback").style.backgroundColor = "rgb(124, 249, 124)";

                } else {
                    alert_with_button("I'm afraid not...", "ONE MORE")
                    document.querySelector("#feedback").style.backgroundColor = "rgb(214, 55, 55)";
                }

                document.querySelector(".close_button").addEventListener("click", create_quiz_page);
            }))
        })






    }






}