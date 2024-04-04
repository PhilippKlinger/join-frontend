let newTaskArray = [];
let prio = undefined;
let allSubtasks = [];
let assignedToNames = [];
let assignedToIds = [];
let contactsColors = [];
let objIds = [];
let dateArray = [];
let isChecked = [];
let allCategories = [];
let selectedCategoryId;

/**
 * This asynchronous function initializes the add task functionality and executes 4 other functions.
 */
async function initAddTask() {
    document.getElementById('contentSection').innerHTML = generateAddTaskContent();
    await loadCategories();
    await loadTasks();
    renderHeadline();
    activatePrioButtons();
    addClassContentSectionAddTask();
}

/**
 * This asynchronous function loads the 'createdTask' item from the remote storage.
 */
async function loadTasks() {
    newTaskArray = JSON.parse(await getItem('createdTask'));
}


/**
 * Loads the contacts from storage.
 * @returns {Promise<void>}
 */
async function loadCategories() {
    try {
        allCategories = await getCategoriesFromApi();
    } catch (e) {
        console.error('Loading error:', e);
    }
}

/**
 * This function renders the headline and executes 2 other functions.
 */
function renderHeadline() {
    document.getElementById('headlineContainer').innerHTML = /*html*/ `
        <h1>Add Task</h1>
    `;
    renderContentLeftAndRight();
    renderContactsAddTask('assignedTo');
}

/**
 * This function renders a div-container called 'contentLeftAndRightContainer' and executes 2 other functions.
 */
function renderContentLeftAndRight() {
    document.getElementById('contentLeftAndRightContainer').innerHTML = generateContentLeftAndRightContainer();
    renderTwoButtonsContainer();
    setMinDate('date');
}

/**
 * This function renders the contacts as an option-tag to the assignedTo-List.
 * 
 * @param {string} Id - The ID of the HTML element that gets the option-tag.
 */
function renderContactsAddTask(Id) {
    for (let i = 0; i < allContacts.length; i++) {
        const allData = allContacts[i];
        const { name, color } = getJoinData(allData);
        document.getElementById(Id).innerHTML += /*html*/ `
            <option id="${color}" value="${name}">${name}</option>
        `;
    }
}

/**
 * This function enables the contact that was removed as an assignee.
 */
function clearDisabledState() {
    for (let i = 0; i < allContacts.length; i++) {
        let position = i;
        let objId = i;
        removeAssignee(position, objId)
    }
}

/**
 * This function renders a div-container with a 'clear' button and a 'create task' button and executes another function.
 */
function renderTwoButtonsContainer() {
    document.getElementById('twoButtonsContainer').innerHTML = generateTwoButtonsContainer();
    clearFields();
}

/**
 * This function adds the css-class 'contentSectionAddTask' to the div-container 'contentSection'.
 */
function addClassContentSectionAddTask() {
    document.getElementById('contentSection').classList.add('contentSectionAddTask')
}

/**
 * This function doesn't let the user select a date that is in the past.
 * 
 * @param {string} id - The ID of the HTML element.
 */
function setMinDate(id) {
    let today = new Date().toISOString().split('T')[0];
    document.getElementById(id).setAttribute('min', today);
}

/**
 * This function updates the date in the dateArray with the new due date.
 */
function pushDate() {
    let dueDate = document.getElementById('date').value;
    dateArray.splice(0, 1, dueDate);
}

/**
 * This function first executes the low-function so the prio button 'low' ist active and sets up event listeners.
 */
function activatePrioButtons() {
    low();
    let urgentBtn = document.getElementById('urgent');
    urgentBtn.addEventListener("click", urgent);
    let mediumBtn = document.getElementById('medium');
    mediumBtn.addEventListener("click", medium);
    let lowBtn = document.getElementById('low');
    lowBtn.addEventListener("click", low);
    let resetBtn = document.getElementById('reset');
    resetBtn.addEventListener("click", low);
    resetBtn.addEventListener("click", clearDisabledState);
    let assignBtn = document.getElementById('assignedTo');
    assignBtn.addEventListener("change", assignedTo);
    document.getElementById('addTaskForm').addEventListener('submit', function (event) {
        event.preventDefault();
        createTask();
    });
}

/**
 * This function activates the urgent button and deactivates the other two prio buttons.
 */
function urgent() {
    let prioValue = document.getElementById('urgent').value;
    prio = prioValue;
    document.getElementById('urgent').classList.add('urgent');
    document.getElementById('urgentIcon').src = './img/urgentWhiteIcon.png';
    document.getElementById('medium').classList.remove('medium');
    document.getElementById('mediumIcon').src = './img/mediumIcon.png';
    document.getElementById('low').classList.remove('low');
    document.getElementById('lowIcon').src = './img/lowIcon.png';
}

/**
 * This function activates the medium button and deactivates the other two prio buttons.
 */
function medium() {
    let prioValue = document.getElementById('medium').value;
    prio = prioValue;
    document.getElementById('medium').classList.add('medium');
    document.getElementById('mediumIcon').src = './img/mediumWhiteIcon.png';
    document.getElementById('urgent').classList.remove('urgent');
    document.getElementById('urgentIcon').src = './img/urgentIcon.png';
    document.getElementById('low').classList.remove('low');
    document.getElementById('lowIcon').src = './img/lowIcon.png';
}

/**
 * This function activates the low button and deactivates the other two prio buttons.
 */
function low() {
    let prioValue = document.getElementById('low').value;
    prio = prioValue;
    document.getElementById('low').classList.add('low');
    document.getElementById('lowIcon').src = './img/lowWhiteIcon.png';
    document.getElementById('medium').classList.remove('medium');
    document.getElementById('mediumIcon').src = './img/mediumIcon.png';
    document.getElementById('urgent').classList.remove('urgent');
    document.getElementById('urgentIcon').src = './img/urgentIcon.png';
}

/**
 * This function opens the dropdown menu to select a category.
 */
function openCategoryDropdown() {
    renderCategoryOptions();
    document.getElementById('categoryDropdown').classList.remove('d-none');
    document.getElementById('category').style.cssText = `
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
        border-bottom: none;
    `;
    document.getElementById('category').onclick = closeCategoryDropdown;
}

/**
 * This function allows the user to create a new category.
 */
function newCategory() {
    closeCategoryDropdown();
    document.getElementById('newCategoryContainer').classList.remove('d-none');
    document.getElementById('newCategoryColors').classList.remove('d-none');
    document.getElementById('category').style.display = 'none';
}

/**
 * This function lets the user choose the color for the new category.
 * 
 * @param {string} color - The color that gets added to the new category.
 */
function addColorToNewCategory(color) {
    document.getElementById('newCategoryColor').style.backgroundColor = color;
}

/**
 * This function cancels the new category and close the input field.
 */
function cancelNewCategory() {
    document.getElementById('newCategoryInput').value = '';
    document.getElementById('newCategoryColor').style.backgroundColor = '';
    document.getElementById('newCategoryContainer').classList.add('d-none');
    document.getElementById('newCategoryColors').classList.add('d-none');
    document.getElementById('category').style.display = 'flex';
    document.getElementById('category').innerHTML = 'Select task category';
}

/**
 * This function confirms the new category if the input field isn't empty.
 */
function confirmNewCategory() {
    let newCategory = document.getElementById('newCategoryInput').value;
    let newCategoryColor = document.getElementById('newCategoryColor').style.backgroundColor;
    let newCategoryInput = document.getElementById('newCategoryInput');
    if (newCategoryInput.value == '') {
        newCategoryInput.focus();
    } else {
        selectedCategory(newCategory, newCategoryColor);
        document.getElementById('newCategoryInput').value = '';
        document.getElementById('newCategoryColor').style.backgroundColor = '';
        document.getElementById('newCategoryContainer').classList.add('d-none');
        document.getElementById('newCategoryColors').classList.add('d-none');
        document.getElementById('category').style.display = 'flex';
    }
}

/**
 * This function shows the selected category and executes another function.
 * 
 * @param {string} category - This is the name of the selected category.
 * @param {string} color - This is the color of the selected category.
 */
function selectedCategory(category, color, categoryId) {
    selectedCategoryId = categoryId;
    category = category.charAt(0).toUpperCase() + category.slice(1);
    document.getElementById('category').innerHTML = /*html*/ `
        ${category}
        <div class="categoryColor" style="background-color: ${color}; margin-left: 10px"></div>
    `;
    closeCategoryDropdown();
}

/**
 * This function closes the dropdown menu that shows the categories that are selectable.
 */
function closeCategoryDropdown() {
    document.getElementById('categoryDropdown').classList.add('d-none');
    document.getElementById('category').style.cssText = `
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        border-bottom: 1px solid #D1D1D1;
    `;
    document.getElementById('category').onclick = openCategoryDropdown;
}

function renderCategoryOptions() {
    const categoryDropdown = document.getElementById('categoryDropdown');

    allCategories.forEach(category => {
        categoryDropdown.innerHTML += /*html*/ `

        <div class="categoryOption" id="selectedCategory" value="${category.id}" onclick="selectedCategory('${category.name}', '${category.color}', '${category.id}')">
                            ${category.name}
                            <div class="categoryColor" style="background-color: ${category.color}"></div>
                        </div>
        `
    });
}
