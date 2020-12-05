const loader = document.querySelector(".loader");

async function fetchAll() {
    await new Promise(resolve => {
        setTimeout(fetchCss, 6000);
        function fetchCss() {
            resolve("style.css");
            resolve("images/3448787.jpg");
            resolve("images/crown.png");
        }
    }).then(() => {
        loader.style.display = "none";
        start_quiz.style.opacity = "1"
        console.log("worked")
    }) 
}

fetchAll();