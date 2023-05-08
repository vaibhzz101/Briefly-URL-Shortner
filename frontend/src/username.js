window.addEventListener("load",()=>{
    let LoggedName = JSON.parse(localStorage.getItem("LoggedName"))
    console.log(LoggedName)
    let signedInName = document.getElementById("username")
    let signupBtn = document.getElementById("signUpBtn")
    let logout = document.getElementById("logOutBtn")

    const urlParams = new URLSearchParams(window.location.search);
    const room = urlParams.get('name')
    console.log(room);
    

    if(room === null){
        window.location.href = "./login.html"
        // signupBtn.style.display = "inline-block"
        logout.style.display = "none"
    }else{
        signedInName.textContent = `${room}`
        // signupBtn.style.display = "none"
        logout.style.display = "inline-block"
    }
    
    logout.addEventListener("click", () => {
        // if (signedInName.textContent ===`${room}`) {
        //     signedInName.textContent = "";  
        // }
        room = null;
        localStorage.removeItem("LoggedName")
        signedInName.textContent = "";
        // signupBtn.style.display = "inline-block"
        logout.style.display = "none"
        window.location.href = "./index.html"
        // alert("You are logged out")
    })
})




// let loggedUser = JSON.parse(localStorage.getItem("LoggedUser"));

// const urlParams = new URLSearchParams(window.location.search);
// const lid = urlParams.get("id");

// console.log(lid)
// let id;
// if (lid != null) {
//     id = lid;
// }
// else {
//     id = loggedUser.id;

// }
// // let email = loggedUser.email;
// let url = "http://localhost:8013/details/get";
// const users = async () => {
//     let res = await fetch(url, {
//         method: "GET",
//         headers:
//         {
//             "Content-Type": "application/json"
//         }
//     })
//     if (res.ok) {
//         let arr = await res.json();
//         display(arr);
    
//         let name;
//         for (let i = 0; i < arr.length; i++) {


//             if (arr[i]._id == data[0]) {

//                 name = arr[i].name;
//             }

//         }
//         signedInName.textContent = `${LoggedName}`
//     } 

//     }