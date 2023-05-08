
// let logOut = document.getElementById('logoutBtn')
// logOut.addEventListener('click', ()=>{
//   window.location = 'homechauff.html'
// })

// let b = [];
// fetch(`https://63c67422dcdc478e15c1bf8d.mockapi.io/users`)
// .then((res)=>{
//     return res.json()
// })
// .then((data)=>{
//     b = data
//     display(data)
//     localStorage.setItem('users', JSON.stringify(b))
//     console.log(b)
// })

// window.onload = function(){
//     localStorage.setItem("users", JSON.stringify(a))
// }

// let a = JSON.parse(localStorage.getItem('users'))||[]
// let allUserTable = document.getElementById('allUserTable')
// function display(data){
//     allUserTable.innerHTML = null;
//     data.forEach((element, index) => {
//         let tr = document.createElement('tr')

//         let td1 = document.createElement('td')
//         td1.innerHTML = element.firstname+' '+element.lastname
//         td1.setAttribute('class', 'CD')

//         let td2 = document.createElement('td')
//         td2.innerHTML = element.email
//         td2.setAttribute('class', 'CD')

//         let td3 = document.createElement('td')
//         td3.innerHTML = element.mobile
//         td3.setAttribute('class', 'CD')

//         let td4 = document.createElement('td')
//         td4.innerHTML = element.gender
//         td4.setAttribute('class', 'CD')

//         let td5 = document.createElement('td')
//         td5.innerHTML = element.DOB
//         td5.setAttribute('class', 'CD')

//         let td6 = document.createElement('td')
//         td6.setAttribute('class', 'CD')
//         let delBtn = document.createElement('button')
//         delBtn.innerHTML = 'DELETE'
//         delBtn.addEventListener('click', ()=>{
//             del(element.id)
//             localStorage.setItem('users', JSON.stringify(data))
//             data.splice(index,1)
//             display(data)
//         })
//         // a.push(data)
//         // localStorage.setItem('users', JSON.stringify(a))
//         td6.append(delBtn)
//         tr.append(td1,td2,td3,td4,td5,td6)
//         allUserTable.append(tr)
//     });
// }

// function del(x){
//     fetch(`https://63c67422dcdc478e15c1bf8d.mockapi.io/users/${x}`,{
//         method:'DELETE'
//     })
// }

// async function fetchNote() {
//     try {

//         const res = await fetch(`https://rich-ruby-kitten-toga.cyclic.app/allusers`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             }
//         })
//         if (res.ok) {
//             let data = await res.json();
//             console.log(data)
//             display(data)
//         }
//     } catch (error) {
//         console.log(error.message);
//     }

// }

// fetchNote()


// let display = (data) => {
//     tbody.innerHTML = ''
//     data.forEach((element, index) => {
//         let row = document.createElement('tr')

//         let taskname = document.createElement('td')
//         taskname.innerText = element.name;

//         let type = document.createElement('td')
//         type.innerText = element.email;

//         let priority = document.createElement('td')
//         priority.innerText = element._id;

//         let completed = document.createElement('td')
//         completed.innerText = 'Delete';

//         completed.addEventListener('click', function () {
//             deleteNode(element._id)
//         })
//         hideLoading()
//         row.append(taskname, type, priority, completed)
//         tbody.append(row)
//     });
// }
const allUserTable = document.getElementById('allUserTable');

    async function fetchUsers() {
        try {
            const response = await fetch('https://prickly-dove-knickers.cyclic.app/user/allusers');
            const data = await response.json();
            console.log(data); // Just for debugging purposes

            // Clear the existing table
            allUserTable.innerHTML = '';

            // Add each user to the table
            data.forEach(user => {
                const row = document.createElement('tr');
                const nameCell = document.createElement('td');
                const emailCell = document.createElement('td');
                const idCell = document.createElement('td');
                const deleteCell = document.createElement('td');

                nameCell.innerText = user.name;
                emailCell.innerText = user.email;
                idCell.innerText = user._id;
                deleteCell.innerText = 'Delete';

                deleteCell.addEventListener('click', () => {
                    deleteUser(user._id);
                });

                row.append(nameCell, emailCell, idCell, deleteCell);
                allUserTable.append(row);
            });
        } catch (error) {
            console.error(error);
        }
    }

    fetchUsers();