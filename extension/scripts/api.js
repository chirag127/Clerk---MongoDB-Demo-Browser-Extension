/**
 * Service for managing notes using chrome.storage.local.
 * This is a frontend-only implementation, replacing the original backend API service.
 */
class ApiService {
    /**
     * Retrieves all notes from local storage.
     * @returns {Promise<Array>} A promise that resolves to an array of notes.
     */
    static async getNotes() {
        return new Promise((resolve) => {
            chrome.storage.local.get(['notes'], (result) => {
                resolve(result.notes || []);
            });
        });
    }

    /**
     * Creates a new note and saves it to local storage.
     * @param {string} content - The content of the note.
     * @returns {Promise<Object>} A promise that resolves to the newly created note.
     */
    static async createNote(content) {
        const notes = await this.getNotes();
        const newNote = {
            id: crypto.randomUUID(),
            content: content,
            createdAt: new Date().toISOString(),
        };
        notes.push(newNote);
        return new Promise((resolve) => {
            chrome.storage.local.set({ notes: notes }, () => {
                resolve(newNote);
            });
        });
    }

    /**
     * Updates an existing note in local storage.
     * @param {string} id - The ID of the note to update.
     * @param {string} content - The updated content for the note.
     * @returns {Promise<Object|null>} A promise that resolves to the updated note, or null if not found.
     */
    static async updateNote(id, content) {
        const notes = await this.getNotes();
        const noteIndex = notes.findIndex((note) => note.id === id);

        if (noteIndex === -1) {
            return null; // Note not found
        }

        notes[noteIndex].content = content;
        notes[noteIndex].updatedAt = new Date().toISOString();

        return new Promise((resolve) => {
            chrome.storage.local.set({ notes: notes }, () => {
                resolve(notes[noteIndex]);
            });
        });
    }

    /**
     * Deletes a note from local storage.
     * @param {string} id - The ID of the note to delete.
     * @returns {Promise<{success: boolean}>} A promise that resolves to an object indicating success.
     */
    static async deleteNote(id) {
        let notes = await this.getNotes();
        const updatedNotes = notes.filter((note) => note.id !== id);

        return new Promise((resolve) => {
            chrome.storage.local.set({ notes: updatedNotes }, () => {
                resolve({ success: true });
            });
        });
    }

    /**
     * Saves a user-provided API key to local storage.
     * @param {string} apiKey - The API key to save.
     * @returns {Promise<{success: boolean}>} A promise that resolves to an object indicating success.
     */
    static async saveApiKey(apiKey) {
        return new Promise((resolve) => {
            chrome.storage.local.set({ 'user_api_key': apiKey }, () => {
                resolve({ success: true });
            });
        });
    }

    /**
     * Retrieves the user-provided API key from local storage.
     * @returns {Promise<string|null>} A promise that resolves to the API key or null if not set.
     */
    static async getApiKey() {
        return new Promise((resolve) => {
            chrome.storage.local.get(['user_api_key'], (result) => {
                resolve(result.user_api_key || null);
            });
        });
    }
}
