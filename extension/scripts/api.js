/**
 * API service for communicating with the backend
 */

class ApiService {
    /**
     * Get the authentication token from storage
     * @returns {Promise<string|null>} The authentication token or null if not found
     */
    static async getAuthToken() {
        // If bypass auth is enabled, return a mock token
        if (config.debug && config.debug.bypassAuth) {
            console.log("API: Auth bypass enabled, returning mock token");
            return "mock_token_for_testing_only";
        }

        return new Promise((resolve) => {
            chrome.storage.local.get(
                [config.storageKeys.authToken],
                (result) => {
                    resolve(result[config.storageKeys.authToken] || null);
                }
            );
        });
    }

    /**
     * Make an authenticated API request
     * @param {string} endpoint - The API endpoint
     * @param {Object} options - Request options
     * @returns {Promise<Object>} The API response
     */
    static async request(endpoint, options = {}) {
        const token = await this.getAuthToken();

        if (!token && !options.public) {
            throw new Error("Authentication required");
        }

        const url = `${config.apiBaseUrl}${endpoint}`;

        const headers = {
            "Content-Type": "application/json",
            ...(token && !options.public
                ? { Authorization: `Bearer ${token}` }
                : {}),
        };

        const fetchOptions = {
            method: options.method || "GET",
            headers,
            ...(options.body ? { body: JSON.stringify(options.body) } : {}),
        };

        try {
            const response = await fetch(url, fetchOptions);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "API request failed");
            }

            return data;
        } catch (error) {
            console.error("API request error:", error);
            throw error;
        }
    }

    /**
     * Get all notes for the authenticated user
     * @returns {Promise<Array>} Array of notes
     */
    static async getNotes() {
        return this.request("/notes");
    }

    /**
     * Create a new note
     * @param {string} content - The note content
     * @returns {Promise<Object>} The created note
     */
    static async createNote(content) {
        return this.request("/notes", {
            method: "POST",
            body: { content },
        });
    }

    /**
     * Update an existing note
     * @param {string} id - The note ID
     * @param {string} content - The updated note content
     * @returns {Promise<Object>} The updated note
     */
    static async updateNote(id, content) {
        return this.request(`/notes/${id}`, {
            method: "PUT",
            body: { content },
        });
    }

    /**
     * Delete a note
     * @param {string} id - The note ID
     * @returns {Promise<Object>} The response
     */
    static async deleteNote(id) {
        return this.request(`/notes/${id}`, {
            method: "DELETE",
        });
    }

    /**
     * Check if the API server is running
     * @returns {Promise<boolean>} True if the server is running
     */
    static async checkHealth() {
        try {
            const url = `${config.apiBaseUrl}/health`;
            console.log("Checking health at:", url);

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                console.error(
                    "Health check failed with status:",
                    response.status
                );
                return false;
            }

            const data = await response.json();
            console.log("Health check response:", data);
            return data.status === "ok";
        } catch (error) {
            console.error("Health check error:", error);
            return false;
        }
    }
}
