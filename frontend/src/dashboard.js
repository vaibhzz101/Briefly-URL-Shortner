
// shrink form
const shrink_form = document.getElementById("shortener-input");
const shrink_full_url = document.getElementById("full-url");
const full_url_btn = document.getElementById("full-url-btn");


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
        const response = await fetch(`${baseUrl}/short/user/${userId}`);
        const userInfo = await response.json();
        // console.log(userInfo);
        displayStats(userInfo);
    }
    else {
        let userId = localStorage.getItem("user");
        const response = await fetch(`${baseUrl}/short/user/${userId}`);
        const userInfo = await response.json();
        // console.log(userInfo);
        displayStats(userInfo);
    }
}
getUserInfo();


// 

// display data


// shrink url
shrink_form.addEventListener("submit", async (event) => {
    full_url_btn.innerHTML = `<i class="fa fa-spinner fa-spin"></i>`;
    event.preventDefault();
    const full = shrink_full_url.value;

    const request = await fetch(`${baseUrl}/short`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "userId": localStorage.getItem("user")
        },
        body: JSON.stringify({ full })
    })
    const response = await request.json();
    console.log(response);
    alertWindow("URL shrinked Successfully!!");
    full_url_btn.innerHTML = "Shrink";
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