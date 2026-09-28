const options = {
    method: 'GET',
    params: { page: '1', size: '10', search: 'Naruto' },
    headers: {
        'x-rapidapi-key': null,
        'x-rapidapi-host': 'anime-db.p.rapidapi.com'
    }
};
const url = new URL('https://anime-db.p.rapidapi.com/anime');




async function testKey(key) {
    const param = new URLSearchParams({
        page: '1',
        size: 1
    });
    options["headers"]["x-rapidapi-key"] = key;
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            options["headers"]["x-rapidapi-key"] = null;
        }
    } catch (error) {
        console.error(error);
    }
}

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
        }

        const data = await response.json();
        console.log(data);
        //afficher
    } catch (error) {
        console.error('Failed to fetch anime data:', error);
    }
}