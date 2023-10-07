document.addEventListener("DOMContentLoaded", function () {
    const createRoomButton = document.getElementById("create-room");
    const joinRoomButton = document.getElementById("join-room");
    const roomNameInput = document.getElementById("room-name");
    const roomCodeInput = document.getElementById("room-code");
    const walkieTalkie = document.getElementById("walkie-talkie");
    const recordButton = document.getElementById("record-button");
    const stopButton = document.getElementById("stop-button");
    const sendButton = document.getElementById("send-button");
    const chatBox = document.getElementById("chat-box"); // Added chat box element

    let isRecording = false;
    let mediaRecorder;
    let audioChunks = [];

    createRoomButton.addEventListener("click", createRoom);
    joinRoomButton.addEventListener("click", joinRoom);
    recordButton.addEventListener("click", toggleRecording);
    stopButton.addEventListener("click", stopRecording);
    sendButton.addEventListener("click", sendAudio);

    function createRoom() {
        const roomName = roomNameInput.value.trim();

        if (roomName !== "") {
            // Simulate room creation by displaying a message in the chat box
            displayMessage(`You created room "${roomName}".`);
            enableWalkieTalkie();
        } else {
            alert("Please enter a room name.");
        }
    }

    function joinRoom() {
        const roomCode = roomCodeInput.value.trim();

        if (roomCode !== "") {
            // Simulate joining the room by displaying a message in the chat box
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

    function sendAudio() {
        if (audioChunks.length > 0) {
            const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
            displayAudioMessage(audioBlob);
            audioChunks = [];
        }
    }

    function displayMessage(message) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message");
        messageElement.textContent = message;
        chatBox.appendChild(messageElement); // Append messages to the chat box
    }

    function displayAudioMessage(audioBlob) {
        const audioElement = document.createElement("audio");
        audioElement.src = URL.createObjectURL(audioBlob);
        audioElement.controls = true;

        const messageElement = document.createElement("div");
        messageElement.classList.add("message");
        messageElement.appendChild(audioElement);
        chatBox.appendChild(messageElement); // Append audio messages to the chat box
    }
});
 