const headers = {
    'Authorization': `Token ${localStorage.getItem('authToken')}`,  //
    'Content-Type': 'application/json'
};

const backendUrl = 'http://127.0.0.1:8000/'

async function getTasksFromApi() {
    return fetch(`${backendUrl}tasks/`, {
        method: 'GET',
        headers: headers
    })
        .then(response => response.json());
}

async function createTaskToApi(newTaskData) {
    return fetch(`${backendUrl}tasks/`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(newTaskData)
    })
        .then(response => response.json());
}

async function deleteTaskToApi(taskId) {
    const response = await fetch(`${backendUrl}tasks/${taskId}/`, {
        method: 'DELETE',
        headers: headers,
    });

    if (!response.ok) {
        throw new Error('Deleting task failed');
    }

    return response; // Da beim Löschen oft kein Inhalt zurückgegeben wird, reicht es hier, die Antwort zu bestätigen
}

async function updateTaskToApi(taskId, updatedTaskData) {
    const response = await fetch(`${backendUrl}tasks/${taskId}/`, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify(updatedTaskData)
    });

    if (!response.ok) {
        throw new Error('Updating task failed');
    }

    return await response.json();
}

async function getContactsFromApi() {
    const response = await fetch(`${backendUrl}contacts/`, {
        method: 'GET',
        headers: headers,
    });
    if (!response.ok) {
        throw new Error('Could not fetch contacts');
    }
    return await response.json();
}

async function createContactToApi(contactData) {
    const response = await fetch(`${backendUrl}contacts/`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(contactData),
    });

    if (!response.ok) {
        throw new Error('Creating contact failed');
    }

    return await response.json();
}

async function deleteContactToApi(contactId) {
    const response = await fetch(`${backendUrl}contacts/${contactId}/`, {
        method: 'DELETE',
        headers: headers,
    });

    if (!response.ok) {
        throw new Error('Deleting contact failed');
    }

    return response; // Da beim Löschen oft kein Inhalt zurückgegeben wird, reicht es hier, die Antwort zu bestätigen
}

async function editContactToApi(contactId, contactData) {
    const response = await fetch(`${backendUrl}contacts/${contactId}/`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(contactData),
    });

    if (!response.ok) {
        throw new Error('Editing contact failed');
    }

    return response;
}

async function getCategoriesFromApi() {
    return fetch(`${backendUrl}categories/`, {
        method: 'GET',
        headers: headers
    })
        .then(response => response.json());
}


//----------------------------optional------------------------//


async function loginWithUsernameAndPassword(username, password) {
    const response = await fetch(`${backendUrl}login/`, {
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

async function signUpNewUserToApi(newUserData) {
    const response = await fetch(`${backendUrl}register/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUserData),
    });

    if (!response.ok) {
        throw new Error('Sign Up failed');
    }

    const data = await response.json();
    return data;
}