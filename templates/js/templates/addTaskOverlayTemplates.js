function generateContentLeftAndRightContainerOverlay() {
    return /*html*/ `
        <div class="contentLeftAndRight contentLeftAndRightOverlay">
            <div class="contentLeft">
                <div class="titleAndInput">
                    <span>Title</span>
                    <input id="title" type="text" required placeholder="Enter a title">
                </div>

                <div class="descriptionAndTextarea">
                    <span>Description</span>
                    <textarea id="description" type="text" required placeholder="Enter a Description"></textarea>
                </div>

                <div class="categoryAndSelect">
                    <span>Category</span>
                    
                    <div class="newCategoryContainer d-none" id="newCategoryContainerOverlay">
                        <input placeholder="New category name" id="newCategoryInputOverlay">
                        <div class="newCategoryColorContainer">
                            <div class="categoryColor" id="newCategoryColorOverlay"></div>
                        </div>
                        <button type="button" class="cancelButton" onclick="cancelNewCategoryOverlay()">
                            <img src="./img/cancelIcon.png">
                        </button>
                        <button type="button" class="checkButton" onclick="confirmNewCategoryOverlay()">
                            <img src="./img/blackCheckIcon.png">
                        </button>
                    </div>

                    <div class="newCategoryColors d-none" id="newCategoryColorsOverlay">
                        <p class="categoryColor" style="background-color: red" onclick="addColorToNewCategoryOverlay('red')"></p>
                        <p class="categoryColor" style="background-color: orange" onclick="addColorToNewCategoryOverlay('orange')"></p>
                        <p class="categoryColor" style="background-color: pink" onclick="addColorToNewCategoryOverlay('pink')"></p>
                        <p class="categoryColor" style="background-color: turquoise" onclick="addColorToNewCategoryOverlay('turquoise')"></p>
                        <p class="categoryColor" style="background-color: goldenrod" onclick="addColorToNewCategoryOverlay('goldenrod')"></p>
                        <p class="categoryColor" style="background-color: blue" onclick="addColorToNewCategoryOverlay('blue')"></p>
                    </div>
                    
                    <div id="categoryOverlay" onclick="openCategoryDropdownOverlay()">Select task category</div>
                    <div id="categoryDropdownOverlay" class="categoryDropdown d-none">
                        <div class="categoryOption" onclick="newCategoryOverlay()">
                            New category
                        </div>

                        <div class="categoryOption" value="development" onclick="selectedCategoryOverlay('development', 'red')">
                            Development
                            <div class="categoryColor" style="background-color: red"></div>
                        </div>

                        <div class="categoryOption" value="design" onclick="selectedCategoryOverlay('design', 'orange')">
                            Design
                            <div class="categoryColor" style="background-color: orange"></div>
                        </div>

                        <div class="categoryOption" value="sales" onclick="selectedCategoryOverlay('sales', 'pink')">
                            Sales
                            <div class="categoryColor" style="background-color: pink"></div>
                        </div>

                        <div class="categoryOption" value="backoffice" onclick="selectedCategoryOverlay('backoffice', 'turquoise')">
                            Backoffice
                            <div class="categoryColor" style="background-color: turquoise"></div>
                        </div>

                        <div class="categoryOption" value="media" onclick="selectedCategoryOverlay('media', 'goldenrod')">
                            Media
                            <div class="categoryColor" style="background-color: goldenrod"></div>
                        </div>

                        <div class="categoryOption" value="marketing" onclick="selectedCategoryOverlay('marketing', 'blue')">
                            Marketing
                            <div class="categoryColor" style="background-color: blue"></div>
                        </div>
                    </div>
                </div>

                <div class="assignedToAndSelect">
                    <span>Assigned to</span>
                    <select id="assignedToOverlay" required> 
                        <option value="" disabled selected>Select contacts to assign</option>
                    </select>
                </div>

                <div class="assignedToList" id="assignedToListOverlay">

                </div>
            </div>

            <div class="borderlineOverlay"></div>

            <div class="contentRight">
                <div class="dueDateAndInput">
                    <span>Due Date</span>
                    <input type="date" id="dateOverlay" required placeholder="dd/mm/yyyy" onchange="pushDateOverlay()">
                </div>

                <div class="prio">
                    <span>Prio</span>
                    <div class="prioButtons">
                        <button type="button" id="urgentOverlay" value="urgent">
                            Urgent
                            <img id="urgentIconOverlay" src="./img/urgentIcon.png">
                        </button>

                        <button type="button" id="mediumOverlay" value="medium">
                            Medium
                            <img id="mediumIconOverlay" src="./img/mediumIcon.png">
                        </button>

                        <button type="button" id="lowOverlay" value="low">
                            Low
                            <img id="lowIconOverlay" src="./img/lowIcon.png">
                        </button>
                    </div>
                </div>

                <div class="subtasksAndInput">
                    <span>Subtasks</span>

                    <div class="inputAndButton">
                        <input id="subtasks" placeholder="Add new subtask">
                        <button type="button" onclick="newSubtask()">
                            <img src="./img/subtaskIcon.png">
                        </button>
                    </div>
                </div>

                <div class="subtasksList" id="subtasksList">

                </div>
            </div>
        </div>
    `;
}


function generateTwoButtonsContainerOverlay() {
    return /*html*/ `
        <div class="twoButtons">
            <button id="resetOverlay" type="reset" class="clearButton" onclick="clearFieldsOverlay()" onmouseover="changeClearBtnIconToHover('clearIconDefaultOverlay', 'clearIconHoverOverlay')" onmouseout="changeClearBtnIconToDefault('clearIconHoverOverlay', 'clearIconDefaultOverlay')">
                Clear
                <img src="./img/cancelIcon.png" id="clearIconDefaultOverlay">
                <img src="./img/clearIconHover.png" id="clearIconHoverOverlay" class="d-none">
            </button>

            <button type="submit" class="createTaskButton" id="createTask">
                Create Task
                <img src="./img/checkIcon.png">
            </button>
        </div>
    `;
}