const baseUrl = "https://localhost:8013/";
const userId = localStorage.getItem("user");

// nav elements
const url_list_btn = document.getElementById("nav-urls");
const stats_btn = document.getElementById("nav-stats");
const url_list = document.getElementById("main-shortener-box");
const stats = document.getElementById("main-graph-chart");
const dropdown_content = document.getElementById("dropdown-content");
const logout_btn = document.getElementById("nav-logout-btn");

// overview elements
const all_links = document.getElementById("all-links");
const all_clicks = document.getElementById("all-clicks");
// const this_month = document.getElementById("this-month");
// const inc_this_month = document.getElementById("inc-this-month");

// shrink form
const shrink_form = document.getElementById("shortener-input");
const shrink_full_url = document.getElementById("full-url");
const search_category = document.getElementById("search-options");
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
    const response = await fetch(`${baseUrl}/admin/getUsersInfo/`);
    const userInfo = await response.json();
    displayStats(userInfo);
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
        window.location.href = "./index.html";
    }
})

// display data
// function displayStats(userInfo) {
//     let date = [], date_wise_clicks = [];
//     let devices = [], devices_wise_clicks = [];
//     let platforms = [], platforms_wise_clicks = [];
//     let locations = [], locations_wise_clicks = [];
//     let browsers = [], browsers_wise_clicks = [];


//     for (let i = 0; i < userInfo.date.length; i++) { date.push(userInfo.date[i]._id); date_wise_clicks.push(userInfo.date[i].count); }
//     date.sort((a, b) => { return a - b });

//     for (let i = 0; i < userInfo.devices.length; i++) { devices.push(userInfo.devices[i]._id); devices_wise_clicks.push(userInfo.devices[i].count); }

//     for (let i = 0; i < userInfo.system.length; i++) { platforms.push(userInfo.system[i]._id); platforms_wise_clicks.push(userInfo.system[i].count); }

//     for (let i = 0; i < userInfo.location.length; i++) { locations.push(userInfo.location[i]._id); locations_wise_clicks.push(userInfo.location[i].count); }

//     for (let i = 0; i < userInfo.browsers.length; i++) { browsers.push(userInfo.browsers[i]._id); browsers_wise_clicks.push(userInfo.browsers[i].count); }

//     all_links.innerText = userInfo.links.length;

//     let clickCount = 0;
//     for (let i = 0; i < userInfo.clicks.length; i++) {
//         clickCount += userInfo.clicks[i]._id;
//     }
//     all_clicks.innerText = clickCount;

//     if (!clickCount) {
//         url_list.style.display = "block";
//         stats.style.display = "none";
//     }

//     let thisMonth = date;
//     const d = new Date();
//     let m = d.getMonth();
//     let count = 0, lastCount = 0;
//     thisMonth.forEach((date) => {
//         let month = date.split("/");
//         if (month[1] == m + 1) {
//             count++;
//         }
//         else if (month[1] - 1 == m) {
//             lastCount++;
//         }
//     })
//     this_month.innerText = userInfo.data.length;

//     let xValues = date;
//     new Chart(total_click, {
//         type: "line",
//         data: {
//             labels: xValues,
//             datasets: [{
//                 data: date_wise_clicks,
//                 borderColor: 'rgb(255, 99, 132)',
//                 fill: true,
//                 backgroundColor: "#f7e8e7"
//             }]
//         },
//         options: {
//             legend: { display: false },
//             scales: {
//                 y: {
//                     beginAtZero: true
//                 }
//             }
//         }
//     });

//     new Chart(devices_click, {
//         type: 'doughnut',
//         data: {
//             labels: devices,
//             datasets: [{
//                 label: '# of Votes',
//                 data: devices_wise_clicks,
//                 borderWidth: 1,
//                 backgroundColor: [
//                     'rgb(255, 99, 132)',
//                     'rgb(54, 162, 235)',
//                     'rgb(255, 205, 86)',
//                     '#4BC0C0',
//                     '#C9CBCF'
//                 ],
//                 hoverOffset: 4
//             }]
//         }
//     });

//     new Chart(platforms_click, {
//         type: 'polarArea',
//         data: {
//             labels: platforms,
//             datasets: [{
//                 label: 'My First Dataset',
//                 data: platforms_wise_clicks,
//                 backgroundColor: [
//                     'rgb(75, 192, 192)',
//                     'rgb(255, 99, 132)',
//                     'rgb(255, 205, 86)',
//                     'rgb(201, 203, 207)',
//                     'rgb(54, 162, 235)'
//                 ]
//             }]
//         }
//     });

//     xValues = locations;
//     new Chart(location_click, {
//         type: "bar",
//         data: {
//             labels: xValues,
//             datasets: [{
//                 data: locations_wise_clicks,
//                 borderColor: "red",
//                 fill: true,
//                 backgroundColor: "#f7e8e7"
//             }]
//         },
//         options: {
//             legend: { display: false },
//             scales: {
//                 y: {
//                     beginAtZero: true
//                 }
//             }
//         }
//     });

//     new Chart(browser_click, {
//         type: 'pie',
//         data: {
//             labels: browsers,
//             datasets: [{
//                 label: '# of Votes',
//                 data: browsers_wise_clicks,
//                 borderWidth: 1,
//                 backgroundColor: [
//                     'rgb(255, 99, 132)',
//                     'rgb(54, 162, 235)',
//                     'rgb(255, 205, 86)',
//                     '#4BC0C0',
//                     '#C9CBCF'
//                 ],
//                 hoverOffset: 4
//             }]
//         }
//     });

 

//     url_list_box.innerHTML = userInfo.data.map(element => {
//         return `
//             <div class="url-list" id="url-list">
//                 <p id="client-id" ><strong>Client ID: </strong>${element._id}</p>
//                 <p><strong>Name: </strong>${element.name}</p>
//                 <p><strong>Email ID: </strong>${element.email}</p>
//                 <button id=${element._id} >Client Info</button>
//             </div>
//         `
//     }).join("")

//     const client_btn_arr = document.querySelectorAll("#url-list button");
//     client_btn_arr.forEach(btn => {
//         btn.addEventListener("click", (e) => {
//             const clientID = e.target.id;
//             localStorage.setItem("clientID", clientID);
//             window.location.href = "./html/client-page.html";
//         })
//     });
// }

// shrink url
shrink_form.addEventListener("submit", async (event) => {
    event.preventDefault();
    full_url_btn.innerHTML = `<i class="fa fa-spinner fa-spin"></i>`;
    const category = search_category.value || "name";
    const searchValue = shrink_full_url.value;

    const request = await fetch(`${baseUrl}/admin?category=${category}&term=${searchValue}`)
    const response = await request.json();
    url_list_box.innerHTML = null;
    url_list_box.innerHTML = response.map(element => {
        return `
            <div class="url-list" id="url-list">
                <p id="client-id" ><strong>Client ID: </strong>${element._id}</p>
                <p><strong>Name: </strong>${element.name}</p>
                <p><strong>Email ID: </strong>${element.email}</p>
                <button id=${element._id} >Client Info</button>
            </div>
        `
    }).join("")
    full_url_btn.innerHTML = `Search`;
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