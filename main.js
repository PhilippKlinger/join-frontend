let allContacts = [];
let lastActivePage = 'sidebarSummary';

async function init() {
    await loadContacts();
    await loadTasks();
    includeHTML();
    initSummary();
    removeClassContentSectionAddTask();
}

function renderSummary() {
    initSummary();
    let sidebarSummary = document.getElementById('sidebarSummary');
    highlightSidebarBtn(sidebarSummary);
    lastActivePage = 'sidebarSummary';
}

function renderBoard() {
    giveTaskId();
    renderBoardHTML();
    let sidebarBoard = document.getElementById('sidebarBoard');
    highlightSidebarBtn(sidebarBoard);
    lastActivePage = 'sidebarBoard';
}

function renderAddTask() {
    initAddTask();
    let sidebarAddTask = document.getElementById('sidebarAddTask');
    highlightSidebarBtn(sidebarAddTask);
    lastActivePage = 'sidebarAddTask';
}

function renderContacts() {
    initContacts();
    let sidebarContacts = document.getElementById('sidebarContacts');
    highlightSidebarBtn(sidebarContacts);
    lastActivePage = 'sidebarContacts';
}

function showLegalNoticeScreen() {
    contentSection.innerHTML = generateLegalNoticeScreenHTML();
    let sidebarLegal = document.getElementById('sidebarLegal');
    document.getElementById('headerContentRightLogout').style.display = 'none'
    highlightSidebarBtn(sidebarLegal);
}

function showHelpScreen() {
    contentSection.innerHTML = generateHelpScreenHTML();
    let helpLogoBtn = document.getElementById('helpLogoBtn');
    document.getElementById('headerContentRightLogout').style.display = 'none'
    highlightSidebarBtn(helpLogoBtn);
}

function getJoinData(allData) {
    let name = allData['name'];
    let email = allData['email'];
    let phone = allData['phone'];
    let color = allData['color'];
    let initials = allData['initials'];
    let group = allData['group'];
    return { name, email, phone, color, initials, group };
}

function doNotClose(event) {
    event.stopPropagation();
}

function logOut() {
    window.location.replace("./templates/html/login.html");
    localStorage.removeItem("currentEmail");
}

function showLogOut() {
    if (document.getElementById('headerContentRightLogout').style.display == 'none') {
        document.getElementById('headerContentRightLogout').style.display = 'block';
    } else {
        document.getElementById('headerContentRightLogout').style.display = 'none';
    }
}

function highlightSidebarBtn(element) {
    const buttons = document.getElementsByClassName('sidebarBtn');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('sidebarBtnActive');
    }
    element.classList.add('sidebarBtnActive');
}

function returnToLastActivePage() {
    let nextScreen = document.getElementById(`${lastActivePage}`);
    nextScreen.click();
}


function removeClassContentSectionAddTask() {
    document.getElementById('contentSection').classList.remove('contentSectionAddTask');
}