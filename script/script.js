const options = {
    method: 'GET',
    params: { page: '1', size: '10', search: 'Naruto' },
    headers: {
        'x-rapidapi-key': 'b18a8308b6msh18ba19d3bcbde53p1997d1jsn66bb838806fa',
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
        }

        const data = await response.json();
        console.log(data);
        //afficher
    } catch (error) {
        console.error('Failed to fetch anime data:', error);
    }
}