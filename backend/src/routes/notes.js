/**
 * Notes routes
 * Handles CRUD operations for user notes
 */

const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const { verifyNoteOwnership } = require('../middleware/authorization');

/**
 * Get all notes for the authenticated user
 */
router.get('/', async (req, res) => {
  try {
    const userId = req.auth.userId;
    
    // Find all notes for the authenticated user
    const notes = await Note.find({ userId }).sort({ updatedAt: -1 });
    
    res.status(200).json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ 
      error: true, 
      message: 'An error occurred while fetching notes' 
    });
  }
});

/**
 * Create a new note
 */
router.post('/', async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.auth.userId;
    
    // Validate input
    if (!content || content.trim() === '') {
      return res.status(400).json({ 
        error: true, 
        message: 'Note content is required' 
      });
    }
    
    // Create new note
    const newNote = new Note({
      userId,
      content
    });
    
    // Save note to database
    await newNote.save();
    
    res.status(201).json(newNote);
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({ 
      error: true, 
      message: 'An error occurred while creating the note' 
    });
  }
});

/**
 * Get a specific note by ID
 */
router.get('/:id', verifyNoteOwnership, async (req, res) => {
  try {
    const noteId = req.params.id;
    
    // Find note by ID (ownership already verified by middleware)
    const note = await Note.findById(noteId);
    
    res.status(200).json(note);
  } catch (error) {
    console.error('Error fetching note:', error);
    res.status(500).json({ 
      error: true, 
      message: 'An error occurred while fetching the note' 
    });
  }
});

/**
 * Update a note
 */
router.put('/:id', verifyNoteOwnership, async (req, res) => {
  try {
    const noteId = req.params.id;
    const { content } = req.body;
    
    // Validate input
    if (!content || content.trim() === '') {
      return res.status(400).json({ 
        error: true, 
        message: 'Note content is required' 
      });
    }
    
    // Update note
    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      { content, updatedAt: Date.now() },
      { new: true }
    );
    
    res.status(200).json(updatedNote);
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json({ 
      error: true, 
      message: 'An error occurred while updating the note' 
    });
  }
});

/**
 * Delete a note
 */
router.delete('/:id', verifyNoteOwnership, async (req, res) => {
  try {
    const noteId = req.params.id;
    
    // Delete note
    await Note.findByIdAndDelete(noteId);
    
    res.status(200).json({ 
      success: true, 
      message: 'Note deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ 
      error: true, 
      message: 'An error occurred while deleting the note' 
    });
  }
});

module.exports = router;
