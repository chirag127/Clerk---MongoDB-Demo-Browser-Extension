/**
 * Authorization middleware
 * Ensures users can only access their own data
 */

const Note = require('../models/Note');

/**
 * Middleware to verify that the user is authorized to access a specific note
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const verifyNoteOwnership = async (req, res, next) => {
  try {
    const noteId = req.params.id;
    const userId = req.auth.userId;

    // Find the note
    const note = await Note.findById(noteId);
    
    // Check if note exists
    if (!note) {
      return res.status(404).json({ error: true, message: 'Note not found' });
    }
    
    // Check if the authenticated user is the owner of the note
    if (note.userId !== userId) {
      return res.status(403).json({ 
        error: true, 
        message: 'You are not authorized to access this note' 
      });
    }
    
    // User is authorized, proceed to the next middleware
    next();
  } catch (error) {
    console.error('Authorization error:', error);
    res.status(500).json({ 
      error: true, 
      message: 'An error occurred while verifying authorization' 
    });
  }
};

module.exports = {
  verifyNoteOwnership
};
