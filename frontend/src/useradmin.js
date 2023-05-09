let tbody = document.getElementById("tbody");
    async function fetchUsers() {
        // try {
            const response = await fetch('https://prickly-dove-knickers.cyclic.app/user/allusers');
            const data = await response.json();
            display(data);
            console.log(data); // Just for debugging purposes
            let alldeletebtn = document.querySelectorAll(".delete");
            console.log(alldeletebtn);
            // Clear the existing table
            // allUserTable.innerHTML = '';
            alldeletebtn.forEach((item) => {

                item.addEventListener("click", async () => {
                    console.log(item.classList[0]);
                    let res = await fetch(`https://prickly-dove-knickers.cyclic.app/user/delete/${item.classList[0]}`, {
                        method: "DELETE",

                    })
                    if (res.ok) {
                        let r = res.json();

                        alert("delete successfully");
                        window.location.reload();


                    }
                })
            })

  
    }

fetchUsers();
    
function display(data) {

    data.forEach(user => {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        const emailCell = document.createElement('td');
        const idCell = document.createElement('td');
        const deleteCell = document.createElement('td');
        deleteCell.classList.add(user._id, "delete")

        nameCell.innerText = user.name;
        emailCell.innerText = user.email;
        idCell.innerText = user._id;
        deleteCell.innerText = 'Delete';

        // deleteCell.addEventListener('click', () => {
        //     deleteUser(user._id);
        // });

        row.append(nameCell, emailCell, idCell, deleteCell);
        tbody.append(row);
    });
}
