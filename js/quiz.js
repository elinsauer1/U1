function create_quiz_page(un_input) {

    document.querySelector("main").innerHTML = `
    <div class="header_quiz">
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
    document.querySelector(".header_quiz button").addEventListener("click", create_login_page);


}