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
function guestLogIn() {
  window.location.replace("http://127.0.0.1:5500/index.html");
}


async function login() {
  let username = document.getElementById("loginEmail").value;
  let password = document.getElementById("loginPassword").value;

  try {
    const data = await loginWithUsernameAndPassword(username, password); 
    localStorage.setItem('authToken', data.token);
    window.location.replace("http://127.0.0.1:5500/index.html"); 
    console.log("login erfolgreich!");
  } catch (error) {
    console.error(error);
    document.getElementById("msgBox").innerHTML = `Email oder Passwort nicht korrekt!`;
    document.getElementById("msgBoxDiv").classList.remove("d-none");
  }
}
