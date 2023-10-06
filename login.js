document.addEventListener('DOMContentLoaded', function() {
    // Get references to HTML elements
    const phoneNumberInput = document.getElementById('phone-number');
    const loginButton = document.getElementById('login-button');

    // Add click event listener to the login button
    loginButton.addEventListener('click', handleLogin);

    // Function to handle login
    function handleLogin() {
        const phoneNumber = phoneNumberInput.value.trim();

        // Validate the phone number
        if (isValidPhoneNumber(phoneNumber)) {
            // Store the phone number in localStorage
            localStorage.setItem('phoneNumber', phoneNumber);
            
            // Redirect to the walkie-talkie page
            window.location.href = 'walkie.html';
        } else {
            // Show an alert if the phone number is invalid
            alert('Please enter a valid phone number.');
        }
    }

    // Function to validate the phone number
    function isValidPhoneNumber(phoneNumber) {
        // Remove spaces and hyphens from the phone number (if any)
        phoneNumber = phoneNumber.replace(/\s/g, '').replace(/-/g, '');

        // Check if the phone number contains only digits and has a length of 10
        return /^\d+$/.test(phoneNumber) && phoneNumber.length === 10;
    }
});
