/**
 * Configuration settings for the extension
 */

const config = {
    // Clerk publishable key (replace with your actual key)
    clerkPublishableKey:
        "pk_test_ZXhwZXJpZW5jZWQtbGFkeWJ1Zy0xMC5jbGVyay5hY2NvdW50cy5kZXYk",

    // API base URL (replace with your actual backend URL in production)
    apiBaseUrl: "http://localhost:3000/api",

    // Storage keys
    storageKeys: {
        authToken: "clerk_auth_token",
        userId: "clerk_user_id",
        userEmail: "clerk_user_email",
    },

    // Debug settings
    debug: {
        // Set to true to bypass Clerk authentication for testing
        // This will create a mock user session
        bypassAuth: true,

        // Mock user data for testing when bypassAuth is true
        mockUser: {
            id: "user_test123",
            primaryEmailAddress: {
                emailAddress: "test@example.com",
            },
        },
    },
};
