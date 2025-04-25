/**
 * Background service worker for the Clerk & MongoDB Demo extension
 * Handles authentication state changes and token management
 */

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'AUTH_STATE_CHANGED') {
    handleAuthStateChanged(message.payload);
  }
  
  // Return true to indicate that we will respond asynchronously
  return true;
});

/**
 * Handle authentication state changes
 * @param {Object} payload - The auth state payload
 */
function handleAuthStateChanged(payload) {
  const { isSignedIn, userId } = payload;
  
  if (isSignedIn) {
    console.log('User signed in:', userId);
    
    // You could perform additional actions here when a user signs in
    // For example, syncing data or setting up alarms
  } else {
    console.log('User signed out');
    
    // You could perform cleanup actions here when a user signs out
  }
}

// When the service worker is installed
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('Extension installed');
    
    // You could set up initial state or show an onboarding page here
  } else if (details.reason === 'update') {
    console.log('Extension updated');
    
    // You could show release notes or migration information here
  }
});
