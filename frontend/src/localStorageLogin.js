window.addEventListener("load",()=>{
    // let LoggedName = JSON.parse(localStorage.getItem("LoggedName"))
    let LoggedName = JSON.parse(localStorage.getItem("LoggedName"))
    console.log(LoggedName)
    let signedInName = document.getElementById("username")
    let signupBtn = document.getElementById("signUpBtn")
    let logout = document.getElementById("logOutBtn")

    if(LoggedName === null){
        // window.location.href = "./login.html"
        // signupBtn.style.display = "inline-block"
        logout.style.display = "none"
    }else{
        signedInName.textContent = `${LoggedName}`
        // signupBtn.style.display = "none"
        logout.style.display = "inline-block"
    }
    
    logout.addEventListener("click",()=>{
        localStorage.removeItem("LoggedName")
        signedInName.textContent = null;
        // signupBtn.style.display = "inline-block"
        logout.style.display = "none"
        window.location.href = "./index.html"
        // alert("You are logged out")
    })
})