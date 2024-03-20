let taskStatus = ['To Do', 'In progress', 'Awaiting Feedback', 'Done'];
let dragTargets = ['todo', 'in progress', 'awaiting feedback', 'done'];
let taskStatusClasses = ['todo', 'inProgress', 'awaitingFeedback', 'done'];
let priories = ['low', 'medium', 'urgent'];
let currentDraggedTask;
let currentDraggedOnStatus;
let filteredTasks = [];
let newPrio;
let chosenStat = 'todo';

/**
 * This function assigns an id to each json from the task list.
 */
function giveTaskId() {
    for (let i = 0; i < newTaskArray.length; i++) {
        const currentTask = newTaskArray[i];
        currentTask['id'] = i;
    }
    removeClassContentSectionAddTask();
}

/**
 * This function updates all dynamic elements on the board.
 */
function updateBoardTasks() {
    renderTodoTasksHTML(newTaskArray);
    renderInProgressHTML(newTaskArray);
    renderAwaitingFeedbackHTML(newTaskArray);
    renderDoneHTML(newTaskArray);
    showProgressbar();
}

/**
 * Renders the Headsection and the Boardsection
 */
function renderBoardHTML() {
    let content = document.getElementById('contentSection');
    content.innerHTML = '';
    content.innerHTML += renderBoardTemplateHTML();
    document.getElementById('body').classList.add('hideScrollBarY');
    document.getElementById('boardBody').classList.add('showScrollBarY');
    renderBoardHeaderHTML();
    renderStatusFieldsHTML();
}

/**
 * Renders Headline, Searchfield and Button into the Headsection
 */
function renderBoardHeaderHTML() {
    let content = document.getElementById('boardHeadlineContainer');
    content.innerHTML = '';
    content.innerHTML += renderBoardHeaderTemplateHTML();
}

/**
 * Renders the status bars to the boardsection
 */
function renderStatusFieldsHTML() {
    let content = document.getElementById('boardContentContainer');
    content.innerHTML = '';
    for (let i = 0; i < taskStatus.length; i++) {
        const stat = taskStatus[i];
        const statClass = taskStatusClasses[i];
        content.innerHTML += renderStatusfieldsTemplateHTML(i, stat, statClass);
    }
    updateBoardTasks();
}

/**
 * Renders all Tasks with the stat:'todo'.
 * @param {string} arrayName - The name of the array which is called.
 */
function renderTodoTasksHTML(arrayName) {
    let content = document.getElementById('statContainer0');
    let todos = arrayName.filter(task => task['stat'] == 'todo');
    content.innerHTML = '';
    for (let i = 0; i < todos.length; i++) {
        const task = todos[i];
        let subtasksAmount = task['subtasks'].length;
        let doneSubtasks = task['doneSubTasks'];
        let ProgressPercent = calculateProgress(subtasksAmount, doneSubtasks);
        content.innerHTML += generatePinnedTaskHTML(task, ProgressPercent);
        renderAssignedToHTML(task);
    }
}

/**
 * Renders all Tasks with the stat:'in Progress'.
 * @param {string} arrayName - The name of the array which is called.
 */
function renderInProgressHTML(arrayName) {
    let content = document.getElementById('statContainer1');
    let inProgress = arrayName.filter(task => task['stat'] == 'inProgress');
    content.innerHTML = '';
    for (let i = 0; i < inProgress.length; i++) {
        const task = inProgress[i];
        let subtasksAmount = task['subtasks'].length;
        let doneSubtasks = task['doneSubTasks'];
        let ProgressPercent = calculateProgress(subtasksAmount, doneSubtasks);
        content.innerHTML += generatePinnedTaskHTML(task, ProgressPercent);
        renderAssignedToHTML(task);
    }
}

/**
 * Renders all Tasks with the stat:'awaiting Feedback'.
 * @param {string} arrayName - The name of the array which is called.
 */
function renderAwaitingFeedbackHTML(arrayName) {
    let content = document.getElementById('statContainer2');
    let awaitingFeedback = arrayName.filter(task => task['stat'] == 'awaitingFeedback');
    content.innerHTML = '';
        for (let i = 0; i < awaitingFeedback.length; i++) {
            const task = awaitingFeedback[i];
            let subtasksAmount = task['subtasks'].length;
            let doneSubtasks = task['doneSubTasks'];
            let ProgressPercent = calculateProgress(subtasksAmount, doneSubtasks);
            content.innerHTML += generatePinnedTaskHTML(task, ProgressPercent);
            renderAssignedToHTML(task);
        }
}

/**
 * Renders all Tasks with the stat:'done'.
 * @param {string} arrayName - The name of the array which is called.
 */
function renderDoneHTML(arrayName) {
    let content = document.getElementById('statContainer3');
    let done = arrayName.filter(task => task['stat'] == 'done');
    content.innerHTML = '';
    for (let i = 0; i < done.length; i++) {
        const task = done[i];
        let subtasksAmount = task['subtasks'].length;
        let doneSubtasks = task['doneSubTasks'];
        let ProgressPercent = calculateProgress(subtasksAmount, doneSubtasks);
        content.innerHTML += generatePinnedTaskHTML(task, ProgressPercent);
        renderAssignedToHTML(task);
    }
}

/**
 * Checks the amount of assignments and controls how many are displayed.
 * @param {object} task - current Object from the Array, that is iterated in the for-loop.
 */
function renderAssignedToHTML(task) {
    let content = document.getElementById(`assignedToContainer${task['id']}`);
    let assignmentCount = task['assignedTo'].length -3;
    content.innerHTML = '';
    if (task['assignedTo'].length <= 3) {
        renderTaskAssignmentListHTML(task, task['assignedTo'].length);
    } else {
        renderTaskAssignmentListHTML(task, '3');
    }
    if(task['assignedTo'].length > 3) {
        content.innerHTML += renderTaskAssignmentCountHTML(assignmentCount);
    }
}

/**
 * Renders all assignments for every JSON
 * @param {object} task - current JSON.
 * @param {string} count - the number of assignments that are not displayed.
 */
function renderTaskAssignmentListHTML(task, count) {
    let content = document.getElementById(`assignedToContainer${task['id']}`);
    for (let i = 0; i < count; i++) {
        const assignment = task['assignedTo'][i];
        let initials = getInitials(assignment);
        let bgColor = task['color'][i];
        content.innerHTML += renderTaskAssignmentsTemplateHTML(task, bgColor, initials);
    }
}

/**
 * If a JSOn from the array contains subtasks, a proggressbar is rendered. 
 */
function showProgressbar() {
    for (let i = 0; i < newTaskArray.length; i++) {
        const task = newTaskArray[i];
        if(task['subtasks'].length > 0) {
            document.getElementById(`progressContainer${task['id']}`).classList.remove('d-none');
        }
    }
}

/**
 * Shows the Pop-Up Overview of the clicked Task.
 * @param {number} Id - the index of the Task of the newTaskArray.
 */
function openExistingTaskPopUp(Id) {
    renderClickedTaskPopUpHTML(Id);
    document.getElementById('overlaySection').classList.remove('d-none');
}

/**
 * the popup disappears by using display: none.
 */
function closeTaskPopUp() {
    document.getElementById('overlaySection').classList.add('d-none');
}

/**
 * Renders all Informations from the JSON into the Pop-up.
 * @param {number} Id - the index of the Task.
 */
function renderClickedTaskPopUpHTML(Id) {
    let content = document.getElementById('overlaySection');
    let clickedTask = newTaskArray[Id];
    content.innerHTML = '';
    content.innerHTML += renderClickedTaskOverviewPopUpTemplateHTML(clickedTask, Id);
    renderTaskPopUpTableHTML(clickedTask);
    renderTaskPopUpAssignmentsHTML(clickedTask);
    renderSubtasksOverview(Id);
}

/**
 * Renders the date and the prio to the pop-up.
 * @param {object} clickedTask - current JSON from the newTaskArray.
 */
function renderTaskPopUpTableHTML(clickedTask) {
    let content = document.getElementById('taskPopUpTable');
    content.innerHTML = '';
    content.innerHTML += renderTaskPopUpTableTemplateHTML(clickedTask);
}

/**
 * Renders all assignments to the pop-up.
 * @param {object} clickedTask - current JSON from the newTaskArray.
 */
function renderTaskPopUpAssignmentsHTML(clickedTask) {
    let content = document.getElementById('taskPopUpAssignmentsList');
    content.innerHTML = '';
    for (let i = 0; i < clickedTask['assignedTo'].length; i++) {
        const assignment = clickedTask['assignedTo'][i];
        let initials = getInitials(assignment);
        let bgColor = clickedTask['color'][i];
        content.innerHTML += renderTaskAssignmentsPlusInitialsTemplateHTML(assignment, initials, bgColor);
    } 
}

/**
 * Calls the renderfunction for the modify-pop-up.
 * @param {number} Id - the inndex of the current Task.
 */
function openModifyTaskPopUp(Id) {
    modifyCurrentTaskHTML(Id);
}

/**
 * renders the pop-up, where you can modify the clicked Task.
 * @param {nummber} Id - the index of the current Task.
 */
function modifyCurrentTaskHTML(Id) {
    let content = document.getElementById('overlaySection');
    let currentTask = newTaskArray[Id];
    let prio = currentTask['prio'];
    content.innerHTML = '';
    content.innerHTML = renderModifyTaskTemplateHTML(currentTask);
    renderModifyAssignmentsHTML(Id);
    setMinDate('modifyDate');
    modifyPrio(prio);
    renderModifySubtaskList(Id);

}