
let form = document.querySelector("form")


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
        localStorage.setItem("e", email1)
        // alert("Welcome Back Admin !");
        // self.location = "./admin.html"
        swal({
          title: "Login Successful!",
          text: "Welcome Back! Admin ✅",
          icon: "success",
          button: "Yay!🎉",
        }).then((value) => {
          if (value) {
            window.location.href = "./admin.html";
          }
        });
      }
      else{
        // alert("you are not an admin !");
        swal({
          title: "Login Failed! ❌",
          text: "Enter Credentials Again",
          icon: "success",
          button: "Ok",
        })
           
      }
    })
  }
})