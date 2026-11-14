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
            labelParam.innerText = "Score : "
            textAwn.placeholder = "ex : 4";
            break;
        default:
            break;
    }
}

async function searchAnimeByName(nom) {
    const url = new URL('https://api.tenrai.org/v1/anime');
    const param = new URLSearchParams({
        page: '1',
        limit: 10,
        q: nom
    });
    url.search = new URLSearchParams(param.toString());
    search10(url);
}

async function searchAnimeById(id) {
    const url = new URL('https://api.tenrai.org/v1/anime');
    const param = new URLSearchParams({
        page: '1',
        limit: 1,
        min_id: id,
        max_id: id
    });
    url.search = new URLSearchParams(param.toString());
    search10(url);
}

async function searchAnimeByRank(rank) {
    const url = new URL('https://api.tenrai.org/v1/anime');
    const param = new URLSearchParams({
        page: '1',
        limit: 10,
        min_score: Math.min(Math.max(rank - 0.25, 1), 10),
        max_score: Math.max(Math.min(parseInt(rank) + 0.25, 10), 0)
    });
    url.search = new URLSearchParams(param.toString());
    search10(url);
}

async function search10(url) {
    try {
        const response = await fetch(url);
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
    let btn = document.createElement("button")

    card.className = "card"
    title.className = "card-title"
    description.className = "card-desc"
    btn.className = "btn-more"
    btn.type = "button"
    btn.innerText = "Afficher plus"

    title.innerText = anime["titles"][0]["title"]

    picture.src = anime["images"]["jpg"]["image_url"]
    picture.alt = "Image de " + anime["titles"][0]["title"]

    description.innerText = anime["synopsis"]

    btn.addEventListener("click", () => {
        const open = description.classList.toggle("expanded")
        btn.innerText = open ? "Afficher moins" : "Afficher plus"
    })

    card.append(title, picture, description, btn)
    cards.appendChild(card)

    // Cache le bouton si la description tient déjà en 3 lignes
    if (description.scrollHeight <= description.clientHeight) {
        btn.hidden = true
    }
}