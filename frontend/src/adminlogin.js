// let userid=document.getElementById("email");
// let button=document.getElementById("admin-btn");
let form = document.querySelector("form")
// let password=document.getElementById("password");

// let data = [
//     {
//         email: "admin@briefly.com",
//         pass: "briefly"
//     }
// ]
// button.addEventListener("click",(e)=>{
//     e.preventDefault();
//     localStorage.setItem("email", JSON.stringify(data))
//     let pass = form.password.value
//     let email = form.password.value

//     if(pass != "" && email != ""){
//     data.forEach((element)=>{
//       if(element.email == email && element.pass == pass){
//         localStorage.setItem("email", email)
//                alert("Welcome Back Admin !");
//                window.location.href="./admin.html";
//             }else{
//                 alert("Wrong Password. Re-Enter your Password !");
//             }
//         })
//         }
//     });

let data = [{ 
    email: "admin@briefly.com", 
     pass: "admin123" }
]
let emailValue = document.getElementById("email")
let passwordValue = document.getElementById("password")

// userinfo


form.addEventListener("submit", (e) => {
  e.preventDefault()
  localStorage.setItem("email", JSON.stringify(data))
  let pass1 = form.password.value
  let email1 = form.email.value
  if (pass1 != "" && email1 != "") {
    data.forEach((ele) => {
      if (ele.email == email1 && ele.pass == pass1) {
        localStorage.setItem("e", emailI)
        alert("Welcome Back Admin !");
        self.location = "./admin.html"
      }
      else{
        alert("you are not an admin !");
           
      }
    })
  }
})