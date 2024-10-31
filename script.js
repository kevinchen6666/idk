// script.js

// Page Elements
const signupPage = document.getElementById('signup-page');
const loginPage = document.getElementById('login-page');
const mainPage = document.getElementById('main-page');

const toLoginLink = document.getElementById('to-login');
const toSignupLink = document.getElementById('to-signup');

const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');

const userNameDisplay = document.getElementById('user-name');
const logoutButton = document.getElementById('logout-button');

// User Data (Simulated database)
let users = {};

// Load existing users from localStorage
if (localStorage.getItem('users')) {
    users = JSON.parse(localStorage.getItem('users'));
}

// Navigation Functions
toLoginLink.addEventListener('click', () => {
    signupPage.classList.add('hidden');
    loginPage.classList.remove('hidden');
});

toSignupLink.addEventListener('click', () => {
    loginPage.classList.add('hidden');
    signupPage.classList.remove('hidden');
});

// Sign-Up Functionality
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('signup-username').value.trim();
    const password = document.getElementById('signup-password').value;

    if (users[username]) {
        alert('Username already exists!');
    } else {
        users[username] = password;
        localStorage.setItem('users', JSON.stringify(users));
        alert('Account created successfully!');
        signupForm.reset();
        signupPage.classList.add('hidden');
        loginPage.classList.remove('hidden');
    }
});

// Login Functionality
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;

    if (users[username] && users[username] === password) {
        loginUser(username);
    } else {
        alert('Invalid username or password!');
    }
});

// Login User
function loginUser(username) {
    userNameDisplay.textContent = username;
    loginPage.classList.add('hidden');
    mainPage.classList.remove('hidden');
    displayFeatures();
}

// Logout Functionality
logoutButton.addEventListener('click', () => {
    mainPage.classList.add('hidden');
    loginPage.classList.remove('hidden');
});

// Display Random Features
function displayFeatures() {
    const featuresContainer = document.getElementById('features');
    featuresContainer.innerHTML = ''; // Clear previous features

    // Example Features
    const features = [
        createClockFeature(),
        createQuoteFeature(),
        createColorChangerFeature(),
    ];

    features.forEach(feature => {
        featuresContainer.appendChild(feature);
    });
}

// Feature 1: Digital Clock
function createClockFeature() {
    const clockDiv = document.createElement('div');
    clockDiv.id = 'clock';
    clockDiv.style.fontSize = '2em';
    clockDiv.style.margin = '20px';

    function updateTime() {
        const now = new Date();
        clockDiv.textContent = now.toLocaleTimeString();
    }

    updateTime();
    setInterval(updateTime, 1000);

    return clockDiv;
}

// Feature 2: Random Inspiring Quote
function createQuoteFeature() {
    const quotes = [
        "The best way to predict the future is to invent it.",
        "Life is a journey, not a destination.",
        "Believe you can and you're halfway there.",
        "The only limit to our realization of tomorrow is our doubts of today.",
        "Innovation distinguishes between a leader and a follower."
    ];

    const quoteDiv = document.createElement('div');
    quoteDiv.id = 'quote';
    quoteDiv.style.fontStyle = 'italic';
    quoteDiv.style.margin = '20px';

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteDiv.textContent = `"${randomQuote}"`;

    return quoteDiv;
}

// Feature 3: Background Color Changer
function createColorChangerFeature() {
    const colorButton = document.createElement('button');
    colorButton.textContent = 'Change Background Color';
    colorButton.style.margin = '20px';

    colorButton.addEventListener('click', () => {
        const colors = ['#0e0e0e', '#1e1e1e', '#2e2e2e', '#3e3e3e'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        document.body.style.backgroundColor = randomColor;
    });

    return colorButton;
}

