const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
      container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', () => {
      container.classList.remove('right-panel-active');
});



const form = document.getElementById('signup-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const mobileInput = document.getElementById('mobile');
    const passwordInput = document.getElementById('password');
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
    let previousPasswords = [];

    // Signup Logic

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Validate password
        console.log(passwordRegex.test(passwordInput.value));
        if (!passwordRegex.test(passwordInput.value)) {
            alert('Please enter a password that meets the required criteria.')
            return;
        }
        let data = {
            name: nameInput.value,
            email: emailInput.value,
            password: passwordInput.value
        }
        
        // Submit form
        console.log(data)
        fetch("https://prickly-dove-knickers.cyclic.app/user/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => {
                console.log("success", result)
                if(result){
                    alert("Sign Up Successfull")
                }
            })
            .catch(err => console.log(JSON.stringify(err)))

        });




// Sign In Logic

        let signInform = document.getElementById("signin-form")
        let signedInName = document.getElementById("signedIn_Name")
        let signupBtn = document.getElementById("signUpBtn")
        let logout = document.getElementById("logOutBtn")
        signInform.addEventListener("submit",(e)=>{
            e.preventDefault()
            let data = {
                email : signInform[0].value,
                password : signInform[1].value
            }
            fetchLogin(data)
            // console.log(form[0].value,form[1].value);
        })
         function fetchLogin(data){
            
            // fetch("https://prickly-dove-knickers.cyclic.app/user/login")
            // .then(res => res.json())
            // .then(data=> {
            //     // let token = false
            //     // for(let i=0;i<data.length;i++){
            //     //     if(data[i].email === dataInput.email && data[i].password === dataInput.password){
            //     //         // alert(`Welcome ${data[i].name}`)
            //     //         token = true;
            //     //         localStorage.setItem("signedOn",JSON.stringify(data[i]))
            //     //         let fName = data[i].first_name;
            //     //         localStorage.setItem("LoggedName",JSON.stringify(fName))
            //     //         alert("Login Successful")
            //     //         window.location.href = "./dashboard.html"
            //     //     }
            //     // }

            //     alert("Login Successful")
            //     window.location.href = "./dashboard.html"

            // })

            fetch("https://prickly-dove-knickers.cyclic.app/user/login", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => {
                console.log("success", result)
                if(result.msg==='Login Successful'){
                    console.log(result);
                    // console.log(data.name);
                    localStorage.setItem("LoggedName",result.name)
                    alert("Login Successfull")
                    window.location.href = "./dashboard.html"
                }
                else if(result.msg==='User not found'){
                    alert("User not found")
                }
                else{
                    alert("Wrong Credentials")
                }
                
            })
            .catch(err => console.log(err))

}
        