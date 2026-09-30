let cle = sessionStorage.getItem("cle");
if (cle == null) {
    window.location = "html/key.html";
}

const form = document.getElementById("search-form");
const textAwn = document.getElementById("search-param");
const typeAwn = document.getElementById("search-type");
const cardBox = document.getElementById("cards");
const labelParam = document.getElementById("param-label");


form.addEventListener("submit", onSubmitForm)
typeAwn.addEventListener("change", onChangeSelect)

onChangeSelect()

function onSubmitForm(event) {
    event.preventDefault();
    switch (typeAwn.value) {
        case 'title':
            searchAnimeByName(textAwn.value)
            break;
        case 'id':
            searchAnimeById(textAwn.value)
            break;
        case 'rank':
            searchAnimeByRank(textAwn.value)
            break;

        default:
            break;
    }
    textAwn.value = "";
}

function onChangeSelect(){
    textAwn.value = ""
    
    switch (typeAwn.value) {
        case 'title':
            labelParam.innerText = "Titre : "
            textAwn.placeholder = "ex : Frieren";
            break;
        case 'id':
            labelParam.innerText = "Identifiant : "
            textAwn.placeholder = "ex : 21";
            break;
        case 'rank':
            labelParam.innerText = "Classement : "
            textAwn.placeholder = "ex : 404";
            break;
        default:
            break;
    }
}

const options = {
    method: 'GET',
    params: { page: '1', size: '10', search: 'Naruto' },
    headers: {
        'x-rapidapi-key': cle,
        'x-rapidapi-host': 'anime-db.p.rapidapi.com'
    }
};

async function searchAnimeByName(nom) {
    const url = new URL('https://anime-db.p.rapidapi.com/anime');
    const param = new URLSearchParams({
        page: '1',
        size: 10,
        search: nom
    });
    url.search = new URLSearchParams(param.toString());
    search10(url)
}

async function searchAnimeById(id) {
    const url = new URL('https://anime-db.p.rapidapi.com/anime/by-id/'+id);
    search(url)
}

async function searchAnimeByRank(rank) {
    const url = new URL('https://anime-db.p.rapidapi.com/anime/by-ranking/'+rank);
    search(url)
}

async function search(url) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        cards.innerHTML="";
        afficherAnime(data)
    } catch (error) {
        console.error('Failed to fetch anime data:', error);
    }
}

async function search10(url) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json()
        cards.innerHTML="";
        afficherListeAnime(data["data"]);
    } catch (error) {
        console.error('Failed to fetch anime data:', error);
    }
}

function afficherListeAnime(listAnime) {
    listAnime.forEach(element => {
        afficherAnime(element);
    });    
}

function afficherAnime(anime) {
    let card = document.createElement("div")
    let title = document.createElement("div")
    let picture = document.createElement("img")
    let description = document.createElement("div")

    card.appendChild(title)
    card.appendChild(picture)
    card.appendChild(description)

    title.innerHTML = anime["title"]

    picture.src = anime["image"]
    picture.alt = "Image de " + anime["titre"]

    description.innerText = anime["synopsis"]

    cards.appendChild(card)
}