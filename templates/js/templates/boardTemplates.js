function modifyAssignmentsTemplateHTML(i, Id, bgColor, initials) {
    return /*html*/`
    <div onclick="deleteAssignmentOption('${i}', '${Id}')" class="taskPopUpSingleAssignmentInitals contactContainer" style="background:${bgColor}">
        ${initials}
    </div>
`
}


function renderModifyTaskTemplateHTML(currentTask) {
    return /*html*/`
    <div class="taskModifyPopUp" onclick="doNotClose(event)">
    
        <div class="closeTaskPopUpButton" onclick="closeTaskPopUp()">X</div>

        <div class="titleAndInput m-0">
            <span>Title</span>
            <input class="modifyInput" id="modifyTitle" type="text" required placeholder="Enter a title" value="${currentTask['title']}">
        </div>

        <div class="descriptionAndTextarea">
            <span>Description</span>
            <textarea class="modifyInput" id="modifyDescription" type="text" required placeholder="Enter a Description">${currentTask['description']}</textarea>
        </div>

        <div class="dueDateAndInput">
            <span>Due Date</span>
            <input class="modifyInput" type="date" id="modifyDate" required placeholder="dd/mm/yyyy" value="${currentTask['date']}">
        </div>

        <div class="prio">
            <span>Prio</span>
            <div class="prioButtons modifyInput">
                <button type="button" id="modifyUrgent" value="urgent" onclick=" modifyPrio(value)">
                    Urgent
                    <img id="modifyUrgentIcon" src="./img/urgentIcon.png">
                </button>

                <button type="button" id="modifyMedium" value="medium" onclick=" modifyPrio(value)">
                    Medium
                    <img id="modifyMediumIcon" src="./img/mediumIcon.png">
                </button>

                <button type="button" id="modifyLow" value="low" onclick=" modifyPrio(value)">
                    Low
                    <img id="modifyLowIcon" src="./img/lowIcon.png">
                </button>
            </div>
        </div>


        <div class="assignedToAndSelect">
            <span>Assigned to</span>
            <select class="modifyInput" id="assignedTo" required onclick="renderContactsModifyAddTask(${currentTask['id']})"> 
                    <option value="" disabled selected>Select contacts to assign</option>
                </select>

            <div id="modifyPopUpAssignmentContainer${currentTask['id']}" class="d-flex mt"></div>
        </div>

        <div class="inputAndButton modifyInput">
            <input id="subtasks" placeholder="Add new subtask">
            <button type="button" onclick="newModifySubtask(${currentTask['id']})">
                <img src="./img/subtaskIcon.png">
            </button>
        </div>

        <div class="modifySubtaskList" id="subtasksList">

        </div>

        <div class="configBtnContainer">
            <div class="addTaskBtn confirmBtn btn-bg" onclick="confirmChangesOnTask('${currentTask['id']}')">
                Ok 
                <img src="./img/checkIcon.png" alt="">
            </div>
        </div>

    </div>`
}


function renderTaskAssignmentsPlusInitialsTemplateHTML(assignment, initials, bgColor) {
    return /*html*/`
    <div class="taskPopUpSingleAssignmentContainer">
        <div class="taskPopUpSingleAssignmentInitals contactContainer" style="background:${bgColor}">${initials}</div>
        <div class="taskPopUpSingleAssignmentName">${assignment}</div>
    </div>
`
}


function renderTaskPopUpTableTemplateHTML(clickedTask) {
    return /*html*/`
    <div class="taskPopUpRow">
        <div class="taskPopUpLeftTd"><b>Due Date:</b></div>
        <div class="taskPopUpRightTd">${clickedTask['date']}</div>
    </div>

    <div class="taskPopUpRow">
        <div class="taskPopUpLeftTd"><b>Priority:</b></div>

        <div id="modifyMedium" class="${clickedTask['prio']} prioContainer">
            ${clickedTask['prio']} <img id="modifyMediumIcon" src="./img/${clickedTask['prio']}WhiteIcon.png">
        </div>
    </div>
    <div class="closeTaskPopUpButton" onclick="closeTaskPopUp()">X</div>
`
}



function renderClickedTaskOverviewPopUpTemplateHTML(clickedTask, Id) {
    return /*html*/`
    <div class="taskOverviewPopUp" onclick="doNotClose(event)">
        <div class="taskCategory ${clickedTask['category'].toLowerCase()}-bg">
            ${clickedTask['category']}
        </div>

        <div class="taskPopUpHeadline">${clickedTask['title']}</div>

        <div class="taskPopUpDiscription">${clickedTask['description']}</div>

        <div class="taskPopUpTable" id="taskPopUpTable"></div>

        <div class="taskPopUpAssignments" id="taskPopUpAssignments">
            <div class="assignedToHeadline"><b>Assigned to:</b></div>
            <div id="taskPopUpAssignmentsList" class="taskPopUpAssignmentsList"></div>
        </div>

        <div class="subtasksOverview" id="subtasksOverview">
            
        </div>

        <div class="overviwButtons">
            <div class="popUpButtonsContainer">
                <div class="taskPopUpButton leftBtn btn-border" onclick="deleteTask('${Id}')" onmouseover="changeImg()" onmouseout="changeImgBack()">
                    <img class="" id="deleteTask-Img" src="./img/delete.png" alt="">
                    <img class="d-none" id="deleteTask-light-Img" src="./img/delete-light.png" alt="">

                </div>

                <div class="taskPopUpButton rightBtn btn-bg" onclick="openModifyTaskPopUp('${Id}')">
                    <img class="popUpPen" src="./img/pen.png" alt="">
                    <img class="popUpPenTriangel" src="./img/pen_triangel.png" alt="">
                </div>
            </div>
        </div>
    </div>
`
}


function generatePinnedTaskHTML(task, progressInPercent) {
    return /*html*/`
    <div onclick="openExistingTaskPopUp(${task['id']})">
        <div draggable="true" ondragstart="startDragging(${task['id']})" class="pinnedTaskContainer" id="pinnedTaskContainer${task['id']}">

        <div class="statChangeContainer d-none" onclick="doNotClose(event)">
            <img onclick="changeStat(${task['id']}, 'down')" class="statChangeImgUp" src="./img/urgentWhiteIcon.png" alt="">
            <img onclick="changeStat(${task['id']}, 'up')" class="statChangeImgDown" src="./img/lowWhiteIcon.png" alt="">
        </div>

        <div class="taskCategory ${task['category'].toLowerCase()}-bg">
            ${task['category']}
        </div>

        <h3 class="pinnedTaskHeadline">${task['title']}</h3>
        <p class="pinnedTaskDiscription">${task['description']}</p>

        <div id="progressContainer${task['id']}" class="progressContainer d-none">
            <div class="progressBar">
                <div class="blueProgress" style="width:${progressInPercent}%"></div>
            </div>
            
            <div class="progressText">${task['doneSubTasks']} / ${task['subtasks'].length} Done</div>
        </div>

        <div class="pinnedTaskContactsArrowContainer">
            <div class="pinnedTaskContactsContainer" id="assignedToContainer${task['id']}">

            </div>

            <div class="arrowButton">
                <img src="./img/${task['prio']}Icon.png" alt="">
            </div>
        </div>
        </div>
        </div>
    </div>
`;
}


function renderTaskAssignmentsTemplateHTML(task, bgColor, initials) {
    return /*html*/`
    <div class="contactContainer" id="" style="background-color:${bgColor}">${initials}</div>
    `; 
}


function renderTaskAssignmentCountHTML(assignmentCount) {
    return /*html*/`
    <div class="contactContainer" style="background-color: rgb(0, 0, 0)">+${assignmentCount}</div>
    `;
}


function renderStatusfieldsTemplateHTML(i, stat, statClass) {
    return /*html*/`
    <div class="statContainer">

        <div class="boardStatusHeadContainer" onclick="openAddTaskOverlay('${statClass}')">
            <div class="boardStatus">${stat}</div>
            <div class="plusBtnContainer btn-border-color">
                <div class="plusLine1"></div>
                <div class="plusLine2"></div>
            </div>
        </div>

        <div id="statContainer${i}" class="statusContent" ondrop="drop('${statClass}')" ondragover="allowDrop(event)"></div>
    </div>
`
}


function renderBoardHeaderTemplateHTML() {
    return /*html*/`
    <div id= "BoardManagementText" class="boardManagementText">Kanban Project Management Tool</div>
    <div class="boardHeadlineLeftContainer">
        <div class="board">Board</div>

        <div class="plusBtnContainer mobileAddTask d-none btn-bg" onclick="openAddTaskOverlay('todo')">
            <div class="plusLine1 bg-white"></div>
            <div class="plusLine2 bg-white"></div>
        </div>
    </div>


    <div class="boardHeadlineRightContainer">
        <div class="searchContainer">
            <input oninput="searchTask()" id="searchInput" class="searchInput" type="text" placeholder="Find task">

        <div class="searchBtn">
            <img src="./img/Vector.png" alt="">
        </div>
    </div>
    
    <button class="addTaskBtn btn-bg" onclick="openAddTaskOverlay('todo')">
        <span class="addTaskBtnText">Add task</span>
        <span class="addTaskBtnIcon">+</span>
    </button>

    </div>
`
}


function renderBoardTemplateHTML() {
    return /*html*/`
    <div class="boardBody" id="boardBody">
        <section id="boardHeadlineContainer" class="boardHeadlineContainer"></section>

        <section id="boardContentContainer" class="boardContentContainer"></section>
    </div>
    `
}


function renderCheckedBoxTemplateHTML(i, Id, subtask) {
    return /*html*/`
    <div class="subtask modifySubtask">
        <input id="subtaskCheckBox${i}" type="checkbox" checked onclick="configDoneSubtask(${i}, ${Id})">
        <p id="subtaskName${i}">${subtask}</p>
    </div>
    `
}


function renderUncheckedBoxTemplateHTML(i, Id, subtask) {
    return /*html*/`
    <div class="subtask modifySubtask">
        <input id="subtaskCheckBox${i}" type="checkbox"  onclick="configDoneSubtask(${i}, ${Id})">
        <p id="subtaskName${i}">${subtask}</p>
    </div>
    `
}