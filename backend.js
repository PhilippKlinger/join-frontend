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


/*---------------------neues Backend-------------------------------------------------- */


const headers = {
    'Authorization': `Token ${localStorage.getItem('authToken')}`,
    'Content-Type': 'application/json'
};


async function getTasks() {
    return fetch('http://127.0.0.1:8000/tasks/', { 
        method: 'GET',
        headers: headers
    })
    .then(response => response.json());
}

async function createTask(taskData) {
    return fetch('http://127.0.0.1:8000/tasks/', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(taskData)
    })
    .then(response => response.json());
}

async function loginWithUsernameAndPassword(username, password) {
    const response = await fetch('http://127.0.0.1:8000/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    const data = await response.json();
    return data;
}

async function signUpWithNameEmailAndPassword(username, email, password) {
    const response = await fetch('http://127.0.0.1:8000/register/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            email:email,
            password: password,
        }),
    });

    if (!response.ok) {
        throw new Error('Sign Up failed');
    }

    const data = await response.json();
    return data;
}

async function getContactsFromApi() {
    const response = await fetch('http://127.0.0.1:8000/contacts/', {
        method: 'GET',
        headers: headers,
    });
    if (!response.ok) {
        throw new Error('Could not fetch contacts');
    }
    return await response.json();
}

async function createContact(contactData) {
    const response = await fetch('http://127.0.0.1:8000/contacts/', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(contactData),
    });

    if (!response.ok) {
        throw new Error('Creating contact failed');
    }

    return await response.json();
}
