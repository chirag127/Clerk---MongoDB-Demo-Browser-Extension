# Clerk & MongoDB Demo Browser Extension

A fully functional browser extension demonstrating the integration of Clerk for authentication and MongoDB for data persistence within a Manifest V3 browser extension environment.

## Features

-   **User Authentication**: Sign up, sign in, and sign out using Clerk
-   **Session Management**: Persistent user sessions across browser restarts
-   **Data Storage**: Secure note creation, reading, updating, and deletion
-   **User-specific Data**: Each user can only access their own notes
-   **Secure API Communication**: JWT-based authentication between extension and backend

## Project Structure

-   **`extension/`**: Browser extension code (Manifest V3)
    -   `manifest.json`: Extension configuration
    -   `popup/`: HTML for the extension popup
    -   `background/`: Service worker for background tasks
    -   `scripts/`: JavaScript for the extension functionality
    -   `styles/`: CSS for styling the extension
    -   `assets/`: Icons and other assets
-   **`backend/`**: Node.js/Express API server
    -   `src/`: Source code
        -   `models/`: MongoDB data models
        -   `routes/`: API endpoints
        -   `middleware/`: Custom middleware functions
    -   `package.json`: Backend dependencies
    -   `.env.example`: Example environment variables

## Prerequisites

-   **Node.js** (v14 or higher)
-   **npm** or **yarn**
-   **MongoDB** (local instance or MongoDB Atlas)
-   **Clerk Account** (for authentication keys)
-   **Chrome**, **Edge**, or **Firefox** browser

## Setup Instructions

### 1. Clerk Setup

1. Create a Clerk account at [clerk.com](https://clerk.com)
2. Create a new application in the Clerk Dashboard
3. Get your **Publishable Key** and **Secret Key**
4. Configure your application to allow Email/Password authentication

### 2. MongoDB Setup

1. Set up a MongoDB database (local or MongoDB Atlas)
2. Get your MongoDB connection string
    - For MongoDB Atlas: Click "Connect" > "Connect your application" > Copy the connection string
    - Replace `<password>` with your database user's password

### 3. Backend Setup

1. Navigate to the backend directory:

    ```
    cd backend
    ```

2. Install dependencies:

    ```
    npm install
    ```

3. Create a `.env` file based on `.env.example`:

    ```
    # Clerk Authentication
    CLERK_SECRET_KEY=your_clerk_secret_key

    # MongoDB Connection
    MONGODB_URI=your_mongodb_connection_string

    # Server Configuration
    PORT=3000
    CORS_ORIGIN=chrome-extension://your_extension_id
    ```

4. Start the server:

    ```
    npm start
    ```

    The server should now be running at http://localhost:3000

### 4. Extension Setup

1. Open the `extension/scripts/config.js` file and update the Clerk publishable key:

    ```javascript
    clerkPublishableKey: "your_clerk_publishable_key";
    ```

2. Load the extension in your browser:

    - **Chrome/Edge**:
        - Go to `chrome://extensions/` or `edge://extensions/`
        - Enable "Developer mode"
        - Click "Load unpacked"
        - Select the `extension` folder

3. Get your extension ID:
    - After loading the extension, find its ID in the extensions page
    - Update the `CORS_ORIGIN` in your backend `.env` file with:
        ```
        CORS_ORIGIN=chrome-extension://your_extension_id
        ```
    - Restart the backend server

## Usage

1. Click on the extension icon to open the popup
2. Sign up for a new account or sign in with an existing account
3. Once signed in, you can:
    - View your notes
    - Add new notes
    - Edit existing notes
    - Delete notes
4. Sign out when finished

## Development Workflow

### Backend Development

-   The backend uses Express.js with MongoDB (via Mongoose)
-   Authentication is handled by Clerk's Node.js SDK
-   API endpoints are protected with Clerk's middleware
-   User data is isolated by associating each note with the user's Clerk ID

### Extension Development

-   The extension follows Manifest V3 specifications
-   Authentication is handled by Clerk's JavaScript SDK
-   The popup is the main user interface
-   The background service worker manages authentication state
-   API communication is secured with JWT tokens from Clerk

## Security Considerations

-   All API endpoints (except health check) require authentication
-   User data is isolated by user ID
-   JWT tokens are securely stored and managed
-   HTTPS is used for all API communication
-   Input is sanitized to prevent XSS attacks

## Troubleshooting

-   **Extension not connecting to backend**: Ensure the backend server is running and the CORS_ORIGIN is set correctly
-   **Authentication issues**: Verify your Clerk keys are correct
-   **Database connection errors**: Check your MongoDB connection string
-   **Console errors**: Check the browser console for specific error messages

## License

MIT

## Author

Chirag Singhal
