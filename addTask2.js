/**
 * This function disables the selected contact and if it's not already existend it will be pushed in arrays, and also another function will executed.
 */
function assignedTo() {
    let assignee = document.getElementById("assignedTo");
    let selectedAssigneeIndex = assignee.selectedIndex; // Der Index des ausgewählten Kontakts im Dropdown
    let selectedContactId = allContacts[selectedAssigneeIndex - 1].id; // -1, weil der erste Eintrag im Dropdown wahrscheinlich "Select contacts to assign" ist

    let selectedAssignee = assignee.options[assignee.selectedIndex].value;
    let color = assignee.options[assignee.selectedIndex].id;
    let selectedAssignee2 = assignee.options[assignee.selectedIndex];
    selectedAssignee2.disabled = true;


  
    if (assignedToNames.indexOf(selectedAssignee) === -1) {
        assignedToNames.push(selectedAssignee);
        contactsColors.push(color);
        objIds.push(selectedContactId);
    }
    showAssignedToList();
}

/**
 * This function shows a list of the assigned contacts.
 */
function showAssignedToList() {
    let content = document.getElementById("assignedToList");
    content.innerHTML = "";
    for (let i = 0; i < assignedToNames.length; i++) {
        
        const name = assignedToNames[i];
        let bgColor = contactsColors[i];
        let objId = objIds[i];
        let initials = getInitials(name);
        content.innerHTML += /*html*/ `
            <div class="assigneeContainer" style="background-color: ${bgColor}" onclick="removeAssignee(${i}, ${objId})">
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
function removeAssignee(position, objId) {
    assignedToNames.splice(position, 1);
    contactsColors.splice(position, 1);
    objIds.splice(position, 1);
    showAssignedToList();

    let assignee = document.getElementById("assignedTo");
    let selectedAssignee2 = assignee.options[objId];
    selectedAssignee2.disabled = false;

    if (assignedToNames.length === 0) {
        assignee.selectedIndex = 0;
    }
}

/**
 * This function lets the user add subtasks.
 */
function newSubtask() {
    let newSubtask = document.getElementById('subtasks').value;

    if (newSubtask == '') {
        document.getElementById('subtasks').focus();
    } else {
        allSubtasks.push(newSubtask);
        isChecked.push(false);
        document.getElementById('subtasksList').innerHTML = '';
        for (let i = 0; i < allSubtasks.length; i++) {
            let subtask = allSubtasks[i];
            document.getElementById('subtasksList').innerHTML += /*html*/ `
                <div class="subtask">
                    <input type="checkbox">
                    <p>${subtask}</p>
                </div>
            `;
        }
    }
    document.getElementById('subtasks').value = '';
}

/**
 * This function clears all selectable fields, input fields and arrays, and resets all buttons.
 */
function clearFields() {
    allSubtasks = [];
    assignedToNames = [];
    contactsColors = [];
    objIds = [];
    dateArray = [];
    document.getElementById('category').innerHTML = 'Select task category';
    document.getElementById('assignedToList').innerHTML = '';
    document.getElementById('subtasksList').innerHTML = '';
    closeCategoryDropdown();
    cancelNewCategory();
    enableContactsForAssignedTo();
}

/**
 * This function enables a contact.
 */
function enableContactsForAssignedTo() {
    let assignee = document.getElementById("assignedTo");

    for (let i = 1; i < assignee.options.length; i++) {
        let option = assignee.options[i];
        option.disabled = false;
    }
}

 /**
  * This function changes the clear button icon when the clear button gets hovered.
  * 
  * @param {string} IdDefault - This is the ID of the icon when it's in default.
  * @param {string} IdHover - This is the ID of the icon when it's hovered.
  */
function changeClearBtnIconToHover(IdDefault, IdHover) {
    document.getElementById(IdDefault).classList.add('d-none');
    document.getElementById(IdHover).classList.remove('d-none');
}

/**
 * This function changes the clear button icon when the clear button is in default.
 * 
 * @param {string} IdHover - This is the ID of the icon when it's hovered.
 * @param {string} IdDefault - This is the ID of the icon when it's in default.
 */
function changeClearBtnIconToDefault(IdHover, IdDefault) {
    document.getElementById(IdHover).classList.add('d-none');
    document.getElementById(IdDefault).classList.remove('d-none');
}

/**
 * This function creates a new Task, pushes it in the 'newTaskArray' and executes 3 other functions.
 */
function createTask() {
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let category = parseInt(selectedCategoryId, 10);   
    let date = document.getElementById('date').value;
    let newTaskData = {
        title: title,
        description: description,
        category_id: category,
        assigned_to: objIds,
        due_date: date,
        priority: prio,
        status: chosenStat,
        //'subtasks': allSubtasks,
        //'isChecked': isChecked,
        //'doneSubTasks': 0,
        //color: contactsColors
    };

    saveTasks(newTaskData);
}

/**
 * This asynchronous function saves the new created task in the remote storage and the user will get to the board page.
 */
async function saveTasks(newTaskData) {
    try {
        await createTaskToApi(newTaskData);
        clearFields();
        taskAddedToBoardPopUp();
    } catch (error) {
        console.error("Fehler beim Speichern der Task:", error);
    }
    renderBoard();
}

/**
 * This function shows a popup as a confirm to secure the user that his new created task has been added to the board.
 */
function taskAddedToBoardPopUp() {
    document.getElementById('overlaySection').classList.remove('d-none');
    document.getElementById('overlaySection').innerHTML = /*html*/ `
        <img src="./img/taskAddedToBoard.png" class="taskAddedPopUp" id="taskAddedPopUp">
    `;
    setTimeout(function () { closePopUp() }, 2000);
}

/**
 * This function closes a popup.
 */
function closePopUp() {
    document.getElementById('overlaySection').classList.add('d-none');
}