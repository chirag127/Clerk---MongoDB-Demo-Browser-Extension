/**
 * Main popup script
 * Initializes the extension popup and handles user interactions
 */

// Show a status message to the user
function showStatusMessage(message, type = "success") {
    const statusMessage = document.getElementById("status-message");

    statusMessage.textContent = message;
    statusMessage.className = "status-message";
    statusMessage.classList.add(`status-${type}`);
    statusMessage.classList.remove("hidden");

    // Hide the message after 3 seconds
    setTimeout(() => {
        statusMessage.classList.add("hidden");
    }, 3000);
}

// Add debug information to the UI
function addDebugInfo(message) {
    const debugContent = document.getElementById("debug-content");
    if (debugContent) {
        const timestamp = new Date().toLocaleTimeString();
        const debugLine = document.createElement("div");
        debugLine.textContent = `[${timestamp}] ${message}`;
        debugContent.appendChild(debugLine);
    }
}

// Initialize the popup
async function initPopup() {
    try {
        addDebugInfo("Starting initialization...");

        // Check if the API server is running
        addDebugInfo("Checking if backend server is running...");
        let isServerRunning = false;
        try {
            isServerRunning = await ApiService.checkHealth();
            addDebugInfo(
                `Backend server status: ${
                    isServerRunning ? "Running" : "Not running"
                }`
            );
        } catch (serverError) {
            addDebugInfo(`Error checking server: ${serverError.message}`);
        }

        if (!isServerRunning) {
            showStatusMessage(
                "Backend server is not running. Please start the server.",
                "error"
            );
        }

        // Initialize Clerk with a delay to ensure script is loaded
        addDebugInfo("Waiting for Clerk script to load...");

        // Wait for Clerk to be available with a timeout
        await new Promise((resolve, reject) => {
            let attempts = 0;
            const maxAttempts = 10; // Maximum number of attempts (5 seconds total)

            const checkClerk = () => {
                attempts++;
                if (typeof Clerk === "function") {
                    addDebugInfo("Clerk script loaded successfully");
                    resolve();
                } else if (attempts >= maxAttempts) {
                    addDebugInfo(
                        `Clerk not available after ${maxAttempts} attempts, giving up`
                    );
                    // Continue anyway, we'll handle the error in initClerk
                    resolve();
                } else {
                    addDebugInfo(
                        `Clerk not available yet, waiting... (attempt ${attempts}/${maxAttempts})`
                    );
                    setTimeout(checkClerk, 500);
                }
            };

            // Start checking after a short delay
            setTimeout(checkClerk, 1000);
        });

        addDebugInfo("Initializing Clerk...");
        addDebugInfo(`Using publishable key: ${config.clerkPublishableKey}`);

        try {
            await AuthService.initClerk();
            addDebugInfo("Clerk initialized successfully");
        } catch (clerkError) {
            addDebugInfo(`Clerk initialization error: ${clerkError.message}`);
            throw clerkError;
        }

        // Check if user is signed in
        addDebugInfo("Checking if user is signed in...");
        const isSignedIn = await AuthService.isSignedIn();
        addDebugInfo(`User signed in: ${isSignedIn}`);

        if (isSignedIn) {
            const user = await AuthService.getCurrentUser();
            addDebugInfo(`Current user: ${user.id}`);
            AuthService.updateAuthUI(true, user);
        } else {
            addDebugInfo("No user signed in, showing auth UI");
            AuthService.updateAuthUI(false);
        }

        // Set up event listeners
        addDebugInfo("Setting up event listeners");
        setupEventListeners();
        addDebugInfo("Initialization complete");
    } catch (error) {
        console.error("Error initializing popup:", error);
        addDebugInfo(`Fatal error: ${error.message}`);
        showStatusMessage("Failed to initialize extension", "error");
    }
}

// Test API connection
async function testApiConnection() {
    addDebugInfo("Testing API connection...");

    try {
        // Test health endpoint
        addDebugInfo("Testing health endpoint...");
        const healthUrl = `${config.apiBaseUrl}/health`;
        const healthResponse = await fetch(healthUrl);
        const healthData = await healthResponse.json();
        addDebugInfo(`Health endpoint response: ${JSON.stringify(healthData)}`);

        // Test test endpoint
        addDebugInfo("Testing test endpoint...");
        const testUrl = `${config.apiBaseUrl}/test`;
        const testResponse = await fetch(testUrl);
        const testData = await testResponse.json();
        addDebugInfo(`Test endpoint response: ${JSON.stringify(testData)}`);

        showStatusMessage("API connection successful", "success");
    } catch (error) {
        addDebugInfo(`API test error: ${error.message}`);
        showStatusMessage("API connection failed", "error");
    }
}

// Set up event listeners
function setupEventListeners() {
    // Add note button
    const addNoteBtn = document.getElementById("add-note-btn");
    if (addNoteBtn) {
        addNoteBtn.addEventListener("click", () => {
            const noteFormContainer = document.getElementById(
                "note-form-container"
            );
            noteFormContainer.classList.remove("hidden");
            document.getElementById("note-content").focus();
        });
    }

    // Cancel note button
    const cancelNoteBtn = document.getElementById("cancel-note-btn");
    if (cancelNoteBtn) {
        cancelNoteBtn.addEventListener("click", () => {
            NotesService.resetNoteForm();
        });
    }

    // Note form submission
    const noteForm = document.getElementById("note-form");
    if (noteForm) {
        noteForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const noteContent = document
                .getElementById("note-content")
                .value.trim();
            if (!noteContent) {
                showStatusMessage("Note content cannot be empty", "warning");
                return;
            }

            await NotesService.saveNote(noteContent);
        });
    }

    // Test API connection button
    const testApiBtn = document.getElementById("test-api-btn");
    if (testApiBtn) {
        testApiBtn.addEventListener("click", testApiConnection);
    }
}

// Initialize the popup when the DOM is loaded
document.addEventListener("DOMContentLoaded", initPopup);
