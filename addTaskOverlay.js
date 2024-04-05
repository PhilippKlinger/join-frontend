/**
 * This function opens the AddTask overlay and executes another function.
 * 
 * @param {string} stat - This is the status that orders the task on the board.
 */
async function openAddTaskOverlay(stat) {
    await loadCategories();
    chosenStat = stat;
    document.getElementById('overlaySection').classList.remove('d-none');
    document.getElementById('overlaySection').innerHTML = /*html*/ `
        <form class="addTaskOverlay" id="addTaskForm" onclick="doNotClose(event)">
            <div class="headlineContainerOverlay" id="headlineContainerOverlay"></div>
            <div class="contentLeftAndRightContainerOverlay" id="contentLeftAndRightContainerOverlay"></div>
            <div class="twoButtonsContainerOverlay" id="twoButtonsContainerOverlay"></div>
        </form>
    `;
    renderHeadlineOverlay();
}

/**
 * This function renders the headline in the overlay and executes 3 other functions.
 */
function renderHeadlineOverlay() {
    document.getElementById('headlineContainerOverlay').innerHTML = /*html*/ `
        <h1>Add Task</h1>
        <img src="./img/cancelIcon.png" onclick="closeOverlay()">
    `;
    renderContentLeftAndRightOverlay();
    renderContactsAddTask('assignedToOverlay');
    activatePrioButtonsOverlay();
}

/**
 * This function closes the overlay.
 */
function closeOverlay() {
    document.getElementById('overlaySection').classList.add('d-none');
}

/**
 * This function renders a div-container in the overlay called 'contentLeftAndRightContainerOverlay' and executes 2 other functions.
 */
function renderContentLeftAndRightOverlay() {
    document.getElementById('contentLeftAndRightContainerOverlay').innerHTML = generateContentLeftAndRightContainerOverlay();
    renderTwoButtonsContainerOverlay();
    setMinDate('dateOverlay');
}

/**
 * This function renders the contacts as an option-tag to the assignedTo-List.
 */
function renderContactsAddTaskOverlay() {
    for (let i = 0; i < allContacts.length; i++) {
        const allData = allContacts[i];
        const { name } = getJoinData(allData);
        const { color } = getJoinData(allData);
        document.getElementById('assignedToOverlay').innerHTML += /*html*/ `
            <option value="${color}">${name}</option>
        `;
    }
}

/**
 * This function renders a div-container with a 'clear' button and a 'create task' button and executes another function.
 */
function renderTwoButtonsContainerOverlay() {
    document.getElementById('twoButtonsContainerOverlay').innerHTML = generateTwoButtonsContainerOverlay();
    clearFieldsOverlay();
}

/**
 * This function updates the date in the dateArray with the new due date.
 */
function pushDateOverlay() {
    let dueDate = document.getElementById('dateOverlay').value;
    dateArray.splice(0, 1, dueDate);
}

/**
 * This function first executes the low-function so the prio button 'low' ist active and sets up event listeners.
 */
function activatePrioButtonsOverlay() {
    lowOverlay();
    let urgentBtn = document.getElementById('urgentOverlay');
    urgentBtn.addEventListener("click", urgentOverlay);
    let mediumBtn = document.getElementById('mediumOverlay');
    mediumBtn.addEventListener("click", mediumOverlay);
    let lowBtn = document.getElementById('lowOverlay');
    lowBtn.addEventListener("click", lowOverlay);
    let resetBtn = document.getElementById('resetOverlay');
    resetBtn.addEventListener("click", lowOverlay);
    let assignBtn = document.getElementById('assignedToOverlay');
    assignBtn.addEventListener("change", assignedToOverlay);
    document.getElementById('addTaskForm').addEventListener('submit', function (event) {
        event.preventDefault();
        createTaskOverlay();
    });
}

/**
 * This function activates the urgent button and deactivates the other two prio buttons.
 */
function urgentOverlay() {
    let prioValue = document.getElementById('urgentOverlay').value;
    prio = prioValue;
    document.getElementById('urgentOverlay').classList.add('urgent');
    document.getElementById('urgentIconOverlay').src = './img/urgentWhiteIcon.png';
    document.getElementById('mediumOverlay').classList.remove('medium');
    document.getElementById('mediumIconOverlay').src = './img/mediumIcon.png';
    document.getElementById('lowOverlay').classList.remove('low');
    document.getElementById('lowIconOverlay').src = './img/lowIcon.png';
}

/**
 * This function activates the medium button and deactivates the other two prio buttons.
 */
function mediumOverlay() {
    let prioValue = document.getElementById('mediumOverlay').value;
    prio = prioValue;
    document.getElementById('mediumOverlay').classList.add('medium');
    document.getElementById('mediumIconOverlay').src = './img/mediumWhiteIcon.png';
    document.getElementById('urgentOverlay').classList.remove('urgent');
    document.getElementById('urgentIconOverlay').src = './img/urgentIcon.png';
    document.getElementById('lowOverlay').classList.remove('low');
    document.getElementById('lowIconOverlay').src = './img/lowIcon.png';
}

/**
 * This function activates the low button and deactivates the other two prio buttons.
 */
function lowOverlay() {
    let prioValue = document.getElementById('lowOverlay').value;
    prio = prioValue;
    document.getElementById('lowOverlay').classList.add('low');
    document.getElementById('lowIconOverlay').src = './img/lowWhiteIcon.png';
    document.getElementById('mediumOverlay').classList.remove('medium');
    document.getElementById('mediumIconOverlay').src = './img/mediumIcon.png';
    document.getElementById('urgentOverlay').classList.remove('urgent');
    document.getElementById('urgentIconOverlay').src = './img/urgentIcon.png';
}

/**
 * This function opens the dropdown menu to select a category.
 */
function openCategoryDropdownOverlay() {
    renderCategoryOptionsOverlay();
    document.getElementById('categoryDropdownOverlay').classList.remove('d-none');
    document.getElementById('categoryOverlay').style.cssText = `
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
        border-bottom: none;
    `;
    document.getElementById('categoryOverlay').onclick = closeCategoryDropdownOverlay;
}

/**
 * This function allows the user to create a new category.
 */
function newCategoryOverlay() {
    closeCategoryDropdownOverlay();
    document.getElementById('newCategoryContainerOverlay').classList.remove('d-none');
    document.getElementById('newCategoryColorsOverlay').classList.remove('d-none');
    document.getElementById('categoryOverlay').style.display = 'none';
}

/**
 * This function lets the user choose the color for the new category.
 * 
 * @param {string} color - The color that gets added to the new category.
 */
function addColorToNewCategoryOverlay(color) {
    document.getElementById('newCategoryColorOverlay').style.backgroundColor = color;
}

/**
 * This function cancels the new category and close the input field.
 */
function cancelNewCategoryOverlay() {
    document.getElementById('newCategoryInputOverlay').value = '';
    document.getElementById('newCategoryColorOverlay').style.backgroundColor = '';
    document.getElementById('newCategoryContainerOverlay').classList.add('d-none');
    document.getElementById('newCategoryColorsOverlay').classList.add('d-none');
    document.getElementById('categoryOverlay').style.display = 'flex';
    document.getElementById('categoryOverlay').innerHTML = 'Select task category';
}

/**
 * This function confirms the new category if the input field isn't empty.
 */
function confirmNewCategoryOverlay() {
    let newCategory = document.getElementById('newCategoryInputOverlay').value;
    let newCategoryColor = document.getElementById('newCategoryColorOverlay').style.backgroundColor;
    let newCategoryInput = document.getElementById('newCategoryInputOverlay');
    if (newCategoryInput.value == '') {
        newCategoryInput.focus();
    } else {
        selectedCategoryOverlay(newCategory, newCategoryColor);
        document.getElementById('newCategoryInputOverlay').value = '';
        document.getElementById('newCategoryColorOverlay').style.backgroundColor = '';
        document.getElementById('newCategoryContainerOverlay').classList.add('d-none');
        document.getElementById('newCategoryColorsOverlay').classList.add('d-none');
        document.getElementById('categoryOverlay').style.display = 'flex';
    }
}

/**
 * This function shows the selected category and executes another function.
 * 
 * @param {string} category - This is the name of the selected category.
 * @param {string} color - This is the color of the selected category.
 */
function selectedCategoryOverlay(category, color, categoryId) {
    selectedCategoryId = categoryId;
    category = category.charAt(0).toUpperCase() + category.slice(1);
    document.getElementById('categoryOverlay').innerHTML = /*html*/ `
        ${category}
        <div class="categoryColor" style="background-color: ${color}; margin-left: 10px"></div>
    `;
    closeCategoryDropdownOverlay();
}

/**
 * This function closes the dropdown menu that shows the categories that are selectable.
 */
function closeCategoryDropdownOverlay() {
    document.getElementById('categoryDropdownOverlay').classList.add('d-none');
    document.getElementById('categoryOverlay').style.cssText = `
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        border-bottom: 1px solid #D1D1D1;
    `;
    document.getElementById('categoryOverlay').onclick = openCategoryDropdownOverlay;
}

/**
 * This function disables the selected contact and if it's not already existend it will be pushed in arrays, and also another function will executed.
 */
function assignedToOverlay() {
    let assignee = document.getElementById("assignedToOverlay");
    let selectedAssignee = assignee.options[assignee.selectedIndex].value;
    let color = assignee.options[assignee.selectedIndex].id;
    let selectedAssignee2 = assignee.options[assignee.selectedIndex];
    selectedAssignee2.disabled = true;
    let i = assignee.selectedIndex - 1;
    let objId = i + 1;
    if (assignedToNames.indexOf(selectedAssignee) === -1) {
        assignedToNames.push(selectedAssignee);
        contactsColors.push(color);
        objIds.push(objId);
    }
    showAssignedToListOverlay();
}

/**
 * This function shows a list of the assigned contacts.
 */
function showAssignedToListOverlay() {
    let content = document.getElementById("assignedToListOverlay");
    content.innerHTML = "";
    for (let i = 0; i < assignedToNames.length; i++) {
        const name = assignedToNames[i];
        let bgColor = contactsColors[i];
        let objId = objIds[i];
        let initials = getInitials(name);
        content.innerHTML += /*html*/ `
            <div class="assigneeContainer" style="background-color: ${bgColor}" onclick="removeAssigneeOverlay(${i}, ${objId})">
                ${initials}
            </div>
        `;
    }
}

/**
 * This function remove an assigned contact when clicked on and enables it again.
 * 
 * @param {number} position - This is the position in the assignee in the assignedToNames array. 
 * @param {number} objId - This is the position in the objIds array.
 */
function removeAssigneeOverlay(position, objId) {
    assignedToNames.splice(position, 1);
    contactsColors.splice(position, 1);
    objIds.splice(position, 1);
    showAssignedToListOverlay();
    let assignee = document.getElementById("assignedToOverlay");
    let selectedAssignee2 = assignee.options[objId];
    selectedAssignee2.disabled = false;
    if (assignedToNames.length === 0) {
        assignee.selectedIndex = 0;
    }
}

/**
 * This function clears all selectable fields, input fields and arrays, and resets all buttons.
 */
function clearFieldsOverlay() {
    allSubtasks = [];
    assignedToNames = [];
    contactsColors = [];
    objIds = [];
    dateArray = [];
    document.getElementById('categoryOverlay').innerHTML = 'Select task category';
    document.getElementById('assignedToListOverlay').innerHTML = '';
    document.getElementById('subtasksList').innerHTML = '';
    closeCategoryDropdownOverlay();
    cancelNewCategoryOverlay();
    enableContactsForAssignedToOverlay();
}

/**
 * This function enables a contact.
 */
function enableContactsForAssignedToOverlay() {
    let assignee = document.getElementById("assignedToOverlay");
    for (let i = 1; i < assignee.options.length; i++) {
        let option = assignee.options[i];
        option.disabled = false;
    }
}

/**
 * This function creates a new Task, pushes it in the 'newTaskArray' and executes 3 other functions.
 */
function createTaskOverlay() {
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let category = parseInt(selectedCategoryId, 10);   
    let date = document.getElementById('dateOverlay').value;
    let newTaskData = {
        title: title,
        description: description,
        category_id: category,
        assigned_to: objIds,
        due_date: date,
        priority: prio,
        stat: chosenStat,
        //'subtasks': allSubtasks,
        //'isChecked': isChecked,
        //'doneSubTasks': 0,
        //color: contactsColors
    };
    saveTasks(newTaskData);
    clearFieldsOverlay();
}

function renderCategoryOptionsOverlay() {
    const categoryDropdown = document.getElementById('categoryDropdownOverlay');

    allCategories.forEach(category => {
        categoryDropdown.innerHTML += /*html*/ `

        <div class="categoryOption" id="selectedCategory" value="${category.id}" onclick="selectedCategoryOverlay('${category.name}', '${category.color}', '${category.id}')">
                            ${category.name}
                            <div class="categoryColor" style="background-color: ${category.color}"></div>
                        </div>
        `
    });
}