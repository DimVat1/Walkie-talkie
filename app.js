document.addEventListener("DOMContentLoaded", function () {
    const createRoomButton = document.getElementById("create-room");
    const joinRoomButton = document.getElementById("join-room");
    const roomNameInput = document.getElementById("room-name");
    const roomCodeInput = document.getElementById("room-code");
    const walkieTalkie = document.getElementById("walkie-talkie");
    const recordButton = document.getElementById("record-button");
    const stopButton = document.getElementById("stop-button");
    const sendButton = document.getElementById("send-button");
    const messageInput = document.getElementById("message-input");
    const chatBox = document.getElementById("chat-box");

    let isRecording = false;
    let mediaRecorder;
    let audioChunks = [];

    createRoomButton.addEventListener("click", createRoom);
    joinRoomButton.addEventListener("click", joinRoom);
    recordButton.addEventListener("click", toggleRecording);
    stopButton.addEventListener("click", stopRecording);
    sendButton.addEventListener("click", sendMessage);

    function createRoom() {
        const roomName = roomNameInput.value.trim();

        if (roomName !== "") {
            displayMessage(`You created room "${roomName}".`);
            enableWalkieTalkie();
        } else {
            alert("Please enter a room name.");
        }
    }

    function joinRoom() {
        const roomCode = roomCodeInput.value.trim();

        if (roomCode !== "") {
            displayMessage(`You joined room with code: ${roomCode}`);
            enableWalkieTalkie();
        } else {
            alert("Please enter a room code.");
        }
    }

    function enableWalkieTalkie() {
        walkieTalkie.style.display = "block";
        createRoomButton.disabled = true;
        joinRoomButton.disabled = true;
        createPeerConnection();
    }

    function toggleRecording() {
        if (!isRecording) {
            startRecording();
        } else {
            stopRecording();
        }
    }

    function startRecording() {
        // Add recording logic as previously shown
        // ...
    }

    function stopRecording() {
        // Add stop recording logic as previously shown
        // ...
    }

    function sendAudioData(audioBlob) {
        // Send audio data logic as previously shown
        // ...
    }

    function sendMessage() {
        const messageText = messageInput.value.trim();

        if (messageText !== "") {
            const messageWithEmoji = `${messageText} 🎙️`;
            displayMessage(messageWithEmoji);
            messageInput.value = ""; // Clear the input field
        }
    }

    function displayMessage(message) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message");
        messageElement.textContent = message;
        chatBox.appendChild(messageElement);
    }

    // Other functions and WebRTC-related code as previously shown
});
