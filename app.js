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

    let peerConnection;
    let dataChannel;

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
        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then(function (stream) {
                mediaRecorder = new MediaRecorder(stream);

                mediaRecorder.ondataavailable = function (event) {
                    if (event.data.size > 0) {
                        audioChunks.push(event.data);
                    }
                };

                mediaRecorder.onstop = function () {
                    const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
                    displayAudioMessage(audioBlob);
                    audioChunks = [];
                    sendAudioData(audioBlob); // Send the audio recording
                };

                mediaRecorder.start();
                isRecording = true;
                recordButton.textContent = "Stop Recording";
                sendButton.disabled = true; // Disable "Send" while recording
            })
            .catch(function (error) {
                console.error("Error accessing microphone: " + error);
            });
    }

    function stopRecording() {
        if (mediaRecorder && mediaRecorder.state === "recording") {
            mediaRecorder.stop();
            isRecording = false;
            recordButton.textContent = "Record";
            sendButton.disabled = false; // Re-enable "Send" after stopping
        }
    }

    function sendMessage() {
        const messageText = messageInput.value.trim();

        if (messageText !== "") {
            displayMessage(messageText);
            messageInput.value = ""; // Clear the input field
            sendTextMessage(messageText); // Send the text message
        }
    }

    function displayMessage(message) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message");
        messageElement.textContent = message;
        chatBox.appendChild(messageElement);
    }

    function displayAudioMessage(audioBlob) {
        const audioElement = document.createElement("audio");
        audioElement.src = URL.createObjectURL(audioBlob);
        audioElement.controls = true;

        const messageElement = document.createElement("div");
        messageElement.classList.add("message");
        messageElement.appendChild(audioElement);
        chatBox.appendChild(messageElement);
    }

    // Add other WebRTC-related functions and logic here
    // Replace these placeholder functions with actual implementations
    function sendIceCandidate(candidate) {
        // Implement the logic to send the ICE candidate to the other peer
    }

    function handleIncomingOffer(offer) {
        // Implement the logic to handle an incoming offer
    }

    function handleIncomingAnswer(answer) {
        // Implement the logic to handle an incoming answer
    }

    function sendAudioData(audioBlob) {
        // Implement the logic to send audio data to the other peer
        // You'll need to use the dataChannel to send audioBlob to the peer
    }

    function sendTextMessage(text) {
        // Implement the logic to send a text message to the other peer
        // You'll need to use the dataChannel to send text messages to the peer
    }

    function createPeerConnection() {
        // Implement the logic to create a WebRTC peer connection
        // Configure ICE servers, create data channel, and handle other WebRTC setup
    }

    // Handle incoming ICE candidates from the other peer
    function handleIncomingIceCandidate(candidate) {
        // Implement the logic to handle incoming ICE candidates
    }

    // Implement the rest of your WebRTC-related code here
});
