let cle = sessionStorage.getItem("cle");
if (cle == null){
    window.location = "html/key.html";
}

const form = document.getElementById("search-form");
const textAwn = document.getElementById("search-param");
const typeAwn = document.getElementById("search-type");

form.addEventListener("submit", onSubmitForm)


function onSubmitForm(event){
    event.preventDefault();
    switch (typeAwn.value) {
        case 'title':
            searchAnime(nom=textAwn.value)
            break;
        case 'id':
            searchAnime(id=textAwn.value)
            break;
        case 'rank':
            searchAnime(titre=textAwn.value)
            break;
    
        default:
            break;
    }
    textAwn.value = "";
}

const options = {
    method: 'GET',
    params: { page: '1', size: '10', search: 'Naruto' },
    headers: {
        'x-rapidapi-key': cle,
        'x-rapidapi-host': 'anime-db.p.rapidapi.com'
    }
};
const url = new URL('https://anime-db.p.rapidapi.com/anime');


async function searchAnime(nom = null, id = null, classement = null) {
    const param = new URLSearchParams({
        page: '1',
        size: 10
    });
    if (nom != null) {
        param.set("search", nom)
    }
    if (id != null) {
        param.set("id", id)
    }
    if (classement != null) {
        param.set("ranking", classement)
    }
    if (id != null || id != null) {
        param.set("size", 1)
    }
    url.search = new URLSearchParams(param.toString());
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
            console.log(response);
        }

        const data = await response.json();
        console.log(data);
        //afficher
    } catch (error) {
        console.error('Failed to fetch anime data:', error);
    }
}