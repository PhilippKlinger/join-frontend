/**
 * Renders all assignments to the modify-pop-up.
 * @param {number} Id - the index of the current Task.
 */
function renderModifyAssignmentsHTML(currentTask) {
   
    let content = document.getElementById(`modifyPopUpAssignmentContainer${currentTask['id']}`);
    content.innerHTML = '';

    for (let i = 0; i < currentTask['assigned_to'].length; i++) {
        const assignment = currentTask['assigned_to'][i]['name'];
        let initials = getInitials(assignment);
        let bgColor = currentTask['assigned_to'][i]['color'];
        let Id = currentTask['id'];
        content.innerHTML += modifyAssignmentsTemplateHTML(i, Id, bgColor, initials);
    }
}

function renderSubtasksOverview(task) {

    let content = document.getElementById('subtasksOverview');
    content.innerHTML = '';
    for (let i = 0; i < task['subtasks'].length; i++) {
        const subtask = task['subtasks'][i]['title'];
        let isChecked = subtask['completed'];
            content.innerHTML += /*html*/`
                <div>${i + 1}. ${subtask}</div>
            `;
    }
}

/**
 * controls which priobutton is highlighted on the modify-pop-up.
 * @param {object} currentPriority - current priority, selected for this task.
 */
function modifyPrio(currentPriority) {
    let currentPrio = capitalizeFirstLetter(currentPriority);
    let prioValue = document.getElementById(`modify${currentPrio}`).value;
    newPrio = prioValue;
    let otherPrios = priories.filter(currentPriority => currentPriority !== `${prioValue}`);
    let otherPrio1 = capitalizeFirstLetter(otherPrios[0]);
    let otherPrio2 = capitalizeFirstLetter(otherPrios[1]);
    document.getElementById(`modify${currentPrio}`).classList.add(`${prioValue}`);
    document.getElementById(`modify${currentPrio}Icon`).src = `./img/${prioValue}WhiteIcon.png`;
    document.getElementById(`modify${otherPrio1}`).classList.remove(`${otherPrios[0]}`);
    document.getElementById(`modify${otherPrio1}Icon`).src = `./img/${otherPrios[0]}Icon.png`;
    document.getElementById(`modify${otherPrio2}`).classList.remove(`${otherPrios[1]}`);
    document.getElementById(`modify${otherPrio2}Icon`).src = `./img/${otherPrios[1]}Icon.png`;
}

function newModifySubtask(Id) {
    
    let newSubtaskTitle = document.getElementById('subtasks').value;
    clickedTask = newTaskArray.find(task => task.id === Id);
    let newSubtaskId = 15;
    let newSubtaskData = {
        id: newSubtaskId,
        title: newSubtaskTitle,
        completed: false,
        task: Id,
    }
    clickedTask['subtasks'].push(newSubtaskData);
    document.getElementById('subtasks').value = '';
    renderModifySubtaskList(Id);   
}

/**
 * Renders all Subtasks for the current Task.
 * @param {number} Id - index of the current Task.
 */
function renderModifySubtaskList() {
    let content = document.getElementById('subtasksList');
    let task = clickedTask;
    content.innerHTML = '';
    for (let i = 0; i < task['subtasks'].length; i++) {
        const subtask = task['subtasks'][i];
        let isChecked = subtask['completed'];
        let Id = task['id'];
        if(isChecked) {
            content.innerHTML += renderCheckedBoxTemplateHTML(i, Id, subtask);
        } else {
            content.innerHTML += renderUncheckedBoxTemplateHTML(i, Id, subtask);
        }
    }
}

function changeImg() {
    let deleteImg = document.getElementById('deleteTask-Img');
    let deleteImgLight = document.getElementById('deleteTask-light-Img');
    deleteImg.classList.add('d-none');
    deleteImgLight.classList.remove('d-none');
}

function changeImgBack() {
    let deleteImg = document.getElementById('deleteTask-Img');
    let deleteImgLight = document.getElementById('deleteTask-light-Img');
    deleteImg.classList.remove('d-none');
    deleteImgLight.classList.add('d-none');
}

/**
 * Renders all contacts in the select-area.
 * @param {number} Id - index of the current task.
 */
function renderContactsModifyAddTask(Id) {
  
    activateEvent();
    let content = document.getElementById('assignedTo');
    content.innerHTML = /*html*/`
        <option value="" disabled selected>Select contacts to assign</option>
    `;
    for (let i = 0; i < allContacts.length; i++) {
        const allData = allContacts[i];
        const { name } = getJoinData(allData);
        const { color } = getJoinData(allData);
        let taskToEdit = newTaskArray.find(task => task.id === Id);
        let isAssigned = taskToEdit['assigned_to'].some(assignedContact => assignedContact.name === name);
        if(isAssigned) {
            content.innerHTML += /*html*/ `
                <option disabled id="${color}" value="${Id}">${name}</option>
        ` } else {
            content.innerHTML += /*html*/ `
                    <option id="${color}" value="${Id}">${name}</option>
          `
        }
    } 
}

/**
 * Calls the function modifyAssignedTo(), when an option is pressed.
 */
function activateEvent() {
    let modifyAssignBtn = document.getElementById('assignedTo');
    modifyAssignBtn.addEventListener("change", modifyAssignedTo);
}

function modifyAssignedTo() {
    let assignee = document.getElementById("assignedTo");
    let Id = assignee.options[assignee.selectedIndex].value;
    let color = assignee.options[assignee.selectedIndex].id;
    let name = assignee.options[assignee.selectedIndex].innerHTML;
    let selectedAssignee2 = assignee.options[assignee.selectedIndex];
    selectedAssignee2.disabled = true;
    let i = (assignee.selectedIndex) - 1;
    let taskToEdit = newTaskArray.find(task => task.id === Id);
    if (newTaskArray[Id]['assigned_to'].indexOf(name) === -1) {
        newTaskArray[Id]['assigned_to'].push(name);
        newTaskArray[Id]['color'].push(color);
    }
    renderModifyAssignmentsHTML(Id);
}


async function changeStat(id, direction) {
    let currentTask = newTaskArray.find(task => task.id === id);
    let currentIndex = taskStatusClasses.indexOf(currentTask['stat']);
    let newIndex = currentIndex; 

    if (direction === 'up' && currentIndex < taskStatusClasses.length - 1) {
        newIndex = currentIndex + 1;
    } else if (direction === 'down' && currentIndex > 0) {
        newIndex = currentIndex - 1;
    }
    let newStat = taskStatusClasses[newIndex];
    let updatedTaskData = {
        stat: newStat
    };

    await updateTaskToApi(id, updatedTaskData);
    updateBoardTasks();
}

/**
 * Delets the cklicked Assignment from the Task.
 * @param {number} i - index of the current assignment.
 * @param {number} Id - index of the current Task.
 */
function deleteAssignmentOption(i, Id) {
    let currentTask = newTaskArray[Id];
    currentTask['assigned_to'].splice(i, 1);
    renderModifyAssignmentsHTML(Id);
    let assignee = document.getElementById("modifyAssignedTo");
    let selectedAssignee2 = assignee.options[i];
    selectedAssignee2.disabled = false;
    if (currentTask['assigned_to'].length === 0) {
        assignee.selectedIndex = 0;
    }
}

/**
 * Controls the Amount of done Subtasks.
 * @param {number} i - index of current subtask.
 * @param {number} Id - index of current task.
 */
async function configDoneSubtask(i, Id) {
    let task = newTaskArray.find(task => task.id === Id);
    let subtask = task['subtasks'][i];
    subtask['completed'] = !subtask['completed'];
}


/**
 * Calculates the progress in percent.
 * @param {number} subTaskAmount - amount of all subtasks from the currentt task. 
 * @param {number} doneAmount - amount of done subtasks.
 * @returns - progress in percent
 */
function calculateProgress(subTaskAmount, doneAmount) {
    if (doneAmount > subTaskAmount) {
        doneAmount = subTaskAmount;
    }
    let progressInPercent = 100 / subTaskAmount * doneAmount;
    return progressInPercent;
}

/** 
 * Confirms the changes on the current task and save them on the server.
*/
async function confirmChangesOnTask() {
    let currentTask = clickedTask;
    let taskId = currentTask['id'];
    let newTitle = document.getElementById('modifyTitle').value;
    let newDescription = document.getElementById('modifyDescription').value;
    let newDate = document.getElementById('modifyDate').value;
    let newSubtasks = currentTask['subtasks'];
    let updatedTaskData = {
        title: newTitle,
        description: newDescription,
        due_date: newDate,
        prio: newPrio,
        subtasks: newSubtasks,
    };
    await updateTaskToApi(taskId, updatedTaskData);
    closeTaskPopUp();
    updateBoardTasks();
}

/**
 * Delets the current Task.
 * @param {number} taskId - index of the current Task.
 */
async function deleteTask(taskId) {
    try {
        await deleteTaskToApi(parseInt(taskId, 10))
    } catch (error) {
        console.error('Error deleting task:', error);
    }
    
    closeTaskPopUp();
    updateBoardTasks();
}

/**
 * highlighted the current dragged task
 * @param {number} id - index of the current task.
 */
function startDragging(id) {
    currentDraggedTask = newTaskArray.find(task => task.id === id);
    document.getElementById(`pinnedTaskContainer${currentDraggedTask['id']}`).classList.add('rotateDeg');
}

/**
 * Allows to drop off elements.
 * @param {Event} ev -
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * Changes the stat of the dragged task.
 * @param {string} stat - status of the statusbar above which the dragged element is dropped off.
 */
async function drop(newStat) {
    let taskId = currentDraggedTask['id'];
    document.getElementById(`pinnedTaskContainer${taskId}`).classList.remove('rotateDeg');

    let updatedTaskData = {
       stat: newStat
    };

    await updateTaskToApi(taskId, updatedTaskData);
    updateBoardTasks();
}

/**
 * Filters all tasks that contain the value of the search field and pushs them in the filterArray.
 */
function searchTask() {
    let searchInput = document.getElementById('searchInput').value;
    for (let i = 0; i < newTaskArray.length; i++) {
        const currentTask = newTaskArray[i];
        let search = searchInput.toLowerCase();
        let search2 =  capitalizeFirstLetter(search);
        if (currentTask['title'].includes(search) || currentTask['description'].includes(search)) {
            filteredTasks.push(currentTask);
            } else if(currentTask['title'].includes(search2) || currentTask['description'].includes(search2)) {
                filteredTasks.push(currentTask);
            }
        }
        renderFilteredTasks('filteredTasks');
}

/**
 * makes the initial letter uppercase.
 * @param {string} string - chosen Contact.
 * @returns string with inital letter uppercase
 */
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * renders all tasks that are in the filterarray. At the end the array is emptied.
 */
function renderFilteredTasks() {
    renderTodoTasksHTML(filteredTasks);
    renderInProgressHTML(filteredTasks);
    renderAwaitingFeedbackHTML(filteredTasks);
    renderDoneHTML(filteredTasks);
    filteredTasks = [];
}