
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
        let userId = user;
        const response = await fetch(`${baseUrl}/user/${userId}`);
        const userInfo = await response.json();
        // console.log(userInfo);
        displayStats(userInfo);
    }
    else {
        let userId = localStorage.getItem("user");
        const response = await fetch(`${baseUrl}/user/${userId}`);
        const userInfo = await response.json();
        // console.log(userInfo);
        displayStats(userInfo);
    }
}
getUserInfo();

// displayURLs()
// 

// display data

const id = localStorage.getItem("LoggedID")

// shrink url
shrink_form.addEventListener("submit",  (event) => {
    full_url_btn.innerHTML = `<i class="fa fa-spinner fa-spin"></i>`;
    event.preventDefault();
    const longurl = shrink_full_url.value;
    const request =  fetch(`${baseUrl}/url/assign`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // "userId": localStorage.getItem("user")
        },
        body: JSON.stringify({ longurl , id })
    })
    .then(request => request.json())
    .then(request=>console.log(request))
    .catch((err)=> console.log(err))



    // const response =  request.json();
    // console.log(response.shorturl);
    alert("Your URL shrinked Successfully!!");
    full_url_btn.innerHTML = "Shrink";
    displayURLs()
})

// alert box
function alertWindow(msg) {
    var box = document.createElement("div");
    box.className = "prompt-box";
    var div = document.createElement("div");
    var ok = document.createElement("button");
    ok.innerHTML = "OK";
    ok.onclick = function () {
        window.location.reload();
        document.body.removeChild(box);
    };
    var text = document.createTextNode(msg);
    box.appendChild(text);
    div.appendChild(ok);
    box.appendChild(div);

    box.style.position = "fixed";
    box.style.right = "0px"
    box.style.top = "200px";
    document.body.appendChild(box);
}

function displayURLs(){
    fetch(`${baseUrl}/url/${id}`)
    .then(res=>res.json())
    .then(res=>{
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
                                <img id="shortUrl-clipboard" src="./img/copy.png" alt=https://briefly.onrender.com/${element.shorturl}>
                                <img id="shortUrl-delete" src="./img/delete.png" alt=${element._id}>
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
    for(let i=0;i<res.length;i++){
        sum += parseInt(res[i].visited);
    }
    totalClicks.innerText = sum;

    })
    .catch(err=>console.log(err))


}


displayURLs()