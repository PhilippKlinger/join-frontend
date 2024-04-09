let test123 = [];
let userLogin = [];
async function initLogin() {
  await getMsg();
}

async function signUp() {
  signUpbtn.disabled = true;
  let newUsername = document.getElementById("signUpName").value;
  let newEmail = document.getElementById("signUpEmail").value;
  let newPassword = document.getElementById("signUpPassword").value;

  let newUserData = {
    username: newUsername,
    email: newEmail,
    password: newPassword,
  }

  try {
    await signUpNewUserToApi(newUserData);
    //await createContactToApi(contactData);
    window.location.replace(`${baseUrl}/templates/html/login.html?msg=Du hast dich erfolgreich registriert`);
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