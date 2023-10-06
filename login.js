// login.js
document.addEventListener('DOMContentLoaded', function() {
    const phoneNumberInput = document.getElementById('phone-number');
    const loginButton = document.getElementById('login-button');
    
    loginButton.addEventListener('click', () => {
        const phoneNumber = phoneNumberInput.value.trim();
        if (phoneNumber !== '') {
            localStorage.setItem('phoneNumber', phoneNumber);
            window.location.href = 'walkie.html';
        }
    });
});
