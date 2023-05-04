// base url
// const baseurl = "http://localhost:2020";

// navigation elements
const url_list_btn = document.getElementById("nav-element-urls");
const stats_btn = document.getElementById("nav-element-stats");
const url_list = document.getElementById("main-shortener-box");
const stats = document.getElementById("main-graph-chart");
const dropdown_content = document.getElementById("dropdown-content");
const logout_btn = document.getElementById("nav-logout-btn");
const delete_btn = document.getElementById("nav-delete-btn");
const edit_btn = document.getElementById("nav-edit-btn");
const profile = document.getElementById("nav-element-account");

// overview elements
const all_links = document.getElementById("all-links");
const all_clicks = document.getElementById("all-clicks");
const this_month = document.getElementById("this-month");
const inc_this_month = document.getElementById("inc-this-month");

// shrink form
const shrink_form = document.getElementById("shortener-input");
const shrink_full_url = document.getElementById("full-url");
const full_url_btn = document.getElementById("full-url-btn");

// stats elements
const total_click = document.getElementById("total-click-chart");
const devices_click = document.getElementById("devices-click-chart");
const platforms_click = document.getElementById("platform-click-chart");
const location_click = document.getElementById("location-click-chart");
const browser_click = document.getElementById("browser-click-chart");

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


// navigaiton events
url_list_btn.addEventListener("click", () => {
    url_list.style.display = "block";
    stats.style.display = "none";
})

stats_btn.addEventListener("click", () => {
    url_list.style.display = "none";
    stats.style.display = "flex";
})

function dropdown_menu() {
    dropdown_content.style.display = "block";
}

logout_btn.addEventListener("click", async () => {
    let confirmation = confirm("Are you sure you want to log out?");
    if (confirmation) {
        localStorage.clear();
        window.location.href = "../index.html";
    }
})

delete_btn.addEventListener("click", async () => {
    let confirmation = confirm("Are you sure you want to delete");
    if (confirmation) {
        const id = localStorage.getItem("user");
        const request = await fetch(`${baseUrl}/users/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const response = await request.json();
        alert(response.msg);
        window.location.href = "../index.html";
    }
    else {
        window.location.reload();
    }
});

edit_btn.addEventListener("click", async () => {
    console.log("Edit user profile");
    let dropdown_content = document.getElementById("dropdown-content");
    dropdown_content.innerHTML = "";
    dropdown_content.innerHTML = `
                <button id="back_btn"><</button>
                <form>
                    <label for="new-password">New Password:</label>
                    <input type="password" id="new-password" name="new-password" required><br>

                    <label for="confirm-password">Confirm New Password:</label>
                    <input type="password" id="confirm-password" name="confirm-password" required><br>

                    <input id="submit_btn" type="submit" value="Update">
                </form>`

    let back_btn = document.getElementById("back_btn");
    back_btn.addEventListener("click", () => {
        window.location.reload();
    });

    let submit_btn = document.getElementById("submit_btn");
    submit_btn.addEventListener("click", async (e) => {
        e.preventDefault();
        submit_btn.innerHTML = `<i class="fa fa-spinner fa-spin"></i>`;
        // console.log("Please enter your new password")
        let new_password = document.getElementById("new-password").value;
        let confirm_password = document.getElementById("confirm-password").value;

        if (new_password == confirm_password) {
            console.log("true");
            let id = localStorage.getItem("user");
            console.log(id);
            let obj = {
                pass: new_password
            }
            let request = await fetch(`${baseUrl}/users/updatePassword/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            });
            let response = await request.json();
            // console.log(response);
            alert(response.msg);
            window.location.reload();
        }
        else {
            console.log("false");
        }
    });

});

// display data
function displayStats(userInfo) {
    // graph variables
    let date = [], date_wise_clicks = [];
    let devices = [], devices_wise_clicks = [];
    let platforms = [], platforms_wise_clicks = [];
    let locations = [], locations_wise_clicks = [];
    let browsers = [], browsers_wise_clicks = [];


    for (let i = 0; i < userInfo.date.length; i++) { date.push(userInfo.date[i]._id); date_wise_clicks.push(userInfo.date[i].count); }
    date.sort((a, b) => { return a - b });

    for (let i = 0; i < userInfo.devices.length; i++) { devices.push(userInfo.devices[i]._id); devices_wise_clicks.push(userInfo.devices[i].count); }

    for (let i = 0; i < userInfo.system.length; i++) { platforms.push(userInfo.system[i]._id); platforms_wise_clicks.push(userInfo.system[i].count); }

    for (let i = 0; i < userInfo.location.length; i++) { locations.push(userInfo.location[i]._id); locations_wise_clicks.push(userInfo.location[i].count); }

    for (let i = 0; i < userInfo.browsers.length; i++) { browsers.push(userInfo.browsers[i]._id); browsers_wise_clicks.push(userInfo.browsers[i].count); }

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

    let thisMonth = date;
    const d = new Date();
    let m = d.getMonth();
    let this_month_count = 0, inc_this_month_count = 0;
    userInfo.createdAt.forEach((data) => {
        if ((m + 1) == data._id) {
            this_month_count = data.count;
        }
        if (data._id == m) {
            inc_this_month_count = data.count;
            console.log("inc_this_month_count", inc_this_month_count)
        }
    })
    this_month.innerText = this_month_count;
    inc_this_month.innerText = this_month_count - inc_this_month_count || this_month_count;


    let xValues = date;
    new Chart(total_click, {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                data: date_wise_clicks,
                borderColor: 'rgb(255, 99, 132)',
                fill: true,
                backgroundColor: "#f7e8e7"
            }]
        },
        options: {
            legend: { display: false },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    new Chart(devices_click, {
        type: 'doughnut',
        data: {
            labels: devices,
            datasets: [{
                label: '# of Votes',
                data: devices_wise_clicks,
                borderWidth: 1,
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)',
                    '#4BC0C0',
                    '#C9CBCF'
                ],
                hoverOffset: 4
            }]
        }
    });

    new Chart(platforms_click, {
        type: 'polarArea',
        data: {
            labels: platforms,
            datasets: [{
                label: 'My First Dataset',
                data: platforms_wise_clicks,
                backgroundColor: [
                    'rgb(75, 192, 192)',
                    'rgb(255, 99, 132)',
                    'rgb(255, 205, 86)',
                    'rgb(201, 203, 207)',
                    'rgb(54, 162, 235)'
                ]
            }]
        }
    });

    xValues = locations;
    new Chart(location_click, {
        type: "bar",
        data: {
            labels: xValues,
            datasets: [{
                data: locations_wise_clicks,
                borderColor: "red",
                fill: true,
                backgroundColor: "#f7e8e7"
            }]
        },
        options: {
            legend: { display: false },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    new Chart(browser_click, {
        type: 'pie',
        data: {
            labels: browsers,
            datasets: [{
                label: '# of Votes',
                data: browsers_wise_clicks,
                borderWidth: 1,
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)',
                    '#4BC0C0',
                    '#C9CBCF'
                ],
                hoverOffset: 4
            }]
        }
    });

    // links
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
                    <div id=${element._id}>
                        <p id=${element._id}>${element.clicks}</p>Clicks
                    </div>
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
                box.appendChild(text);
                div.appendChild(ok);
                div.appendChild(cancel);
                box.appendChild(div);

                box.style.position = "fixed";
                box.style.right = "0px"
                box.style.top = "200px";
                document.body.appendChild(box);
            }
            let confirmation = confirmWindow();
            async function sureDelete() {
                const request = await fetch(`${baseUrl}/short/delete/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "userId": localStorage.getItem("user")
                    }
                })
                const response = await request.json();
                alertWindow("Link deleted successfully!!");
            }
        })
    });
}

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