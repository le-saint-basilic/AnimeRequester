const btValider = document.getElementById("valider");
const txtCle = document.getElementById("cle");
const invalide = document.getElementById("invalide");
const url = new URL('https://anime-db.p.rapidapi.com/anime');

btValider.addEventListener("click", valider)


function valider(){
    testKey(txtCle.value);
}

async function testKey(key) {
    const params = new URLSearchParams({
        page: '1',
        size: 1,
        id: '1'
    });
    const requestUrl = `${url}?${params.toString()}`;

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': key,
            'x-rapidapi-host': 'anime-db.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(requestUrl, options);
        
        if (response.ok) {
            sessionStorage.setItem('cle', key);
            options["headers"]["x-rapidapi-key"] = key;
            window.location = "../index.html"
            return true;
        } else {
            console.warn(`Clé invalide (Statut : ${response.status})`);
            txtCle.value = "";
            invalide.style.display = "block"
            return false;
        }
    } catch (error) {
        console.error('Erreur réseau :', error);
        return false;
    }
}