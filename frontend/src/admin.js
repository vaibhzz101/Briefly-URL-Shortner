const baseUrl = "https://prickly-dove-knickers.cyclic.app/";
const userId = localStorage.getItem("user");

// nav elements
const url_list_btn = document.getElementById("nav-urls");
const url_list = document.getElementById("main-shortener-box");
const dropdown_content = document.getElementById("dropdown-content");
const logout_btn = document.getElementById("nav-logout-btn");

// overview elements
const all_links = document.getElementById("all-links");
const all_clicks = document.getElementById("all-clicks");
const all_users = document.getElementById("all-users");

// shrink form
const shrink_form = document.getElementById("shortener-input");
const shrink_full_url = document.getElementById("full-url");
const search_category = document.getElementById("search-options");
const full_url_btn = document.getElementById("full-url-btn");

// url list elements
const url_list_box = document.getElementById("url-list-box");

countClicks()
async function fetchUsers() {
 
        const response = await fetch('https://prickly-dove-knickers.cyclic.app/user/allusers');
        const data = await response.json();
        console.log(data);
        display(data)
        all_users.innerText = data.length;
}
fetchUsers()
// navigaiton events


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


  all_links.innerText = data.length;

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
        const response = await fetch('https://prickly-dove-knickers.cyclic.app/user/allusers');
        const data = await response.json();
        console.log(data); 
      
        url_list_box.innerHTML = data.map(element => {
       all_users.innerText = data.length;
        return `
        <div class="url-list" id="url-list">
           <p id="client-id" ><strong>Client ID: </strong>${element._id}</p>
            <p><strong>Name: </strong>${element.name}</p>
            <p><strong>Email ID: </strong>${element.email}</p>
                             <button id=${element._id} )">user info</button>
       </div>
    `
    render(data) 
}).join("")
    } catch (error) {
        console.error(error);
    }

}

fetchUsers();

function countClicks(){
    fetch("https://prickly-dove-knickers.cyclic.app/url/")
    .then(res=>res.json())
    .then(res=>{
        let allClicks = 0;
        let allinks = res.length;
        res.forEach(element => {
            allClicks += Number(element.visited)
            
        });
        all_clicks.innerText = allClicks
        all_links.innerText = allinks
    })
}


shrink_form.addEventListener("submit", async (event) => {
    event.preventDefault();
    full_url_btn.innerHTML = `<i class="fa fa-spinner fa-spin"></i>`;
    const category = search_category.value || "name";
    const searchValue = shrink_full_url.value;
    // console.log(full);

    const request = await fetch(`${baseUrl}/admin?category=${category}&term=${searchValue}`)
    const response = await request.json();
    url_list_box.innerHTML = null;
    url_list_box.innerHTML = response.map(element => {
        return `
            <div class="url-list" id="url-list">
                <p id="client-id" ><strong>Client ID: </strong>${element._id}</p>
                <p><strong>Name: </strong>${element.name}</p>
                <p><strong>Email ID: </strong>${element.email}</p>
                <button id=${element._id} >User Detail</button>
            </div>
        `
    
    }).join("")
    full_url_btn.innerHTML = `Search`;
})




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


function render(data){
    url_list_box.innerHTML = data.data.map(element => {
        return `
            <div class="url-list" id="url-list">
                <p id="user-id" ><strong>USER ID: </strong>${element._id}</p>
                <p><strong>Name: </strong>${element.name}</p>
                <p><strong>Email ID: </strong>${element.email}</p>
                <button id=${element._id} >User Info</button>
            </div>
        `
    }).join("")

    const client_btn_arr = document.querySelectorAll("#url-list button");
    client_btn_arr.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const clientID = e.target.id;
            localStorage.setItem("clientID", clientID);
            window.location.href = "./userDetail.html";
        })
    })
}
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