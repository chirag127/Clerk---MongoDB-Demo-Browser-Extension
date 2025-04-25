/**
 * Notes service for managing user notes
 */

class NotesService {
  static currentNotes = [];
  static editingNoteId = null;

  /**
   * Load notes from the API
   */
  static async loadNotes() {
    try {
      const notesList = document.getElementById('notes-list');
      const emptyNotes = document.querySelector('.empty-notes');
      const notesLoading = document.querySelector('.notes-loading');
      
      // Show loading state
      emptyNotes.classList.add('hidden');
      notesLoading.classList.remove('hidden');
      notesList.innerHTML = '';
      
      // Fetch notes from API
      const notes = await ApiService.getNotes();
      this.currentNotes = notes;
      
      // Hide loading state
      notesLoading.classList.add('hidden');
      
      // Display notes or empty state
      if (notes.length === 0) {
        emptyNotes.classList.remove('hidden');
        notesList.innerHTML = '';
      } else {
        emptyNotes.classList.add('hidden');
        this.renderNotes(notes);
      }
    } catch (error) {
      console.error('Error loading notes:', error);
      showStatusMessage('Failed to load notes', 'error');
    }
  }

  /**
   * Render notes in the UI
   * @param {Array} notes - Array of note objects
   */
  static renderNotes(notes) {
    const notesList = document.getElementById('notes-list');
    notesList.innerHTML = '';
    
    notes.forEach(note => {
      const noteElement = document.createElement('div');
      noteElement.className = 'note-card';
      noteElement.dataset.id = note._id;
      
      const createdDate = new Date(note.createdAt).toLocaleDateString();
      const updatedDate = new Date(note.updatedAt).toLocaleDateString();
      const dateDisplay = createdDate !== updatedDate 
        ? `Updated: ${updatedDate}` 
        : `Created: ${createdDate}`;
      
      noteElement.innerHTML = `
        <div class="note-content">${this.escapeHtml(note.content)}</div>
        <div class="note-meta">
          <span class="note-date">${dateDisplay}</span>
          <div class="note-actions">
            <button class="edit-note-btn" data-id="${note._id}">Edit</button>
            <button class="delete-note-btn" data-id="${note._id}">Delete</button>
          </div>
        </div>
      `;
      
      notesList.appendChild(noteElement);
    });
    
    // Add event listeners to edit and delete buttons
    document.querySelectorAll('.edit-note-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const noteId = e.target.dataset.id;
        this.startEditingNote(noteId);
      });
    });
    
    document.querySelectorAll('.delete-note-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const noteId = e.target.dataset.id;
        this.deleteNote(noteId);
      });
    });
  }

  /**
   * Start editing a note
   * @param {string} noteId - The ID of the note to edit
   */
  static startEditingNote(noteId) {
    const note = this.currentNotes.find(n => n._id === noteId);
    if (!note) return;
    
    this.editingNoteId = noteId;
    
    const noteFormContainer = document.getElementById('note-form-container');
    const noteContent = document.getElementById('note-content');
    const saveNoteBtn = document.getElementById('save-note-btn');
    
    noteContent.value = note.content;
    saveNoteBtn.textContent = 'Update';
    noteFormContainer.classList.remove('hidden');
    
    // Scroll to form and focus
    noteFormContainer.scrollIntoView({ behavior: 'smooth' });
    noteContent.focus();
  }

  /**
   * Save a new note or update an existing one
   * @param {string} content - The note content
   */
  static async saveNote(content) {
    try {
      if (this.editingNoteId) {
        // Update existing note
        await ApiService.updateNote(this.editingNoteId, content);
        showStatusMessage('Note updated successfully', 'success');
      } else {
        // Create new note
        await ApiService.createNote(content);
        showStatusMessage('Note created successfully', 'success');
      }
      
      // Reset form and reload notes
      this.resetNoteForm();
      await this.loadNotes();
    } catch (error) {
      console.error('Error saving note:', error);
      showStatusMessage('Failed to save note', 'error');
    }
  }

  /**
   * Delete a note
   * @param {string} noteId - The ID of the note to delete
   */
  static async deleteNote(noteId) {
    if (!confirm('Are you sure you want to delete this note?')) {
      return;
    }
    
    try {
      await ApiService.deleteNote(noteId);
      showStatusMessage('Note deleted successfully', 'success');
      
      // If we were editing this note, reset the form
      if (this.editingNoteId === noteId) {
        this.resetNoteForm();
      }
      
      // Reload notes
      await this.loadNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
      showStatusMessage('Failed to delete note', 'error');
    }
  }

  /**
   * Reset the note form
   */
  static resetNoteForm() {
    const noteFormContainer = document.getElementById('note-form-container');
    const noteContent = document.getElementById('note-content');
    const saveNoteBtn = document.getElementById('save-note-btn');
    
    noteContent.value = '';
    saveNoteBtn.textContent = 'Save';
    noteFormContainer.classList.add('hidden');
    this.editingNoteId = null;
  }

  /**
   * Escape HTML to prevent XSS
   * @param {string} html - The HTML string to escape
   * @returns {string} The escaped HTML
   */
  static escapeHtml(html) {
    const div = document.createElement('div');
    div.textContent = html;
    return div.innerHTML;
  }
}
