// base url

const userId = localStorage.getItem("clientID");

const shrink_form = document.getElementById("shortener-input");
const shrink_full_url = document.getElementById("full-url");
const full_url_btn = document.getElementById("full-url-btn");
const baseUrl = "https://prickly-dove-knickers.cyclic.app"
const linkCount = document.getElementById('all-links')
const totalClicks = document.getElementById('all-clicks')
const username = document.getElementById("username")


// url list elements
const url_list_box = document.getElementById("url-list-box");

console.log(`${baseUrl}/url/${localStorage.getItem("clientID")}`)
function getUserInfo() {

    fetch(`${baseUrl}/url/${localStorage.getItem("clientID")}`)
        .then(res => res.json())
        .then(res => {
            console.log(res)
            displayStats(res)
        })
}
getUserInfo();


logout_btn.addEventListener("click", async () => {

   localStorage.clear();
    window.location.href = "./index.html";

 })

// display data
function displayStats(userInfo) {
    url_list_box.innerHTML = userInfo.map(element => {
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
                      
                        <button id=${element._id}><span><img id=${element._id} src="" alt=""></span>
                            <p id=${element._id}>${element.visited}</p>Clicks
                        </button>
                    </div>
                </div>
            `
    }).join("")
    let clicks = 0;
    linkCount.innerText = userInfo.length;

    userInfo.forEach(element => {
        clicks += Number(element.visited)


    });
    totalClicks.innerText = clicks
    let copy_btn = document.querySelectorAll('#clipboard')
    copy_btn.forEach(btn => {
        btn.addEventListener('click', (e) => {
            navigator.clipboard.writeText(e.target.alt);
            // alert("Link copied to clipboard")
            swal({
                title: "Copied To Clipboard!",
                text: "You can now Paste🗒️ the Link Anywhere!",
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
                        // alert("URL has been deleted")
                        swal({
                            title: "Link Deleted Successfull!",
                            icon: "success"
                          }).then((value) => {
                            if (value) {
                              location.reload()
                            }
                          });
                        // displayStats(userInfo)
                    //  location.reload()
                    }
                })
            

        })
    });

}





