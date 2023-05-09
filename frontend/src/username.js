window.addEventListener("load",()=>{
    let LoggedName = localStorage.getItem("LoggedName")
    console.log(LoggedName)
    let signedInName = document.getElementById("username")


    let signupBtn = document.getElementById("signUpBtn")
    let logout = document.getElementById("logOutBtn")

    const urlParams = new URLSearchParams(window.location.search);
    const room = urlParams.get('name')
    console.log(room);
    
    if(room!==null){

            
            signedInName.textContent = `${room}`
          
            logout.style.display = "inline-block"
    }
    else if(LoggedName){

        signedInName.textContent = `${LoggedName}`
      
        logout.style.display = "inline-block"
    }
    else{
        window.location.href = "./login.html"
        signedInName.textContent = ''
      
        logout.style.display = "none"
    }


    
    logout.addEventListener("click", () => {
      
        room = null;
        localStorage.removeItem("LoggedName")
      
        signedInName.textContent = "";
   
        logout.style.display = "none"
        logout()
        window.location.href = "./login.html"
        
        logout.style.display = "none"
  
    })
})

async function logout(){
    let result = await fetch("https://prickly-dove-knickers.cyclic.app/user/logout")
    alert(result.msg) 
    console.log(result.msg) 
}



