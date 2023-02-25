function create_quiz_page(un_input) {

    document.querySelector("main").innerHTML = `
    <div class="header">
        <p>${un_input}</p>
        <button>logout</button>
    </div>
    <div id="quiz_container">
        <img>
        <div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
    `

    document.querySelector("#wrapper").style.backgroundColor = "#c1afe4"
    document.querySelector(".header button").addEventListener("click", button_action);

    function button_action(event) {
        //localStorage?
        create_login_page();
        document.querySelector("#wrapper").style.transition = "background-color 2s";
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

        console.log(array_breeds);

        const random_breed = array_breeds[random_number(array_breeds.length)];

        console.log(random_breed);

        const image_for_random_breed = await (await fetch_resource(`https://dog.ceo/api/breed/${random_breed.url}/images/random`)).json();

        console.log(image_for_random_breed);

        document.querySelector("#quiz_container img").src = await image_for_random_breed.message

    }






}