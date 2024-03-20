function generateAddTaskContent() {
    return /*html*/ `
        <form class="addTaskMainContainer" id="addTaskForm">
            <div class="headlineContainer" id="headlineContainer"></div>
            <div class="contentLeftAndRightContainer" id="contentLeftAndRightContainer"></div>
            <div class="twoButtonsContainer" id="twoButtonsContainer"></div>
        </form>
    `;
}

function generateContentLeftAndRightContainer() {
    return /*html*/ `
        <div class="contentLeftAndRight">
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
                    
                    <div class="newCategoryContainer d-none" id="newCategoryContainer">
                        <input placeholder="New category name" id="newCategoryInput">
                        <div class="newCategoryColorContainer">
                            <div class="categoryColor" id="newCategoryColor"></div>
                        </div>
                        <button type="button" class="cancelButton" onclick="cancelNewCategory()">
                            <img src="./img/cancelIcon.png">
                        </button>
                        <button type="button" class="checkButton" onclick="confirmNewCategory()">
                            <img src="./img/blackCheckIcon.png">
                        </button>
                    </div>

                    <div class="newCategoryColors d-none" id="newCategoryColors">
                        <p class="categoryColor" style="background-color: red" onclick="addColorToNewCategory('red')"></p>
                        <p class="categoryColor" style="background-color: orange" onclick="addColorToNewCategory('orange')"></p>
                        <p class="categoryColor" style="background-color: pink" onclick="addColorToNewCategory('pink')"></p>
                        <p class="categoryColor" style="background-color: turquoise" onclick="addColorToNewCategory('turquoise')"></p>
                        <p class="categoryColor" style="background-color: goldenrod" onclick="addColorToNewCategory('goldenrod')"></p>
                        <p class="categoryColor" style="background-color: blue" onclick="addColorToNewCategory('blue')"></p>
                    </div>
                    
                    <div class="category" id="category" onclick="openCategoryDropdown()">Select task category</div>
                    <div id="categoryDropdown" class="categoryDropdown d-none">
                        <div class="categoryOption" onclick="newCategory()">
                            New category
                        </div>

                        <div class="categoryOption" value="development" onclick="selectedCategory('development', 'red')">
                            Development
                            <div class="categoryColor" style="background-color: red"></div>
                        </div>

                        <div class="categoryOption" value="design" onclick="selectedCategory('design', 'orange')">
                            Design
                            <div class="categoryColor" style="background-color: orange"></div>
                        </div>

                        <div class="categoryOption" value="sales" onclick="selectedCategory('sales', 'pink')">
                            Sales
                            <div class="categoryColor" style="background-color: pink"></div>
                        </div>

                        <div class="categoryOption" value="backoffice" onclick="selectedCategory('backoffice', 'turquoise')">
                            Backoffice
                            <div class="categoryColor" style="background-color: turquoise"></div>
                        </div>

                        <div class="categoryOption" value="media" onclick="selectedCategory('media', 'goldenrod')">
                            Media
                            <div class="categoryColor" style="background-color: goldenrod"></div>
                        </div>

                        <div class="categoryOption" value="marketing" onclick="selectedCategory('marketing', 'blue')">
                            Marketing
                            <div class="categoryColor" style="background-color: blue"></div>
                        </div>
                    </div>
                </div>

                <div class="assignedToAndSelect">
                    <span>Assigned to</span>
                    <select id="assignedTo" required> 
                        <option value="" disabled selected>Select contacts to assign</option>
                    </select>
                </div>

                <div class="assignedToList" id="assignedToList">

                </div>
            </div>

            <div class="borderline"></div>

            <div class="contentRight">
                <div class="dueDateAndInput">
                    <span>Due Date</span>
                    <input type="date" id="date" required placeholder="dd/mm/yyyy" onchange="pushDate()">
                </div>

                <div class="prio">
                    <span>Prio</span>
                    <div class="prioButtons">
                        <button type="button" id="urgent" value="urgent">
                            Urgent
                            <img id="urgentIcon" src="./img/urgentIcon.png">
                        </button>

                        <button type="button" id="medium" value="medium">
                            Medium
                            <img id="mediumIcon" src="./img/mediumIcon.png">
                        </button>

                        <button type="button" id="low" value="low">
                            Low
                            <img id="lowIcon" src="./img/lowIcon.png">
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

function generateTwoButtonsContainer() {
    return /*html*/ `
        <div class="twoButtons">
            <button id="reset" type="reset" class="clearButton" onclick="clearFields()" onmouseover="changeClearBtnIconToHover('clearIconDefault', 'clearIconHover')" onmouseout="changeClearBtnIconToDefault('clearIconHover', 'clearIconDefault')">
                Clear
                <img src="./img/cancelIcon.png" id="clearIconDefault">
                <img src="./img/clearIconHover.png" id="clearIconHover" class="d-none">
            </button>

            <button type="submit" class="createTaskButton" id="createTask">
                Create Task
                <img src="./img/checkIcon.png">
            </button>
        </div>
    `;
}