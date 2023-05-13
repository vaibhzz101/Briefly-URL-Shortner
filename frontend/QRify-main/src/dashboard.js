// // shrink form
// const shrink_form = document.getElementById("shortener-input");
// const shrink_full_url = document.getElementById("full-url");
// const full_url_btn = document.getElementById("full-url-btn");
// const baseUrl = "https://prickly-dove-knickers.cyclic.app"
// const linkCount = document.getElementById('all-links')
// const totalClicks = document.getElementById('all-clicks')

// // url list elements
// const url_list_box = document.getElementById("url-list-box");

// // making a get request to server for getting user information
// // async function getUserInfo() {
// //     const url = window.location.href;
// //     let userid = url.split("?")[1];
// //     let user;
// //     if (userid) {
// //         user = userid.split("=")[1];
// //     }
// //     if (user) {
// //         localStorage.setItem("user", user);
// //         let userId = user;
// //         const response = await fetch(`${baseUrl}/user/${userId}`);
// //         const userInfo = await response.json();
// //         // console.log(userInfo);
// //         displayStats(userInfo);
// //     }
// //     else {
// //         let userId = localStorage.getItem("user");
// //         const response = await fetch(`${baseUrl}/user/${userId}`);
// //         const userInfo = await response.json();
// //         // console.log(userInfo);
// //         displayStats(userInfo);
// //     }
// // }
// // getUserInfo();

// // const user = localStorage.getItem("user")
// // user = user.split('&')[0];

// // const userrid = localStorage.getItem("LoggedID") || user;
// // console.log(id)

// if(localStorage.getItem("LoggedID")){
//     var userrid = localStorage.getItem("LoggedID")
// }
// else{
//     const user = localStorage.getItem("user")
//     var userrid = user.split('&')[0];
// }

// console.log(userrid)

// shrink_form.addEventListener("submit", (event) => {
//     full_url_btn.innerHTML = `<i class="fa fa-spinner fa-spin"></i>`;
//     event.preventDefault();
//     const longurl = shrink_full_url.value;
//     const request = fetch(`${baseUrl}/url/assign`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",

//         },
//         body: JSON.stringify({ longurl, id:userrid })
//     })
//         .then(request => request.json())
//         .then(request => console.log(request))
//         .catch((err) => console.log(err))




//     alert("Your URL shrinked Successfully!!");
//     full_url_btn.innerHTML = "Shrink";
//     displayURLs(userrid)
// })

// // alert box


// function displayURLs(id) {
//     fetch(`${baseUrl}/url/${id}`)
//         .then(res => res.json())
//         .then(res => {
//             url_list_box.innerHTML = res.map(element => {
//                 return `
//                 <div class="url-list" id="url-list">
//                     <a target="_blank" class="fullUrl" id="fullUrl" href=${element.longurl}>${element.longurl}</a>
//                     <hr>
//                     <div class="shortUrl-box" id="shortUrl-box">
//                         <div>
//                             <a target="_blank" class="shortUrl" id="shortUrl" href=https://briefly.onrender.com/${element.shorturl}>https://briefly.onrender.com/${element.shorturl}</a>
//                             </div>
//                             <div class="pngfixing">
//                                 <img id="clipboard" src="./img/copy.png" alt=https://briefly.onrender.com/${element.shorturl}>
//                                 <img id="delete" src="./img/delete.png" alt=${element._id}>
//                             </div>
//                         <div id=${element._id}>
//                             <p id=${element._id}>${element.visited}</p>Clicks
//                         </div>
//                     </div>
//                 </div>
//             `
//             }).join("")
//             linkCount.innerText = res.length;
//             let sum = 0
//             for (let i = 0; i < res.length; i++) {
//                 sum += parseInt(res[i].visited);
//             }
//             totalClicks.innerText = sum;
//             let copy_btn = document.querySelectorAll('#clipboard')
//             copy_btn.forEach(btn => {
//                 btn.addEventListener('click', (e) => {
//                     navigator.clipboard.writeText(e.target.alt);
//                     alert("Link copied to clipboard")
//                 })
//             });

//             let delete_btn = document.querySelectorAll('#delete')
//             delete_btn.forEach(btn => {
//                 btn.addEventListener('click', (e) => {
//                     fetch(`${baseUrl}/url/delete/${e.target.alt}`)
//                         .then(res => res.json())
//                         .then(res => {
//                             console.log(res)
//                             if (res.msg == "URL Deleted") {
//                                 alert("URL has been deleted")
//                                 // displayStats(userInfo)
//                                 location.reload()
//                             }
//                         })


//                 })
//             });


//         })
//         .catch(err => console.log(err))


// }


// displayURLs(userrid)






// shrink form
const shrink_form = document.getElementById("shortener-input");
const shrink_full_url = document.getElementById("full-url");
const full_url_btn = document.getElementById("full-url-btn");
const baseUrl = "https://prickly-dove-knickers.cyclic.app"
const linkCount = document.getElementById('all-links')
const totalClicks = document.getElementById('all-clicks')

// url list elements
const url_list_box = document.getElementById("url-list-box");

// making a get request to server for getting user information
async function getUserInfo() {
    const url = window.location.href;
    let userid = url.split("?")[1];
    let user;
    if (userid) {
        user = userid.split("=")[1];
    }
    if (user) {
        localStorage.setItem("user", user);
        // let userId = user;
        // const response = await fetch(`${baseUrl}/user/${userId}`);
        // const userInfo = await response.json();
        // console.log(userInfo);
        // displayStats(userInfo);
    }
    else {
        let userId = localStorage.getItem("user");
        // const response = await fetch(`${baseUrl}/user/${userId}`);
        // const userInfo = await response.json();
        // console.log(userInfo);
        // displayStats(userInfo);
    }
}
getUserInfo();


if(localStorage.getItem("LoggedID")){
    var userrid = localStorage.getItem("LoggedID")
}
else{
    const user = localStorage.getItem("user")
    if(user)
        var userrid = user.split('&')[0];
}

console.log(userrid)


shrink_form.addEventListener("submit", (event) => {
    full_url_btn.innerHTML = `<i class="fa fa-spinner fa-spin"></i>`;
    event.preventDefault();
    const longurl = shrink_full_url.value;
    const request = fetch(`${baseUrl}/url/assign`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",

        },
        body: JSON.stringify({ longurl, id:userrid })
    })
        .then(request => request.json())
        .then(request => console.log(request))
        .catch((err) => console.log(err))




    // alert("Your URL shrinked Successfully!!");
    swal({
        title: "Shrinked Successfully!! ✅",
        text: "You can now access short link in Dashboard!",
        icon: "success",
        button: "Yay!🎉",
      }).then((value) => {
        if (value) {
          location.reload();
        }
      });
    full_url_btn.innerHTML = "Shrink";
    displayURLs(userrid)
})

// alert box


function displayURLs(id) {
    fetch(`${baseUrl}/url/${id}`)
        .then(res => res.json())
        .then(res => {
            url_list_box.innerHTML = res.map(element => {
                return `
                <div class="url-list" id="url-list">
                    <a target="_blank" class="fullUrl" id="fullUrl" href=${element.longurl}>${element.longurl}</a>
                    <hr>
                    <div class="shortUrl-box" id="shortUrl-box">
                        <div>
                            <a target="_blank" class="shortUrl" id="shortUrl" href=https://briefly.onrender.com/${element.shorturl}>https://briefly.onrender.com/${element.shorturl}</a>
                            </div>
                            <div class="pngfixing">
                                <img id="clipboard" src="./img/copy.png" alt=https://briefly.onrender.com/${element.shorturl}>
                                <img id="delete" src="./img/delete.png" alt=${element._id}>
                            </div>
                        <div id=${element._id}>
                            <p id=${element._id}>${element.visited}</p>Clicks
                        </div>
                    </div>
                </div>
            `
            }).join("")
            linkCount.innerText = res.length;
            let sum = 0
            for (let i = 0; i < res.length; i++) {
                sum += parseInt(res[i].visited);
            }
            totalClicks.innerText = sum;
            let copy_btn = document.querySelectorAll('#clipboard')
            copy_btn.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    navigator.clipboard.writeText(e.target.alt);
                    // alert("Link copied to clipboard")
                    swal({
                        title: "Link Copied to Clipboard!",
                        icon: "success",
                        button: "Yay!🎉",
                      })
                })
            });

            let delete_btn = document.querySelectorAll('#delete')
            delete_btn.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    fetch(`${baseUrl}/url/delete/${e.target.alt}`)
                        .then(res => res.json())
                        .then(res => {
                            console.log(res)
                            if (res.msg == "URL Deleted") {
                                // alert("URL has beem deleted")
                                // // displayStats(userInfo)
                                // location.reload()
                                swal({
                                    title: "Delted Successfully!",
                                    icon: "success",
                                  }).then((value) => {
                                    if (value) {
                                      window.location.href = "./dashboard.html";
                                    }
                                  });
                            }
                        })


                })
            });


        })
        .catch(err => console.log(err))


}


displayURLs(userrid)