function getMsg() {
  const urlParams = new URLSearchParams(window.location.search);
  const msg = urlParams.get("msg");
  if (msg) {
    document.getElementById("msgBox").innerHTML = `${msg}`;
    document.getElementById("msgBoxDiv").classList.remove("d-none");
  } else {
    document.getElementById("msgBoxDiv").classList.remove("d-flex");
  }
}

function leadToSignUp() {
  window.location.href = "signUp.html";
}
async function guestLogIn() {
  let username = "Gast";
  let password = "gast1234#";

  try {
    const data = await loginWithUsernameAndPassword(username, password); 
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('username', username);
    window.location.replace(`${baseUrl}/index.html`); 
    console.log("login erfolgreich!");
  } catch (error) {
    console.error(error);
    document.getElementById("msgBox").innerHTML = `Username oder Passwort nicht korrekt!`;
    document.getElementById("msgBoxDiv").classList.remove("d-none");
  }
}


async function login() {
  let username = document.getElementById("loginEmail").value;
  let password = document.getElementById("loginPassword").value;

  try {
    const data = await loginWithUsernameAndPassword(username, password); 
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('username', username);
    window.location.replace(`${baseUrl}/index.html`); 
    console.log("login erfolgreich!");
  } catch (error) {
    console.error(error);
    document.getElementById("msgBox").innerHTML = `Username oder Passwort nicht korrekt!`;
    document.getElementById("msgBoxDiv").classList.remove("d-none");
  }
}
