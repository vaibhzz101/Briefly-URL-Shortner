// base url

const userId = localStorage.getItem("clientID");

const shrink_form = document.getElementById("shortener-input");
const shrink_full_url = document.getElementById("full-url");
const full_url_btn = document.getElementById("full-url-btn");
const baseUrl = "https://prickly-dove-knickers.cyclic.app"
const linkCount = document.getElementById('all-links')
const totalClicks = document.getElementById('all-clicks')


// url list elements
const url_list_box = document.getElementById("url-list-box");

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


logout_btn.addEventListener("click", async() => {
 
    localStorage.clear();
    window.location.href = "../../index.html";
})

// display data
function displayStats(userInfo) {
   
    // overview elements
    all_links.innerText = userInfo.links.length;

    let clickCount = 0;
    for (let i = 0; i < userInfo.clicks.length; i++) {
        clickCount += userInfo.clicks[i]._id;
    }
    all_clicks.innerText = clickCount;

    if (!clickCount) {
        url_list.style.display = "block";
        stats.style.display = "none";
    }

   
   
    url_list_box.innerHTML = userInfo.data.map(element => {
        return `
            <div class="url-list" id="url-list">
                <a target="_blank" class="fullUrl" id="fullUrl" href=${element.full}>${element.full}</a>
                <hr>
                <div class="shortUrl-box" id="shortUrl-box">
                    <div>
                        <a target="_blank" class="shortUrl" id="shortUrl" href=${baseUrl}/short/${element.short}>${baseUrl}/short/${element.short}</a>
                        <div>
                            <img id="shortUrl-clipboard" src="../resources/dashboard/url-list/copy.png" alt=${baseUrl}/short/${element.short}>
                            <img id="shortUrl-delete" src="../resources/dashboard/url-list/delete.png" alt=${element._id}>
                        </div>
                    </div>
                    <button id=${element._id}><span><img id=${element._id} src="../resources/dashboard/overview/link.png" alt=""></span>
                        <p id=${element._id}>${element.clicks}</p>Clicks
                    </button>
                </div>
            </div>
        `
    }).join("")

    // copy url to clipboard
    let copy_url_btn_arr = document.querySelectorAll('#shortUrl-clipboard')
    copy_url_btn_arr.forEach(btn => {
        btn.addEventListener('click', (e) => {
            navigator.clipboard.writeText(e.target.alt);
            alertWindow("Link copied to clipboard")
        })
    });

    // delete the link
    let delete_url_btn_arr = document.querySelectorAll('#shortUrl-delete')
    delete_url_btn_arr.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            console.log(e.target.alt);
            const id = e.target.alt;
            function confirmWindow() {
                var box = document.createElement("div");
                box.className = "prompt-box";
                var div = document.createElement("div");
                var ok = document.createElement("button");
                var cancel = document.createElement("button");
                ok.innerHTML = "OK";
                cancel.innerHTML = "Cancel";
                ok.onclick = function () {
                    sureDelete();
                    document.body.removeChild(box);
                };
                cancel.onclick = function () { document.body.removeChild(box) }
                var text = document.createTextNode("Are you sure you want to delete this link?");
                // var input = document.createElement("textarea");
                box.appendChild(text);
                // box.appendChild(input);
                div.appendChild(ok);
                div.appendChild(cancel);
                box.appendChild(div);

                box.style.position = "fixed";
                box.style.right = "0px"
                box.style.top = "200px";
                document.body.appendChild(box);
            }
            // let confirmation = confirm("Are you sure you want to delete this link?");
            let confirmation = confirmWindow();
            async function sureDelete() {
                console.log(confirmation);
                console.log("sure to delete");
                const request = await fetch(`${baseUrl}/short/delete/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "userId": userId
                    }
                })
                const response = await request.json();
                console.log(response);
                alertWindow("Link deleted successfully!!");
                // alert("Link deleted successfully");
                // window.location.reload();
            }
    
        })
    });
    
    // get insights of a particular link
    const click_btn = document.querySelector("#url-list button");
    click_btn.addEventListener("click", async(e) => {
        let shortId = e.target.id;
        const response = await fetch(`${baseUrl}/short/user/link/${shortId}`);
        const userInfo = await response.json();
        console.log(userInfo);
        // displayStats(userInfo);  
    })
}

// shrink url
shrink_form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const full = shrink_full_url.value;
    console.log(full);

    const request = await fetch(`${baseUrl}/short`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "userId": userId
        },
        body: JSON.stringify({ full })
    })
    const response = await request.json();
    console.log(response);
    // window.location.reload();
    alertWindow("URL shrinked Successfully!!")
})

// alert box
function alertWindow(msg) {
    var box = document.createElement("div");
    box.className = "prompt-box";
    var div = document.createElement("div");
    var ok = document.createElement("button");
    // var cancel = document.createElement("button");
    ok.innerHTML = "OK";
    // cancel.innerHTML = "Cancel";
    ok.onclick = function () {
        // sureDelete();
        window.location.reload();
        document.body.removeChild(box);
    };
    // cancel.onclick = function() { document.body.removeChild(box) }
    var text = document.createTextNode(msg);
    // var input = document.createElement("textarea");
    box.appendChild(text);
    // box.appendChild(input);
    div.appendChild(ok);
    // div.appendChild(cancel);
    box.appendChild(div);

    box.style.position = "fixed";
    // box.style.right = (window.innerWidth / 2);
    box.style.right = "0px"
    box.style.top = "200px";
    document.body.appendChild(box);
}