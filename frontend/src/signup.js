/* register page */
let RegisterUserDataBase =
  JSON.parse(localStorage.getItem("userdatabase")) || [];

let UserFirstName = document.querySelector("#rohit_firstName");
let UserLastName = document.querySelector("#rohit_lastName");

let NewUserEmailAddress = document.querySelector("#rohit_emailR");
let NewUserPassword = document.querySelector("#rohit_passwordR");

let CreateAccountButton = document.querySelector("#rohit_buttonR");

CreateAccountButton.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    UserFirstName.value &&
    UserLastName.value &&
    NewUserEmailAddress.value &&
    NewUserPassword.value
  ) {
    let obj = {
      ufname: UserFirstName.value,
      ulname: UserLastName.value,
      useremail: NewUserEmailAddress.value,
      userpass: NewUserPassword.value,
    };

    let t = false;
for(let i = 0; i < RegisterUserDataBase.length; i++) {
  if(RegisterUserDataBase[i].useremail === obj.useremail){
    t  = true
    break;
  }
}
    if (t === true) {
      // alert user already registered
      alert("Your Account Already Exists, Try to Log in");
    } else {
      RegisterUserDataBase.push(obj);
      alert("Your account has been created, Please Log in now");
      console.log(RegisterUserDataBase);

      localStorage.setItem(
        "userdatabase",
        JSON.stringify(RegisterUserDataBase)
      );
    }
  } else {
    alert("Enter All The Details, To register");
  }
}); /* User and Admin login */


// Code for redirect to home
let imagelink = document.getElementById("rohit_homeLink")
imagelink.addEventListener("click", ()=>{
    window.location.href = "index.html"
})
// Code for redirect to home
