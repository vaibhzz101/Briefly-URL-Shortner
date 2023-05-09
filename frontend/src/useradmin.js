
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