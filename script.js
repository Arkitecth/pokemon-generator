//Javascript Connect to a pokemon api 
//Get Data fomr the Pokemon API 
const btn = document.querySelector("button"); 
const form = document.querySelector("#form"); 
const url = "https://pokeapi.co/api/v2/";



function pokeDataHandler(json) {
    const image = json.sprites.front_default; 
    const name = json.forms[0].name[0].toUpperCase() + json.forms[0].name.substring(1); 
    const h3 = document.querySelector("h3");
   
    const img = document.querySelector("img"); 
    img.src = image; 
    h3.textContent = name;

}


function charDataHandler(json) {
    const description = json.descriptions[7].description;
    const desc = document.querySelector(".desc"); 
    desc.textContent = description; 
}

function toggleVisibility(toggleFlag) {
    // visible or hidden
    const errorLabel = document.querySelector(".error-message"); 
    errorLabel.style.visibility = toggleFlag; 
}

function callback() {
    toggleVisibility("hidden"); 
    const id = Math.floor((Math.random() * 30)) + 1
    const char_endpoint = url + 'characteristic/' + id;
    getRequest(char_endpoint, charDataHandler); 
}

function getRequest(endpoint, handler, callback) {
    fetch(endpoint).then((response) => {
        if(!response.ok) {
            throw new Error(`HTTP error: ${response.status}`); 
        }
        return response.json(); 
    })
    .then((json) => {
        handler(json);
        callback();
    })
    .catch((err) => {
        console.log(err)
        toggleVisibility("visible"); 
    });
}
btn.addEventListener("click", () => { 
    const input = document.querySelector("input");
    const poke_endpoint = url + 'pokemon/' + input.value;
    var result = getRequest(poke_endpoint, pokeDataHandler, function(){
        toggleVisibility("hidden"); 
        const id = Math.floor((Math.random() * 30)) + 1
        const char_endpoint = url + 'characteristic/' + id;
        getRequest(char_endpoint, charDataHandler, ()=>{}); 
    });


}); 

form.addEventListener("submit", (event) => {
    event.preventDefault();
})
