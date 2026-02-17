import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    setPersistence, 
    browserLocalPersistence, 
    browserSessionPersistence,
    signOut
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBO1Qlu66KtqzC0XrnjgJyhoKLgOMUU1zo",
    authDomain: "chiefengineering-49745.firebaseapp.com",
    projectId: "chiefengineering-49745",
    storageBucket: "chiefengineering-49745.firebasestorage.app",
    messagingSenderId: "610373373596",
    appId: "1:610373373596:web:d8ff0b7e89c917981c2759",
    measurementId: "G-5FQLS2VMZZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// DOM Elements
const loginForm = document.getElementById("loginForm");
const loginButton = document.getElementById("loginButton");
const loginAlert = document.getElementById("loginAlert");
const username = document.getElementById("username");
const password = document.getElementById("password");

// Helper function to show alerts
function showAlert(message, type = "danger") {
    loginAlert.textContent = message;
    loginAlert.className = `alert alert-${type} show`;
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        loginAlert.classList.remove("show");
    }, 5000);
}

// Helper function to set loading state
function setLoading(isLoading) {
    if (isLoading) {
        loginButton.classList.add("loading");
        loginButton.disabled = true;
    } else {
        loginButton.classList.remove("loading");
        loginButton.disabled = false;
    }
}

// Form Submission Handler
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get form values
    const email = username.value.trim();
    const passwordValue = password.value;
    const rememberMe = document.getElementById("rememberMe").checked;

    // Basic validation
    if (!email || !passwordValue) {
        showAlert("Please enter both email and password");
        return;
    }

    try {
        // Show loading state
        setLoading(true);

        // Set persistence based on Remember Me
        if (rememberMe) {
            await setPersistence(auth, browserLocalPersistence);
        } else {
            await setPersistence(auth, browserSessionPersistence);
        }

        // Attempt sign in
        const userCredential = await signInWithEmailAndPassword(auth, email, passwordValue);
        const user = userCredential.user;

        // Check if user is admin
        if (user.email === "martinmwisa3@gmail.com") {
            showAlert("Login successful! Redirecting...", "success");
            
            // Redirect after short delay
            setTimeout(() => {
                window.location.href = "admin-dashboard.html";
            }, 1500);
        } else {
            // Not an admin - sign out and show error
            await signOut(auth);
            showAlert("Access denied. Admin privileges required.");
            setLoading(false);
        }

    } catch (error) {
        // Handle specific error messages
        let errorMessage = "Login failed. ";
        
        switch (error.code) {
            case "auth/invalid-credential":
                errorMessage += "Invalid email or password.";
                break;
            case "auth/user-not-found":
                errorMessage += "User not found.";
                break;
            case "auth/wrong-password":
                errorMessage += "Incorrect password.";
                break;
            case "auth/too-many-requests":
                errorMessage += "Too many failed attempts. Please try again later.";
                break;
            default:
                errorMessage += error.message;
        }
        
        showAlert(errorMessage);
        setLoading(false);
    }
});

// Password visibility toggle
function setupPasswordToggle() {
    const passwordField = document.querySelector(".input-icon");
    const toggleIcon = document.createElement("i");
    toggleIcon.className = "fas fa-eye password-toggle";
    
    if (passwordField) {
        passwordField.appendChild(toggleIcon);
        
        toggleIcon.addEventListener("click", () => {
            const type = password.type === "password" ? "text" : "password";
            password.type = type;
            toggleIcon.className = type === "password" ? "fas fa-eye password-toggle" : "fas fa-eye-slash password-toggle";
        });
    }
}

// Clear alert when user starts typing
[username, password].forEach(input => {
    if (input) {
        input.addEventListener("input", () => {
            loginAlert.classList.remove("show");
        });
    }
});

// Initialize password toggle
setupPasswordToggle();

// Optional: Add enter key support
password.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        loginForm.dispatchEvent(new Event("submit"));
    }
});