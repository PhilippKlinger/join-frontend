let earliest = [];

async function initSummary() {
  await loadUserLogin();
  let currentUser = getCurrentUser();
  document.getElementById('contentSection').innerHTML = getSummarySection();
  document.getElementById('headlineDiv').innerHTML += getSummaryHeadlineDiv();
  document.getElementById('contentAndGreeting').innerHTML += getSummaryinnerContent();
  document.getElementById('contentAndGreeting').innerHTML += getSummaryGreeting(currentUser);
  loadTaskStat();
  searchDate();
  searchUrgentTasks()
  removeClassContentSectionAddTask();
}

function getCurrentUser() {
  let name;
  let email = localStorage.getItem('currentEmail');
  let index = userLogin.findIndex(function (currentUser) {
    return currentUser.email === email;
  });
  if (email) {
    name = userLogin[index]['name'];
  } else {
    name = 'Guest';
  }
  return name;
}

function searchUrgentTasks() {
  let prio = 'urgent';
  let urgentTasks = newTaskArray.filter(function (a) {
    return a.prio === prio;
  });
  let urgentTask = urgentTasks.length;
  document.getElementById('newsNumber').innerHTML = /*html*/`
  ${urgentTask}
  `;
}

function searchDate() {
  if (newTaskArray.length == 0) {
  }
  else {
    const minDate =
      newTaskArray.map(element => {
        return element.date;
      });
    earliest = minDate.reduce(function (pre, cur) {
      return Date.parse(pre) > Date.parse(cur) ? cur : pre;
    });
    console.log(earliest);
    generateDate(earliest);
  }
}

function generateDate(earliest) {
  document.getElementById('insertDate').innerHTML = /*html*/`
   ${earliest}
    `
}

function loadTaskStat() {
  let stat = '';
  for (let i = 0; i < newTaskArray.length; i++) {
    const element = newTaskArray[i];
    stat = newTaskArray[i]['stat'];
    let taskStat = newTaskArray.filter(function (a) {
      return a.stat === stat;
    });
    taskStats = taskStat.length;
    document.getElementById(stat).innerHTML = `    
    ${taskStats}`
  }
}

function getSummaryHeadlineDiv() {
  return /*html*/`   
          <h1 id="summaryHeadline" class="summaryHeadline">Summary</h1>
          <p id="nutshelltext" class="nutshelltext">Everything in a nutshell!</p>
  `
}

function getSummaryinnerContent() {
  return /*html*/`
  <div id="innerContentSummary" class="innerContentSummary">
    <div id="taskSection" class="d-flex taskSection">
      <div id="inBoardDiv" class="taskbox" onclick="renderBoard()">
        <div id="inBoard" class="tasknumber">${newTaskArray.length}</div>
        <p class="tasktext">Tasks in Board</p>
      </div>
      <div id="inProgressDiv" class="taskbox" onclick="renderBoard()">
        <div id="inProgress" class="tasknumber">0</div>
        <p class="tasktext">Tasks in Progress</p>
      </div>
      <div id="awaitingFeedbackDiv" class="taskbox" onclick="renderBoard()">
        <div id="awaitingFeedback" class="tasknumber">0</div>
        <p class="tasktext">Awaiting Feedback</p>
      </div>
    </div>
    <div id="newsAndDateDiv" class="newsAndDate pointer" onclick="renderBoard()">
      <div id="news" class="news">
        <img src="./img/urgent.png" alt="" />
        <div id="newsNumberAndText">
          <b id="newsNumber" class="newsNumber">0</b><br />
          Urgent
        </div>
      </div>
      <div id="dateDiv" class="date">
        <b id="insertDate" class="insertDate">0</b> <br />
        Upcoming Deadline
      </div>
    </div>
    <div id="personalTasks" class="personalTasks d-flex">
      <div id="todoDiv" class="personalTaskBox toDobg pointer" onclick="renderBoard()">
        <div id="toDoNumberAndText" class="marginLeft25">
          <b id="todo" class="toDoNumber">0</b><br />
          To Do
        </div>
      </div>
      <div id="doneDiv" class="personalTaskBox donebg pointer" onclick="renderBoard()">
        <div id="doneNumberAndText" class="marginLeft25">
          <b id="done" class="doneNumber">0</b><br />
          Done
        </div>
      </div>
    </div>
  </div>
  `
}

function getSummarySection() {
  return /*html*/`
      <div id="summarySection" class="summarySection">
        <div id="headlineDiv" class="d-flex headlineDiv">
        <div id= "managementText" class="managementText">Kanban Project Management Tool</div>
        </div>
        <div id="contentAndGreeting" class="d-flex contentAndGreeting ">
        </div>
      </div>
  `;
}

function getSummaryGreeting(currentUser) {
  return /*html*/`
              <div id="greeting" class="d-flex center greeting">
              <p class="goodMorning">Good Morning <br><b class="blueText">${currentUser}!<b></p>
            </div>
    `
}