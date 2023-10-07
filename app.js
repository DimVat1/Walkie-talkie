document.addEventListener("DOMContentLoaded", function () {
    const createRoomButton = document.getElementById("create-room");
    const joinRoomButton = document.getElementById("join-room");
    const roomNameInput = document.getElementById("room-name");
    const roomCodeInput = document.getElementById("room-code");
    const walkieTalkie = document.getElementById("walkie-talkie");
    const recordButton = document.getElementById("record-button");
    const sendButton = document.getElementById("send-button");
    const messageInput = document.getElementById("message-input");
    const chatBox = document.getElementById("chat-box");

    let isRecording = false;
    let mediaRecorder;
    let audioChunks = [];

    let peerConnection;
    let dataChannel;
    let roomJoined = false; // Flag to track if the user has joined or created a room

    createRoomButton.addEventListener("click", createRoom);
    joinRoomButton.addEventListener("click", joinRoom);
    recordButton.addEventListener("click", toggleRecording);
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
        roomJoined = true; // Set the flag to indicate the user has joined or created a room
        createPeerConnection();
    }

    function toggleRecording() {
        if (!roomJoined) {
            alert("You must join or create a room first.");
            return;
        }

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
                recordButton.textContent = "🔴";
            })
            .catch(function (error) {
                console.error("Error accessing microphone: " + error);
            });
    }

    function stopRecording() {
        if (mediaRecorder && mediaRecorder.state === "recording") {
            mediaRecorder.stop();
            isRecording = false;
            recordButton.textContent = "🎙️";
        }
    }

    function sendMessage() {
        if (!roomJoined) {
            alert("You must join or create a room first.");
            return;
        }

        const messageText = messageInput.value.trim();
        const audioBlob = audioChunks.length > 0 ? new Blob(audioChunks, { type: "audio/wav" }) : null;

        if (messageText !== "" || audioBlob) {
            if (messageText !== "") {
                displayMessage(`You: ${messageText}`);
                messageInput.value = ""; // Clear the input field
                sendTextMessage(messageText); // Send the text message
            }

            if (audioBlob) {
                displayAudioMessage(audioBlob);
                audioChunks = [];
                sendAudioData(audioBlob); // Send the audio recording
            }
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

    // Placeholder functions for WebRTC-related logic
    function createPeerConnection() {
        // Implement the logic to create a WebRTC peer connection
        // Configure ICE servers, create a data channel, and handle other WebRTC setup
    }

    function sendAudioData(audioBlob) {
        // Implement the logic to send audio data to the other peer
        // You'll need to use the dataChannel to send audioBlob to the peer
    }

    function sendTextMessage(text) {
        // Implement the logic to send a text message to the other peer
        // You'll need to use the dataChannel to send text messages to the peer
    }

    function handleIncomingIceCandidate(candidate) {
        // Implement the logic to handle incoming ICE candidates
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

    // Continue with the rest of your WebRTC-related code...
});
