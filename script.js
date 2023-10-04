document.addEventListener('DOMContentLoaded', () => {
    const messageDisplay = document.getElementById('message');
    const startRecordButton = document.getElementById('startRecord');
    const stopRecordButton = document.getElementById('stopRecord');
    const phoneNumberInput = document.getElementById('phoneNumber');
    const registerUserButton = document.getElementById('registerUser');
    const roomNameInput = document.getElementById('roomName');
    const createRoomButton = document.getElementById('createRoom');
    const joinPhoneNumberInput = document.getElementById('joinPhoneNumber');
    const joinRoomButton = document.getElementById('joinRoom');
    
    let mediaRecorder;
    let audioChunks = [];
    let currentUser = null;
    let currentRoom = null;

    startRecordButton.addEventListener('mousedown', startRecording);
    stopRecordButton.addEventListener('mouseup', stopRecording);
    registerUserButton.addEventListener('click', registerUser);
    createRoomButton.addEventListener('click', createRoom);
    joinRoomButton.addEventListener('click', joinRoom);

    function startRecording() {
        if (currentUser) {
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then((stream) => {
                    mediaRecorder = new MediaRecorder(stream);
                    mediaRecorder.ondataavailable = handleAudioData;
                    mediaRecorder.start();
                    startRecordButton.disabled = true;
                    stopRecordButton.disabled = false;
                })
                .catch((error) => {
                    console.error('Error accessing microphone:', error);
                });
        } else {
            alert('Please register with a phone number first.');
        }
    }

    function stopRecording() {
        if (mediaRecorder && mediaRecorder.state === 'recording') {
            mediaRecorder.stop();
        }
        startRecordButton.disabled = false;
        stopRecordButton.disabled = true;
    }

    function handleAudioData(event) {
        audioChunks.push(event.data);

        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob);

            const audio = new Audio(audioUrl);

            if (currentRoom) {
                // Send the audio data to the current room
                if (!currentRoom.messages) {
                    currentRoom.messages = [];
                }
                currentRoom.messages.push({ user: currentUser.phoneNumber, audio: audioBlob });
                // Save the updated room to local storage or your data storage mechanism
                localStorage.setItem('rooms', JSON.stringify(rooms));
                
                audio.play();

                // Update the message display
                messageDisplay.textContent = 'Received an audio message.';
            }

            // Reset the audioChunks array
            audioChunks = [];
        };
    }

    function registerUser() {
        const phoneNumber = phoneNumberInput.value;
        if (phoneNumber.trim() !== '') {
            currentUser = { phoneNumber };
            phoneNumberInput.value = '';
            updateUserDisplay();
        }
    }

    function createRoom() {
        const roomName = roomNameInput.value;
        if (roomName.trim() !== '') {
            const newRoom = { name: roomName, messages: [] };
            if (!localStorage.getItem('rooms')) {
                localStorage.setItem('rooms', JSON.stringify([]));
            }
            const rooms = JSON.parse(localStorage.getItem('rooms'));
            rooms.push(newRoom);
            localStorage.setItem('rooms', JSON.stringify(rooms));
            roomNameInput.value = '';
       
