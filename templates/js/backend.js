const BACKEND_TOKEN = 'FRE0UTOZCHFF8Z8N6T3DXIIG7KHYOC6NF0EJY419';
const BACKEND_URL = 'https://remote-storage.developerakademie.org/item';

async function setItem(key, value) {
    const payload = { key, value, token: BACKEND_TOKEN };
    return fetch(BACKEND_URL, { method: 'POST', body: JSON.stringify(payload)})
    .then(res => res.json());
}

async function getItem(key) {
    const url = `${BACKEND_URL}?key=${key}&token=${BACKEND_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) { 
            return res.data.value;
        } throw `Could not find data with key "${key}".`;
    });
}

