/**
 * Initializes the contacts by rendering the contacts section, rendering the contacts list and checks if mobileview is necessary.
 * @returns {Promise<void>}
 */
function initContacts() {
    renderContactsSection();
    renderContactsList();
    updateContactsMobileVisibility();
    removeClassContentSectionAddTask();
}
/**
 * Loads the contacts from storage.
 * @returns {Promise<void>}
 */
async function loadContacts() {
    try {
        const contactsFromApi = await getContactsFromApi();
        allContacts = [];
        allContacts = contactsFromApi.map(contact => ({
            ...contact,
            name: `${contact.firstname} ${contact.lastname}`,
            initials: `${contact.firstname.charAt(0)}${contact.lastname.charAt(0)}`,
            group: `${contact.firstname.charAt(0)}`
        }));
    } catch (e) {
        console.error('Loading error:', e);
    }
}
/**
 * Renders the contacts section in the content.
 */
function renderContactsSection() {
    contentSection.innerHTML = generateContactsHTML();
}
/**
 * Renders the contacts list by sorting and rendering the contact groups and contacts.
 */
function renderContactsList() {
    sortContacts();
    renderContactsListMobileButton();
    renderContactsListGroup();
    renderContactsListGroupContact();
}
/**
 * Renders the contact groups in the contacts list.
 */
function renderContactsListGroup() {
    let groupCounts = countGroupObjects(allContacts);   //Gibt Objekt mit allen Gruppenbuchstaben und deren Anzahl aus Array zurück
    let groupLetters = Object.keys(groupCounts);    //Filtert nur die Buchstaben aus Objekt
    for (let i = 0; i < groupLetters.length; i++) {
        let groupLetter = groupLetters[i];
        document.getElementById('contactsList').innerHTML += generateContactsListGroupHTML(groupLetter);
    }
}
/**
 * Renders the contacts in each contact group.
 */
function renderContactsListGroupContact() {
    for (let i = 0; i < allContacts.length; i++) {
        const allData = allContacts[i];
        const { name, email, color, initials, group } = getJoinData(allData);
        document.getElementById(`contactsListGroup${group}`).innerHTML
            += generateContactsListGroupContactHTML(name, email, color, initials, i);
    }
}

function renderContactsListMobileButton() {
    document.getElementById('contactsList').innerHTML = generateContactsListMobileButton();
}
/**
 * Shows the details of a contact.
 * @param {number} i - The index of the contact in the contacts list.
 */
function showContactDetails(i) {
    checkIfMobile();
    const allData = allContacts[i];
    const { name, email, color, initials, phone } = getJoinData(allData);
    resetAllHighlightContact();
    document.getElementById('contactsDetailInfo').innerHTML
        = generateContactsDetailContentHTML(name, email, phone, color, initials, i);
    highlightContact(i);
}
/**
 * Checks if the screen size is mobile and adjusts the contact details and list display accordingly.
 */
function checkIfMobile() {
    let screensize = window.innerWidth;
    if (screensize <= 768) {
        document.getElementById('contactsDetail').classList.remove('d-none');
        document.getElementById('contactsList').classList.add('d-none');
    }
}
/**
 * Returns to the contacts list view from the contact details view.
 */
function returnToContactslist() {
    document.getElementById('contactsDetail').classList.add('d-none');
    document.getElementById('contactsList').classList.remove('d-none');
}
/**
 * Returns to the contacts list view from the contact details view.
 */
function resetAllHighlightContact() {
    for (let i = 0; i < allContacts.length; i++) {
        document.getElementById(`contactsListGroupContact${i}`).classList.add('contactsListGroupContactBgInactive');
        document.getElementById(`contactsListGroupContact${i}`).classList.remove('contactsListGroupContactBg');
    }
}
/**
 * Highlights the selected contact in the contact list.
 * @param {number} i - The index of the contact in the contacts list.
 */
function highlightContact(i) {
    document.getElementById(`contactsListGroupContact${i}`).classList.remove('contactsListGroupContactBgInactive');
    document.getElementById(`contactsListGroupContact${i}`).classList.add('contactsListGroupContactBg');
}
/**
 * Creates a new contact by saving the entered details.
 * @returns {Promise<void>}
 */
async function createContact() {
    let { name, email, phone, bgColor } = getContactVariables();
    let contactData = {
        firstname: name.split(' ')[0], 
        lastname: name.split(' ')[1] || '',
        email: email,
        phone: phone,
        color: bgColor
    };

    try {
        await createContactToApi(contactData);
        await loadContacts();
        showCreatedContact(name); 
    } catch (error) {
        console.error('Error creating contact:', error);
  
    }
}
/**
 * Retrieves the contact details entered in the add contact overlay.
 * @returns {Object} - The contact details.
 */
function getContactVariables() {
    let name = document.getElementById('addContactName').value;
    let email = document.getElementById('addContactEmail').value;
    let phone = document.getElementById('addContactPhone').value;
    let bgColor = getBgColor();
    return { name, email, phone, bgColor};
}
/**
 * Saves the newly created contact to the contacts list.
 * @param {string} name - The name of the contact.
 * @param {string} email - The email of the contact.
 * @param {string} phone - The phone number of the contact.
 * @param {string} bgColor - The background color of the contact.
 * @param {string} initials - The initials of the contact.
 * @param {string} group - The group of the contact.
 * @returns {Promise<void>}
 */
async function saveContact(name, email, phone, bgColor) {
    allContacts.push({
        name: name,
        email: email,
        phone: phone,
        color: bgColor,
    })
    await setItem('contacts', JSON.stringify(allContacts));
}
/**
 * Shows the success message and updates the contacts list after a new contact is created.
 * @param {string} name - The name of the created contact.
 */
function showCreatedContact(name) {
    document.getElementById('contactsList').innerHTML = '';
    renderContactsList();
    document.getElementById('overlaySection').innerHTML = generateContactSuccessHTML();
    setTimeout(function () {
        document.getElementById('overlaySection').classList.add('d-none');
    }, 1400);
    let index = getCreatedContact(name);
    showContactDetails(index);
}
/**
 * Creates an edited contact by saving the edited details.
 * @param {number} i - The index of the contact in the contacts list.
 * @returns {Promise<void>}
 */
async function createEditedContact(i) {
    let { editedName, editedEmail, editedPhone } = getEditedVariables();
    let contactData = {
        firstname: editedName.split(' ')[0], 
        lastname: editedName.split(' ')[1] || '',
        email: editedEmail,
        phone: editedPhone,
    };
    let contactId = i;
    await editContactToApi(contactId, contactData);
    await loadContacts();
    renderContactsList();
    showEditedContact(i);
}
/**
 * Retrieves the edited contact details entered in the edit contact overlay.
 * @returns {Object} - The edited contact details.
 */
function getEditedVariables() {
    let editedName = document.getElementById('editContactName').value;
    let editedEmail = document.getElementById('editContactEmail').value;
    let editedPhone = document.getElementById('editContactPhone').value;
    return { editedName, editedEmail, editedPhone };
}
/**
 * Saves the edited contact details to the contacts list.
 * @param {string} editedName - The edited name of the contact.
 * @param {string} editedEmail - The edited email of the contact.
 * @param {string} editedPhone - The edited phone number of the contact.
 * @param {number} i - The index of the contact in the contacts list.
 * @returns {Promise<void>}
 */
async function saveEditedContact(editedName, editedEmail, editedPhone, i) {
    allContacts[i]['name'] = editedName;
    allContacts[i]['email'] = editedEmail;
    allContacts[i]['phone'] = editedPhone;
    await setItem('contacts', JSON.stringify(allContacts));
}
/**
 * Shows the edited contact by updating the contacts list and displaying the contact details.
 * @param {number} i - The index of the contact in the contacts list.
 */
function showEditedContact(i) {
    document.getElementById('contactsList').innerHTML = '';
    renderContactsList();
    showContactDetails(i);
    document.getElementById('overlaySection').classList.add('d-none');
}
/**
 * Deletes a contact from the contacts list.
 * @param {number} i - The index of the contact in the contacts list.
 * @returns {Promise<void>}
 */
async function deleteContact(i) {
    let contactToDelete = allContacts[i];

    try {
        await deleteContactToApi(contactToDelete.id); 
    } catch (error) {
        console.error('Error deleting contact:', error);
    }
    await loadContacts();
    showEmptyContact();
    renderContactsList();
}
/**
 * Shows an empty contact by clearing the contact details and the overlay section.
 */
function showEmptyContact() {
    document.getElementById('contactsList').innerHTML = '';
    document.getElementById('contactsDetailInfo').innerHTML = '';
    document.getElementById('overlaySection').classList.add('d-none');
    renderContactsList();
}
/**
 * Generates the initials of a contact based on their name.
 * @param {string} name - The name of the contact.
 * @returns {string} - The initials of the contact.
 */
function getInitials(name) {
    let names = name.split(' ');
    let initials = '';
    for (let i = 0; i < names.length; i++) {
        initials += names[i].charAt(0).toUpperCase();
    }
    return initials;
}
/**
 * Generates a random background color.
 * @returns {string} - The randomly generated background color.
 */
function getBgColor() {
    const bgColor = [
        "#fbd1d7", // Pastellrosa
        "#c1f0f6", // Pastellblau
        "#b9fbc0", // Pastellgrün
        "#fcd8d1", // Sehr helles Pastellrosa
        "#fae1dd", // Pfirsich
        "#eacea4", // Pastellgelb
        "#e1ccec", // Pastelllila
        "#d1c0bf"  // Pastellbraun
    ];
    return bgColor[Math.floor(Math.random() * bgColor.length)];
}
/**
 * Retrieves the index of a created contact in the contacts list based on its name.
 * @param {string} name - The name of the created contact.
 * @returns {number} - The index of the created contact in the contacts list.
 */
function getCreatedContact(name) {
    let index = allContacts.findIndex(function (contact) {
        return contact.name === name;
    });
    return index;
}
/**
 * Counts the number of contacts in each group.
 * @param {Array} x - The contacts list.
 * @returns {Object} - An object with the group letters as keys and their corresponding counts as values.
 */
function countGroupObjects(x) {
    let groupCounts = {};
    for (let i = 0; i < x.length; i++) {
        let group = x[i].group;
        if (groupCounts[group]) {     //Falls Gruppe mit Buchstaben schon vorhanden wird deren anzahl um 1 erhöht
            groupCounts[group]++;
        } else {
            groupCounts[group] = 1;     // Falls Gruppe noch nicht vorhanden, wird Buchstaben mit 1 ausgegeben
        }
    }
    return groupCounts;             // Ergebnis bspw. = {B: 1, C: 1, J: 2}
}
/**
 * Sorts the contacts list alphabetically by name.
 */
function sortContacts() {
    allContacts.sort(function (a, b) {
        let nameA = a.firstname.toUpperCase(); // Großbuchstaben für Vergleich
        let nameB = b.firstname.toUpperCase();
        if (nameA < nameB) {
            return -1; // a kommt vor b
        }
        if (nameA > nameB) {
            return 1; // a kommt nach b
        }
        return 0; // a und b sind gleich
    });
}
/**
 * Displays the overlay section for adding a new contact.
 */
function addNewContact() {
    document.getElementById('overlaySection').classList.remove('d-none');
    document.getElementById('overlaySection').innerHTML = generateContactsOverlayAddHTML();
}
/**
 * Displays the overlay section for editing a contact.
 * @param {number} i - The index of the contact in the contacts list.
 */
function editContact(i) {
    const allData = allContacts[i];
    const { name, email, color, initials, phone } = getJoinData(allData);
    document.getElementById('overlaySection').classList.remove('d-none');
    document.getElementById('overlaySection').innerHTML = generateContactsOverlayEditHTML(name, email, phone, color, initials, i);
}
/**
 * Closes the contact overlay section.
 */
function closeContactOverlay() {
    document.getElementById('overlaySection').classList.add('d-none');
}
/**
 * Event listener for the window resize event.
 */
window.addEventListener('resize', updateContactsMobileVisibility);
/**
 * Checks if windowsize is under or above the given breakpoint and update to mobileview.
 */
function updateContactsMobileVisibility() {
    let windowSize = window.innerWidth;
    let contactsDetail = document.getElementById('contactsDetail');
    let contactsList = document.getElementById('contactsList');
    let contactsSection = document.getElementById('contactsSection');
    windowsizeBeneathBreakpoint(windowSize, contactsDetail, contactsList, contactsSection );
    windowsizeAboveBreakpoint(windowSize, contactsDetail, contactsList, contactsSection);
}
/**
 * Changes to mobileview.
 */
function windowsizeBeneathBreakpoint(windowSize, contactsDetail, contactsList, contactsSection) {
    if (contactsSection && windowSize <= 768) {
        if (!contactsDetail.classList.contains('d-none') && !contactsList.classList.contains('d-none')) {
            contactsDetail.classList.add('d-none');
        }
    }
}
/**
 * Changes to desktopview.
 */
function windowsizeAboveBreakpoint(windowSize, contactsDetail, contactsList, contactsSection) {
    if (contactsSection && windowSize >= 769) {
        if (contactsDetail.classList.contains('d-none')) {
            contactsDetail.classList.remove('d-none');
        }
        if (contactsList.classList.contains('d-none')) {
            contactsList.classList.remove('d-none');
        }
    }
}
/**
 * Changes displaystate of hovered btns.
 */
function btnHoverEffect(isHovered) {
    const cancelCheckmark = document.getElementById('cancelCheckmarkContacts');
    const cancelCheckmarkHover = document.getElementById('cancelCheckmarkContactsHover');
    if (isHovered) {
        cancelCheckmark.style.display = "none";
        cancelCheckmarkHover.style.display = "block";
    } else {
        cancelCheckmark.style.display = "block";
        cancelCheckmarkHover.style.display = "none";
    }
}
/**
 * Changes displaystate of hovered btns.
 */
function btnHoverEffect2(isHovered) {
    const cancelCheckmark = document.getElementById('cancelCheckmarkContacts2');
    const cancelCheckmarkHover = document.getElementById('cancelCheckmarkContactsHover2');
    if (isHovered) {
        cancelCheckmark.style.display = "none";
        cancelCheckmarkHover.style.display = "block";
    } else {
        cancelCheckmark.style.display = "block";
        cancelCheckmarkHover.style.display = "none";
    }
}