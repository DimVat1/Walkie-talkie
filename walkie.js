// walkie.js
document.addEventListener('DOMContentLoaded', function () {
    const roomControls = document.getElementById('room-controls');
    const chat = document.getElementById('chat');
    const messagesDiv = document.getElementById('messages');
    const inputBox = document.getElementById('message');
    const sendButton = document.getElementById('send-button');

    const phoneNumber = localStorage.getItem('phoneNumber');
    if (!phoneNumber) {
        // Redirect to login if no phone number is found
        window.location.href = 'login.html';
    }

    let currentRoom = null;

    // Function to display a message in the chat
    function displayMessage(sender, message) {
        const messageDiv = document.createElement('div');
        messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
        messagesDiv.appendChild(messageDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    // Simulate receiving a message from another user (Friend)
    function simulateReceivedMessage(message) {
        setTimeout(() => {
            displayMessage('Friend', message);
        }, 2000);
    }

    // Create Room button click event
    document.getElementById('create-room').addEventListener('click', () => {
        const roomName = document.getElementById('room-name').value.trim();
        if (roomName !== '') {
            currentRoom = roomName;
            roomControls.style.display = 'none';
            chat.style.display = 'block';
            displayMessage('System', `You created room "${roomName}"`);
        }
    });

    // Join Room button click event
    document.getElementById('join-button').addEventListener('click', () => {
        const roomName = document.getElementById('join-room').value.trim();
        if (roomName !== '') {
            currentRoom = roomName;
            roomControls.style.display = 'none';
            chat.style.display = 'block';
            displayMessage('System', `You joined room "${roomName}"`);
        }
    });

    // Send button click event
    sendButton.addEventListener('click', () => {
        const message = inputBox.value.trim();
        if (message !== '' && currentRoom !== null) {
            displayMessage('You', message);
            inputBox.value = '';
            // Simulate receiving a message from the other user in the room (Friend)
            simulateReceivedMessage(message);
        }
    });
});
