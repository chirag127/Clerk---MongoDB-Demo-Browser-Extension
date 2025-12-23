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

// Set up event listeners
function setupEventListeners() {
    // Add note button
    document.getElementById("add-note-btn").addEventListener("click", () => {
        document.getElementById("note-form-container").classList.remove("hidden");
        document.getElementById("note-content").focus();
    });

    // Cancel note button
    document.getElementById("cancel-note-btn").addEventListener("click", () => {
        NotesService.resetNoteForm();
    });

    // Note form submission
    document.getElementById("note-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        const noteContent = document.getElementById("note-content").value.trim();
        if (noteContent) {
            await NotesService.saveNote(noteContent);
        } else {
            showStatusMessage("Note content cannot be empty", "warning");
        }
    });

    // Settings button
    document.getElementById("settings-btn").addEventListener("click", () => {
        document.getElementById("notes-section").classList.add("hidden");
        document.getElementById("settings-section").classList.remove("hidden");
        loadApiKey();
    });

    // API key form submission
    document.getElementById("api-key-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        const apiKey = document.getElementById("api-key-input").value.trim();
        await ApiService.saveApiKey(apiKey);
        showStatusMessage("API Key saved successfully!");
        document.getElementById("settings-section").classList.add("hidden");
        document.getElementById("notes-section").classList.remove("hidden");
    });

    // A simple debug button to show the saved API key
    document.getElementById("test-api-btn").addEventListener("click", async () => {
        const apiKey = await ApiService.getApiKey();
        addDebugInfo(`Current API Key: ${apiKey ? apiKey.substring(0, 5) + '...' : 'Not set'}`);
    });
}

// Load the API key into the settings input
async function loadApiKey() {
    const apiKey = await ApiService.getApiKey();
    if (apiKey) {
        document.getElementById("api-key-input").value = apiKey;
    }
}

// Initialize the popup when the DOM is loaded
document.addEventListener("DOMContentLoaded", initPopup);
