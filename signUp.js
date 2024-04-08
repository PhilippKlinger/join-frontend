let test123 = [];
let userLogin = [];
async function initLogin() {
  await loadUserLogin();
  await getMsg();
}

async function loadUserLogin() {
  let users = getContactsFromApi();
  userLogin = users;
}


async function signUp() {
  signUpbtn.disabled = true;
  let username = document.getElementById("signUpName").value;
  let email = document.getElementById("signUpEmail").value;
  let password = document.getElementById("signUpPassword").value;



  try {
    await signUpWithNameEmailAndPassword(username, email, password);
    //await createContactToApi(contactData); -> Todo
    window.location.replace("http://127.0.0.1:5500/templates/html/login.html?msg=Du hast dich erfolgreich registriert");
    console.log("Sign Up erfolgreich!");
    resetForm();
  } catch (error) {
    console.error(error);
    window.alert("Registrierung fehlgeschlagen: " + error.message);
    signUpbtn.disabled = false;
  }
}

function goBackToLogin() {
  window.location.href = "login.html";
}

function resetForm() {
  signUpName.value = "";
  signUpEmail.value = "";
  signUpPassword.value = "";
  signUpbtn.disabled = false;
}