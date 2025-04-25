/**
 * Authentication service for handling Clerk authentication
 */

class AuthService {
    /**
     * Initialize Clerk
     * @returns {Promise<Clerk>} The Clerk instance
     */
    static async initClerk() {
        console.log("Initializing Clerk...");

        // Check if Clerk is already defined
        if (window.Clerk) {
            console.log("Clerk already initialized");
            return window.Clerk;
        }

        // Check if the Clerk function is available
        if (typeof Clerk !== "function") {
            console.error(
                "Clerk function is not available. Make sure the Clerk script is loaded correctly."
            );
            throw new Error(
                "Clerk is not defined. Script may not be loaded correctly."
            );
        }

        return new Promise((resolve, reject) => {
            try {
                console.log(
                    "Creating Clerk instance with key:",
                    config.clerkPublishableKey
                );
                window.Clerk = Clerk(config.clerkPublishableKey);

                console.log("Loading Clerk...");
                window.Clerk.load({
                    // Customize appearance
                    appearance: {
                        elements: {
                            rootBox: {
                                boxShadow: "none",
                                width: "100%",
                            },
                            card: {
                                border: "1px solid #E0E0E0",
                                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                            },
                            formButtonPrimary: {
                                backgroundColor: "#6C47FF",
                                "&:hover": {
                                    backgroundColor: "#5A3CD7",
                                },
                            },
                        },
                    },
                });

                console.log("Adding Clerk listener...");
                window.Clerk.addListener((event) => {
                    console.log("Clerk event:", event);
                    if (event.user) {
                        this.handleSignIn(event.user);
                    } else {
                        this.handleSignOut();
                    }
                });

                console.log("Clerk initialized successfully");
                resolve(window.Clerk);
            } catch (error) {
                console.error("Failed to initialize Clerk:", error);
                reject(error);
            }
        });
    }

    /**
     * Handle user sign in
     * @param {Object} user - The Clerk user object
     */
    static async handleSignIn(user) {
        try {
            // Get session token using our getToken method
            const token = await this.getToken();

            if (!token) {
                throw new Error("Failed to get authentication token");
            }

            // Save auth data to storage
            chrome.storage.local.set({
                [config.storageKeys.authToken]: token,
                [config.storageKeys.userId]: user.id,
                [config.storageKeys.userEmail]:
                    user.primaryEmailAddress?.emailAddress,
            });

            // Notify background service worker about sign in
            chrome.runtime.sendMessage({
                type: "AUTH_STATE_CHANGED",
                payload: { isSignedIn: true, userId: user.id },
            });

            // Update UI
            this.updateAuthUI(true, user);
        } catch (error) {
            console.error("Error handling sign in:", error);
            showStatusMessage("Failed to complete sign in", "error");
        }
    }

    /**
     * Handle user sign out
     */
    static async handleSignOut() {
        try {
            // Clear auth data from storage
            chrome.storage.local.remove([
                config.storageKeys.authToken,
                config.storageKeys.userId,
                config.storageKeys.userEmail,
            ]);

            // Notify background service worker about sign out
            chrome.runtime.sendMessage({
                type: "AUTH_STATE_CHANGED",
                payload: { isSignedIn: false },
            });

            // Update UI
            this.updateAuthUI(false);
        } catch (error) {
            console.error("Error handling sign out:", error);
        }
    }

    /**
     * Update the UI based on authentication state
     * @param {boolean} isSignedIn - Whether the user is signed in
     * @param {Object} user - The Clerk user object (if signed in)
     */
    static updateAuthUI(isSignedIn, user = null) {
        const authSection = document.getElementById("auth-section");
        const notesSection = document.getElementById("notes-section");
        const userSection = document.getElementById("user-section");

        if (isSignedIn && user) {
            // Hide auth section, show notes section
            authSection.classList.add("hidden");
            notesSection.classList.remove("hidden");

            // Update user section
            userSection.innerHTML = `
        <div class="user-info">
          <span class="user-email">${
              user.primaryEmailAddress?.emailAddress || "User"
          }</span>
          <button class="sign-out-btn" id="sign-out-btn">Sign Out</button>
        </div>
      `;

            // Add sign out button event listener
            document
                .getElementById("sign-out-btn")
                .addEventListener("click", () => {
                    window.Clerk.signOut();
                });

            // Load notes
            NotesService.loadNotes();
        } else {
            // Show auth section, hide notes section
            authSection.classList.remove("hidden");
            notesSection.classList.add("hidden");

            // Clear user section
            userSection.innerHTML = "";

            // Initialize Clerk auth UI
            const clerkAuthElement = document.getElementById("clerk-auth");
            if (clerkAuthElement && window.Clerk) {
                window.Clerk.mountSignIn(clerkAuthElement);
            }
        }
    }

    /**
     * Check if the user is signed in
     * @returns {Promise<boolean>} Whether the user is signed in
     */
    static async isSignedIn() {
        // If bypass auth is enabled, return true
        if (config.debug && config.debug.bypassAuth) {
            console.log("Auth bypass enabled, returning signed in");
            return true;
        }

        try {
            const clerk = await this.initClerk();
            return clerk.session !== null;
        } catch (error) {
            console.error("Error checking auth state:", error);
            return false;
        }
    }

    /**
     * Get the current user
     * @returns {Promise<Object|null>} The current user or null if not signed in
     */
    static async getCurrentUser() {
        // If bypass auth is enabled, return mock user
        if (config.debug && config.debug.bypassAuth) {
            console.log("Auth bypass enabled, returning mock user");
            return config.debug.mockUser;
        }

        try {
            const clerk = await this.initClerk();
            return clerk.user;
        } catch (error) {
            console.error("Error getting current user:", error);
            return null;
        }
    }

    /**
     * Get authentication token
     * @returns {Promise<string|null>} The authentication token or null
     */
    static async getToken() {
        // If bypass auth is enabled, return a mock token
        if (config.debug && config.debug.bypassAuth) {
            console.log("Auth bypass enabled, returning mock token");
            return "mock_token_for_testing_only";
        }

        try {
            const clerk = await this.initClerk();
            return clerk.session ? clerk.session.getToken() : null;
        } catch (error) {
            console.error("Error getting token:", error);
            return null;
        }
    }
}
