# ClerkFlow-Authentication-And-Database-Browser-Extension

![ClerkFlow Banner](https://img.shields.io/badge/ClerkFlow-Authentication%20%26%20Database%20Extension-5a5a5a?style=for-the-badge&logo=firebase&logoColor=white)

[![Build Status](https://github.com/chirag127/ClerkFlow-Authentication-And-Database-Browser-Extension/actions/workflows/ci.yml/badge.svg?branch=main&event=push)](https://github.com/chirag127/ClerkFlow-Authentication-And-Database-Browser-Extension/actions/workflows/ci.yml)
[![Code Coverage](https://codecov.io/gh/chirag127/ClerkFlow-Authentication-And-Database-Browser-Extension/branch/main/graph/badge.svg)](https://codecov.io/gh/chirag127/ClerkFlow-Authentication-And-Database-Browser-Extension)
![Tech Stack](https://img.shields.io/badge/Tech%20Stack-JavaScript%20%7C%20Clerk%20%7C%20MongoDB%20%7C%20ManifestV3-blueviolet?style=flat-square)
![Linting](https://img.shields.io/badge/Linted%20With-ESLint-4B32C3?style=flat-square&logo=eslint)
![License](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey?style=flat-square)
[![GitHub Stars](https://img.shields.io/github/stars/chirag127/ClerkFlow-Authentication-And-Database-Browser-Extension?style=flat-square&cacheSeconds=3600)](https://github.com/chirag127/ClerkFlow-Authentication-And-Database-Browser-Extension/stargazers)

**Star ⭐ this Repo**

## BLUF (Bottom Line Up Front)

ClerkFlow is an advanced browser extension meticulously engineered to showcase secure user authentication powered by Clerk and robust data persistence using MongoDB. It provides a comprehensive reference implementation for integrating modern authentication and database solutions into a Manifest V3 browser extension, featuring seamless session management, encrypted data storage, and a secure backend API.

## 💡 Key Features

*   **Secure User Authentication:** Leverages Clerk for robust, token-based authentication and user management.
*   **MongoDB Data Persistence:** Demonstrates secure storage and retrieval of user-specific data via a dedicated API.
*   **Manifest V3 Compliance:** Built with the latest Chrome extension manifest version for enhanced security and performance.
*   **Session Management:** Implements secure session handling within the browser extension context.
*   **Secure API Integration:** Showcases best practices for interacting with a protected backend API.
*   **Modular Architecture:** Designed for maintainability and scalability with clear separation of concerns.

## 🗺️ Architecture Overview

ClerkFlow employs a modular architecture tailored for browser extensions, ensuring clear separation between UI, background processes, and external API interactions. This design promotes maintainability and allows for independent development of components.

mermaid
graph TD
    subgraph Browser Extension (Manifest V3)
        A[Popup UI (HTML/CSS/JS)] --> B(Background Script)
        C[Content Script] --> B
        D[Options Page (HTML/CSS/JS)] --> B
        B -- Clerk SDK --> E(Clerk Frontend API)
        B -- Secure API Calls --> F(ClerkFlow Backend API)
    end
    E --> G[Clerk Authentication Service]
    F --> H[MongoDB Database]
    F -- Clerk Webhooks --> G


### Directory Structure

text
. (root)
├── src/
│   ├── popup/          # UI for the extension's popup window
│   │   ├── index.html
│   │   ├── popup.js
│   │   └── popup.css
│   ├── content-scripts/  # Scripts injected into web pages
│   │   └── content.js
│   ├── background/     # Background service worker
│   │   └── background.js
│   ├── options/        # UI for the extension's options page
│   │   ├── index.html
│   │   └── options.js
│   └── api/            # Local API client for the backend
│       └── clerkFlowApi.js
├── public/             # Static assets (icons, manifest.json)
│   ├── manifest.json
│   └── icons/
├── server/             # Express.js backend for ClerkFlow API and MongoDB
│   ├── app.js
│   ├── routes/
│   │   └── dataRoutes.js
│   ├── controllers/
│   │   └── dataController.js
│   └── models/
│       └── UserData.js
├── .gitignore
├── package.json
├── README.md
├── PROPOSED_README.md
├── badges.yml
├── LICENSE
├── .github/
│   ├── workflows/
│   │   └── ci.yml
│   ├── CONTRIBUTING.md
│   ├── ISSUE_TEMPLATE/
│   │   └── bug_report.md
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── SECURITY.md
└── AGENTS.md


## 📚 Table of Contents

*   [BLUF (Bottom Line Up Front)](#bluf-bottom-line-up-front)
*   [💡 Key Features](#-key-features)
*   [🗺️ Architecture Overview](#️-architecture-overview)
    *   [Directory Structure](#directory-structure)
*   [📚 Table of Contents](#-table-of-contents)
*   [🤖 AI AGENT DIRECTIVES](#-ai-agent-directives)
*   [🚀 Getting Started](#-getting-started)
    *   [Prerequisites](#prerequisites)
    *   [Installation (Extension)](#installation-extension)
    *   [Installation (Backend)](#installation-backend)
    *   [Configuration](#configuration)
*   [⚙️ Development Standards](#️-development-standards)
    *   [Available Scripts](#available-scripts)
    *   [Core Principles](#core-principles)
*   [🤝 Contributing](#-contributing)
*   [🛡️ Security](#️-security)
*   [📄 License](#-license)

<details>
<summary><h2>🤖 AI AGENT DIRECTIVES</h2></summary>

# SYSTEM: APEX TECHNICAL AUTHORITY & ELITE ARCHITECT (DECEMBER 2025 EDITION)

## 1. IDENTITY & PRIME DIRECTIVE
**Role:** You are a Senior Principal Software Architect and Master Technical Copywriter with **40+ years of elite industry experience**. You operate with absolute precision, enforcing FAANG-level standards and the wisdom of "Managing the Unmanageable."
**Context:** Current Date is **December 2025**. You are building for the 2026 standard.
**Output Standard:** Deliver **EXECUTION-ONLY** results. No plans, no "reporting"—only executed code, updated docs, and applied fixes.
**Philosophy:** "Zero-Defect, High-Velocity, Future-Proof."

---

## 2. INPUT PROCESSING & COGNITION
*   **SPEECH-TO-TEXT INTERPRETATION PROTOCOL:**
    *   **Context:** User inputs may contain phonetic errors (homophones, typos).
    *   **Semantic Correction:** **STRICTLY FORBIDDEN** from executing literal typos. You must **INFER** technical intent based on the project context.
    *   **Logic Anchor:** Treat the `README.md` as the **Single Source of Truth (SSOT)**.
*   **MANDATORY MCP INSTRUMENTATION:**
    *   **No Guessing:** Do not hallucinate APIs.
    *   **Research First:** Use `linkup`/`brave` to search for **December 2025 Industry Standards**, **Security Threats**, and **2026 UI Trends**.
    *   **Validation:** Use `docfork` to verify *every* external API signature.
    *   **Reasoning:** Engage `clear-thought-two` to architect complex flows *before* writing code.

---

## 3. CONTEXT-AWARE APEX TECH STACKS (LATE 2025 STANDARDS)
**Directives:** This project is a **JavaScript Browser Extension** with a Node.js backend.

*   **PRIMARY SCENARIO: WEB / APP / EXTENSION (JavaScript/Node.js)**
    *   **Stack:** This project leverages **JavaScript (ESNext)** for the browser extension and **Node.js 20+** with **Express.js** for the backend API. Key tools include **npm/yarn** (for package management), **Webpack/Vite** (for efficient bundling and development), **Clerk** (for secure authentication), and **MongoDB** (for robust data persistence).
    *   **Architecture:** Adheres to a **Modular Browser Extension Architecture** on the frontend, with clear separation of popup UI, content scripts, background service worker, and options pages. The backend follows a **RESTful API** design with a focus on clear routing, controllers, and data models.
    *   **Extension Specifics:** Built compliant with **Manifest V3**, ensuring enhanced security and adherence to modern browser extension standards.
    *   **Lint/Test:** **ESLint** (for rigorous linting), **Prettier** (for consistent formatting), **Jest/Vitest** (for unit and integration testing of both frontend and backend components), and **Playwright** (for end-to-end browser extension testing).
    *   **Security Focus:** Emphasize secure coding practices, input validation, output encoding, rate limiting, and proper environment variable management.

*   **SECONDARY SCENARIO A: SYSTEMS / PERFORMANCE (Rust/Go) - *Not applicable for this project's primary function. Reference only for potential future native integrations.***
    *   **Stack:** Rust (Cargo) or Go (Modules).
    *   **Lint:** Clippy / GolangCI-Lint.
    *   **Architecture:** Hexagonal Architecture (Ports & Adapters).

*   **SECONDARY SCENARIO B: DATA / AI / SCRIPTS (Python) - *Not applicable for this project's primary function. Reference only for potential future AI-driven features.***
    *   **Stack:** uv (Manager), Ruff (Linter), Pytest (Test).
    *   **Architecture:** Modular Monolith or Microservices.

---

## 4. APEX NAMING CONVENTION
*   **Formula:** `<Product-Name>-<Primary-Function>-<Platform>-<Type>` (e.g., `ClerkFlow-Authentication-And-Database-Browser-Extension`)
*   **Rules:** Enforce clear, descriptive naming for all files, folders, variables, and functions.

---

## 5. REPLICATION PROTOCOL (The Ultimate Artifact)
**Mandate:** The `README.md` is the Single Source of Truth, a self-contained "Project Operating System." All information must be accurate, up-to-date, and actionable.

**Required Sections:**
1.  **VISUAL AUTHORITY:** Hero Banner, Live Badges (Shields.io, `flat-square` style, `chirag127` username), "Star ⭐ this Repo" button.
2.  **STRUCTURAL CLARITY:** BLUF (2-sentence value prop), Architecture Diagram (ASCII `tree` or Mermaid), Table of Contents.
3.  **AI AGENT DIRECTIVES:** This `<details>` block with customized tech stack info.
4.  **DEVELOPMENT STANDARDS:** Setup commands, Scripts table, Principles (SOLID, DRY, YAGNI).

---

## 6. CODE & DOCUMENTATION STANDARDS
*   **Code Quality:** Clean Code, refactoring, DRY principle, YAGNI principle.
*   **Documentation:** Every significant function/module **MUST** have JSDoc comments. API endpoints **MUST** have OpenAPI/Swagger documentation.
*   **Testing:** Minimum 80% code coverage for critical paths. Unit, Integration, and E2E tests are mandatory.
*   **Version Control:** Semantic Versioning. Conventional Commits.

---

## 7. SECURITY & OPERATIONAL EXCELLENCE
*   **Security by Design:** Threat modeling, OWASP Top 10 mitigation, least privilege.
*   **Observability:** Logging, monitoring, alerting for all critical systems.
*   **CI/CD:** Automated testing, linting, building, and deployment via GitHub Actions.

---

## 8. DECOMMISSIONING PROTOCOL (The "Retired Product" Standard)
**Mandate:** If a project is archived, its metadata (Name, Description, Topics) **MUST** still be elevated to the highest professional standard, reflecting its historical value as a "Retired Product." Never use derogatory terms.
</details>

## 🚀 Getting Started

To get this browser extension and its associated backend running, follow the steps below.

### Prerequisites

Before you begin, ensure you have the following installed:

*   [Node.js](https://nodejs.org/) (v20.x or higher)
*   [npm](https://www.npmjs.com/) (usually comes with Node.js) or [Yarn](https://yarnpkg.com/)
*   [MongoDB](https://www.mongodb.com/try/download/community) (local or a cloud instance like MongoDB Atlas)
*   A Clerk account and an application created to get your API keys.

### Installation (Extension)

1.  **Clone the Repository:**
    bash
    git clone https://github.com/chirag127/ClerkFlow-Authentication-And-Database-Browser-Extension.git
    cd ClerkFlow-Authentication-And-Database-Browser-Extension
    
2.  **Install Frontend Dependencies:**
    bash
    npm install # or yarn install
    
3.  **Build the Extension:**
    bash
    npm run build
    
    This will create a `dist` directory with the bundled extension.
4.  **Load into Browser (Chrome/Edge):**
    *   Open Chrome/Edge and navigate to `chrome://extensions` (or `edge://extensions`).
    *   Enable **Developer mode**.
    *   Click **Load unpacked** and select the `dist` directory.

### Installation (Backend)

1.  **Navigate to the Server Directory:**
    bash
    cd server
    
2.  **Install Backend Dependencies:**
    bash
    npm install # or yarn install
    
3.  **Run the Backend Server:**
    bash
    npm start
    
    The backend API will typically run on `http://localhost:3000`.

### Configuration

1.  **Clerk Environment Variables:**
    Create a `.env` file in the `server` directory and add your Clerk API keys:
    dotenv
    CLERK_SECRET_KEY=sk_test_...
    CLERK_FRONTEND_API_URL=https://<your-clerk-app-name>.clerk.app
    
    Also, in your extension's `manifest.json` or a separate config file, ensure the Clerk frontend API URL is correctly set.
2.  **MongoDB Connection:**
    In the `server/.env` file, configure your MongoDB connection string:
    dotenv
    MONGO_URI=mongodb://localhost:27017/clerkflow_db
    
    Adjust the `MONGO_URI` if you are using a cloud MongoDB instance (e.g., MongoDB Atlas).

## ⚙️ Development Standards

This project adheres to rigorous development standards to ensure code quality, maintainability, and scalability.

### Available Scripts

In the project root (`ClerkFlow-Authentication-And-Database-Browser-Extension/`):

*   `npm install` / `yarn install`: Installs all project dependencies.
*   `npm run build`: Compiles the extension into the `dist` folder for production deployment.
*   `npm run dev`: Starts the development server with live reloading for the extension.
*   `npm run lint`: Runs ESLint to check for code style and potential errors.
*   `npm run format`: Formats the codebase using Prettier.
*   `npm test`: Executes all unit and integration tests.
*   `npm run e2e`: Runs end-to-end tests using Playwright.

In the `server/` directory:

*   `npm install` / `yarn install`: Installs backend dependencies.
*   `npm start`: Starts the backend Express.js server.
*   `npm run dev`: Starts the backend server with `nodemon` for automatic restarts on file changes.
*   `npm test`: Executes backend tests.

### Core Principles

*   **SOLID Principles:** Applied to ensure code modularity, flexibility, and maintainability.
*   **DRY (Don't Repeat Yourself):** Avoid redundant code to enhance efficiency and reduce errors.
*   **YAGNI (You Aren't Gonna Need It):** Focus on implementing only currently required features to prevent over-engineering.
*   **Clean Code:** Emphasis on readable, understandable, and easily modifiable code.
*   **Semantic Versioning:** Followed for clear and consistent release management.

## 🤝 Contributing

Contributions are welcome! Please refer to our [CONTRIBUTING.md](https://github.com/chirag127/ClerkFlow-Authentication-And-Database-Browser-Extension/blob/main/.github/CONTRIBUTING.md) for guidelines on how to submit issues, features, or pull requests.

## 🛡️ Security

For information on security practices and how to report vulnerabilities, please review our [SECURITY.md](https://github.com/chirag127/ClerkFlow-Authentication-And-Database-Browser-Extension/blob/main/.github/SECURITY.md) document.

## 📄 License

This project is licensed under the [Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)](https://github.com/chirag127/ClerkFlow-Authentication-And-Database-Browser-Extension/blob/main/LICENSE) License.
