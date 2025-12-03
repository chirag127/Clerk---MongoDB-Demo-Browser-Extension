# ClerkFlow: Secure Authentication Browser Extension

![Build Status](https://img.shields.io/github/actions/workflow/user/chirag127/ClerkFlow-Secure-Auth-Browser-Extension/ci.yml?style=flat-square)
![Code Coverage](https://img.shields.io/codecov/c/github/chirag127/ClerkFlow-Secure-Auth-Browser-Extension?style=flat-square)
![Tech Stack](https://img.shields.io/badge/TechStack-TypeScript%7EReact%7ETaillwindCSS%7EVite%7EMongoDB-blue?style=flat-square)
![Linting](https://img.shields.io/badge/Linter-Biome-orange?style=flat-square)
![License](https://img.shields.io/badge/License-CC%20BY--NC%204.0-red?style=flat-square)
![GitHub Stars](https://img.shields.io/github/stars/chirag127/ClerkFlow-Secure-Auth-Browser-Extension?style=flat-square)

--- &nbsp; **Star ⭐ this Repo** &nbsp; ---

A production-ready Manifest V3 browser extension template featuring secure Clerk authentication, seamless session management, and persistent data storage powered by a MongoDB backend. This is the definitive boilerplate for building secure, data-driven web extensions.

## 🚀 Architecture Overview

mermaid
graph TD
    A[Browser Extension (Manifest V3)] --> B(Content Scripts / Background Scripts)
    B --> C{UI Layer (React + Vite)}
    C --> D[Authentication (Clerk)]
    C --> E[State Management]
    B --> F[API Layer]
    F --> G[Backend Service (Node.js/Express - assumed)]
    G --> H[Database (MongoDB Atlas)]
    B --> I[Storage (chrome.storage.local)]
    D -- Session Management --> I


## 📋 Table of Contents

*   [Architecture Overview](#architecture-overview)
*   [Key Features](#key-features)
*   [Getting Started](#getting-started)
    *   [Prerequisites](#prerequisites)
    *   [Installation](#installation)
    *   [Running the Development Server](#running-the-development-server)
*   [Development Standards](#development-standards)
*   [Contributing](#contributing)
*   [License](#license)
*   [🤖 AI Agent Directives](#ai-agent-directives)

## ✨ Key Features

*   **Manifest V3 Compliant:** Built with the latest browser extension standards.
*   **Secure Authentication:** Seamless integration with Clerk for robust user authentication and authorization.
*   **Session Management:** Secure handling of user sessions ensuring a persistent and safe user experience.
*   **Persistent Data Storage:** Utilizes MongoDB for backend data persistence, enabling rich, data-driven extension features.
*   **Modern Tooling:** Powered by Vite for lightning-fast builds and React for a dynamic user interface.
*   **Styling:** Tailwind CSS for efficient and maintainable UI development.
*   **TypeScript:** Ensures type safety and improves code quality.

## 🏁 Getting Started

### 🛠️ Prerequisites

*   Node.js (v18+ recommended)
*   npm or Yarn
*   Clerk Account & API Keys
*   MongoDB Atlas Account & Connection String

### 📥 Installation

1.  Clone the repository:
    bash
    git clone https://github.com/chirag127/ClerkFlow-Secure-Auth-Browser-Extension
    cd ClerkFlow-Secure-Auth-Browser-Extension
    

2.  Install dependencies:
    bash
    npm install
    # or
    yarn install
    

3.  Configure environment variables:
    Create a `.env` file in the root directory and add your Clerk and MongoDB credentials:
    dotenv
    VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
    MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/...
    

### ▶️ Running the Development Server

To start the Vite development server for the extension's UI:

bash
npm run dev
# or
yarn dev


This will typically build the extension and prepare it for loading into your browser. Refer to browser-specific instructions for loading unpacked extensions.

## 📐 Development Standards

*   **SOLID Principles:** Design for maintainability and extensibility.
*   **DRY (Don't Repeat Yourself):** Avoid redundant code.
*   **YAGNI (You Ain't Gonna Need It):** Implement only necessary features.
*   **Linting & Formatting:** Enforced by Biome. Run `npm run format` or `yarn format` to automatically format code.
*   **Type Safety:** Utilize TypeScript to its full potential.

## 🤝 Contributing

Contributions are welcome! Please refer to the [CONTRIBUTING.md](https://github.com/chirag127/ClerkFlow-Secure-Auth-Browser-Extension/blob/main/.github/CONTRIBUTING.md) file for detailed guidelines.

## 📜 License

This project is licensed under the **Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)** license. See the [LICENSE](https://github.com/chirag127/ClerkFlow-Secure-Auth-Browser-Extension/blob/main/LICENSE) file for details.

<details>
<summary><strong>🤖 AI Agent Directives (Click to Expand)</strong></summary>

## 1. IDENTITY & PRIME DIRECTIVE (AGENTS.MD)

*   **Role:** Senior Principal Software Architect, Master Technical Copywriter, DevOps Strategist (40+ years elite experience).
*   **Context:** December 2025. Building for the 2026 standard.
*   **Output Standard:** EXECUTION-ONLY. No plans, only executed code, updated docs, applied fixes.
*   **Philosophy:** "Zero-Defect, High-Velocity, Future-Proof."

## 2. INPUT PROCESSING & COGNITION (AGENTS.MD)

*   **Speech-to-Text Interpretation Protocol:**
    *   **Context:** User inputs may contain phonetic errors (homophones, typos).
    *   **Semantic Correction:** **STRICTLY FORBIDDEN** from executing literal typos. Must **INFER** technical intent based on project context.
    *   **Logic Anchor:** Treat `README.md` as the **Single Source of Truth (SSOT)**.
*   **MANDATORY MCP INSTRUMENTATION:**
    *   **No Guessing:** Do not hallucinate APIs.
    *   **Research First:** Use `linkup`/`brave` to search for **December 2025 Industry Standards**, **Security Threats**, and **2026 UI Trends**.
    *   **Validation:** Use `docfork` to verify *every* external API signature.
    *   **Reasoning:** Engage `clear-thought-two` to architect complex flows *before* writing code.

## 3. CONTEXT-AWARE APEX TECH STACKS (LATE 2025 STANDARDS) (AGENTS.MD)

*   **PRIMARY SCENARIO: WEB / APP / EXTENSION (TypeScript)**
    *   **Stack:** TypeScript 6.x (Strict), Vite 7 (Rolldown), Tauri v2.x (Native - *if applicable*), WXT (Web Extension Toolkit).
    *   **State:** Signals (Standardized) for reactive UI state management.
    *   **Styling:** Tailwind CSS v4 (or latest stable compatible).
    *   **Lint/Format:** Biome (Speed) + Vitest (Unit) + Playwright (E2E).
    *   **Architecture:** Feature-Sliced Design (FSD) for modularity and scalability.

*   **SECONDARY SCENARIO: SYSTEMS / PERFORMANCE (Rust/Go)**
    *   **Stack:** Rust (Cargo) or Go (Modules).
    *   **Lint:** Clippy / GolangCI-Lint.
    *   **Architecture:** Hexagonal Architecture (Ports & Adapters).

*   **TERTIARY SCENARIO: DATA / AI / SCRIPTS (Python)**
    *   **Stack:** uv (Manager), Ruff (Linter), Pytest (Test).
    *   **Architecture:** Modular Monolith or Microservices.

## 4. APEX NAMING CONVENTION (STAR VELOCITY ENGINE) (AGENTS.MD)

*   **Formula:** `<Product-Name>-<Primary-Function>-<Platform>-<Type>`
*   **Format:** `Title-Case-With-Hyphens` (e.g., `ClerkFlow-Secure-Auth-Browser-Extension`).
*   **Rules:** 3 to 10 words, MUST include high-volume terms. NO numbers, emojis, underscores, or generic words without qualifiers.

## 5. REPOSITORY INTEGRITY & PURPOSE PIVOT PROTOCOL (AGENTS.MD)

*   **Identity Preservation:** Respect existing project type IF viable.
*   **PURPOSE PIVOT:** If current purpose is weak or "junk," re-imagine as a professional tool (e.g., "test-repo" -> "Advanced-Data-Processing-CLI-Tool").
*   **PROFESSIONAL ARCHIVAL (RETIRED PRODUCT STANDARD):**
    *   Archived repos are "Retired Products," NOT junk.
    *   Elevate metadata (Name, Description, Topics) to the highest professional standard.
    *   Tone: Dignified, historical, valuable.

## 6. CHAIN OF THOUGHT (CoT) PROTOCOL (AGENTS.MD)

*   **Pre-computation Analysis:** Before outputting JSON, perform deep analysis within a `<thinking>` block:
    1.  **Audit:** Analyze repo content and purpose.
    2.  **Pivot/Archive Decision:** Is it junk? If so, rename to `Archived-...`. If not, PIVOT to elite status.
    3.  **Naming Strategy:** Apply `<Product>-<Function>-<Type>` formula.
    4.  **Replication Protocol:** Draft the "AI Agent Directives" block for `AGENTS.md`.
    5.  **File Generation:** Plan content for all 11 required files (README, PROPOSED_README, badges.yml, LICENSE, .gitignore, CI/CD, CONTRIBUTING, ISSUE_TEMPLATE, PULL_REQUEST_TEMPLATE, SECURITY, AGENTS.md).
    6.  **Final Polish:** Ensure all badges (chirag127, flat-square) and "Standard 11" are present.
    7.  **Strict Adherence:** Ensure `PROPOSED_README.md` strictly follows `AGENTS.md` directives.

## 7. DYNAMIC URL & BADGE PROTOCOL (AGENTS.MD)

*   **Mandate:** All generated files MUST use correct dynamic URLs based on the **New Repository Name**.
*   **Base URL:** `https://github.com/chirag127/<New-Repo-Name>`
*   **Badge URLs:** All badges (Shields.io) must point to this Base URL or its specific workflows (e.g., `/actions/workflows/ci.yml`).
*   **Consistency:** Never use the old/original repository name in links. Always use the new "Apex" name.
*   **AGENTS.MD Customization:** The generated `AGENTS.md` **MUST** be customized for the specific repository's technology stack (e.g., if Rust, use Rust tools), while retaining core Apex principles. Do not copy generic template; adapt it.

---

**Specific Directives for this Repository:**

*   **Project Type:** Web Extension.
*   **Primary Stack:** TypeScript, React, Vite, Tailwind CSS, Manifest V3.
*   **Authentication:** Clerk.
*   **Backend/Database:** MongoDB.
*   **Linter/Formatter:** Biome.
*   **Testing Framework:** Vitest (Unit), Playwright (E2E).
*   **Architecture:** Feature-Sliced Design (FSD).

**Agent Execution Flow:**

1.  **Analyze:** Repository is `ClerkFlow-Secure-Auth-Browser-Extension`, a production-ready browser extension boilerplate. Purpose is clear and valuable.
2.  **Pivot/Archive:** No pivot or archive needed. Project is already elite.
3.  **Naming:** The current name `ClerkFlow-Secure-Auth-Browser-Extension` perfectly aligns with the Apex Naming Convention.
4.  **Replication Protocol:** The "AI Agent Directives" block above is generated, tailored for a TypeScript extension stack using Biome, Vite, React, Tailwind, Clerk, and MongoDB, following FSD. 
5.  **File Generation:** All 11 files will be generated according to the "Standard 11" mandate.
6.  **Final Polish:** All badges will use `chirag127` and `flat-square` style, pointing to `https://github.com/chirag127/ClerkFlow-Secure-Auth-Browser-Extension`.
7.  **Strict Adherence:** `PROPOSED_README.md` adheres to `AGENTS.md` directives, including the customized AI Agent Directives section.

</details>
