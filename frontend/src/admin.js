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

// shrink form
const shrink_form = document.getElementById("shortener-input");
const shrink_full_url = document.getElementById("full-url");
const search_category = document.getElementById("search-options");
const full_url_btn = document.getElementById("full-url-btn");

// url list elements
const url_list_box = document.getElementById("url-list-box");

// making a get request to server for getting user information
// async function getUserInfo() {
//     const response = await fetch('http://localhost:8013/user/allusers');
//     const userInfo = await response.json();
//     displayStats(userInfo);
// }
// getUserInfo();

async function fetchUsers() {
 
        const response = await fetch('http://localhost:8013/user/allusers');
        const data = await response.json();
        // console.log(data);
        display(data)
}
fetchUsers()
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


  all_links.innerText = data.links.length;

   let clickCount = 0;
    for (let i = 0; i < data.clicks.length; i++) {
      clickCount += data.clicks[i]._id;
   }
      all_clicks.innerText = clickCount;

  if (!clickCount) {
       url_list.style.display = "block";
        stats.style.display = "none";
    }


   async function fetchUsers() {
    try {
        const response = await fetch('http://localhost:8013/user/allusers');
        const data = await response.json();
        console.log(data); // Just for debugging purposes

        // Clear the existing table
        url_list_box.innerHTML = data.map(element => {

        // Add each user to the table
       
        return `
        <div class="url-list" id="url-list">
           <p id="client-id" ><strong>Client ID: </strong>${element._id}</p>
            <p><strong>Name: </strong>${element.name}</p>
            <p><strong>Email ID: </strong>${element.email}</p>
                             <button id=${element._id} >Client Info</button>
       </div>
    `
}).join("")
    } catch (error) {
        console.error(error);
    }
}
fetchUsers();
















// shrink url
shrink_form.addEventListener("submit", async (event) => {
    event.preventDefault();
    full_url_btn.innerHTML = `<i class="fa fa-spinner fa-spin"></i>`;
    const category = search_category.value || "name";
    const searchValue = shrink_full_url.value;

    const request = await fetch(`${baseUrl}/user?category=${category}&term=${searchValue}`)
    const response = await request.json();
    url_list_box.innerHTML = null;
    url_list_box.innerHTML = response.map(element => {
        return `
            <div class="url-list" id="url-list">
                <p id="client-id" ><strong>Client ID: </strong>${element._id}</p>
                <p><strong>Name: </strong>${element.name}</p>
                <p><strong>Email ID: </strong>${element.email}</p>
                <button id=${element._id} >User Details</button>
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