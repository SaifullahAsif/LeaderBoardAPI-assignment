async function addUser() {
    const user = document.getElementById('name').value;
    const score = document.getElementById('score').value;

    // Perform POST request to your API
    // Modify the URL accordingly
    const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/AwGso2ITXKcLS6cJVzRh/scores/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user,
            score,
        }),
    });

    if (response.ok) {
        // If the request is successful, update the table
        fetchUserRecords();
    } else {
        console.error('Failed to add user.');
    }
}

async function fetchUserRecords() {
    try {
        // Perform GET request to your API
        // Modify the URL accordingly
        const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/AwGso2ITXKcLS6cJVzRh/scores/');
        const data = await response.json();

        const tableBody = document.querySelector('#userTable tbody');
        tableBody.innerHTML = '';

        data.result.forEach(entry => {
            const row = tableBody.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);

            cell1.textContent = entry.user;
            cell2.textContent = entry.score;
        });
    } catch (error) {
        console.error('Failed to fetch user records:', error);
    }
}

// Fetch initial user records when the page loads
fetchUserRecords();
