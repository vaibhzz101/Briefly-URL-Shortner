let RegisterUserDataBase=JSON.parse(localStorage.getItem("userdatabase")) || [];


let UserEmailAddress=document.querySelector("#rohit_email_input");
let UserPassword=document.querySelector("#rohit_password_input");
let UserLoginButton=document.querySelector("#rohit_login_button");

UserLoginButton.addEventListener("click",function(e){

    e.preventDefault()

   if(UserEmailAddress.value && UserPassword.value){
let logedInPerson = []
        let obj={
            username:UserEmailAddress.value,
            password:UserPassword.value
        }
        let found=0;

        for(let user of RegisterUserDataBase){
            if(user.useremail===obj.username && user.userpass===obj.password){
                logedInPerson.push(user)
               found=1;
               break;

            }
        }

        if(found===1){
            localStorage.setItem("logedinPerson", JSON.stringify(logedInPerson))
            window.location.href = "index.html"
        }

        else{
            console.log("wrong details.")
            alert("User dosen't exists, Register yourself")
        }

    }
    else{
        console.log("wrong details.")
        alert("Please add full Details")
    }

})
