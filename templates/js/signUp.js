let test123 = [];
let userLogin = [];
async function initLogin(){
  await loadUserLogin();
  await getMsg();
}

async function loadUserLogin() {
  let users = JSON.parse(await getItem("userLogin"));
  userLogin = users;
}

async function signUp() {
  signUpbtn.disabled = true;
  userLogin.push({
    name: signUpName.value,
    email: signUpEmail.value,
    password: signUpPassword.value,
  });

  await setItem("userLogin", JSON.stringify(userLogin));
  resetForm();
  window.location.href = "login.html?msg=Du hast dich erfolgreich registriert";
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