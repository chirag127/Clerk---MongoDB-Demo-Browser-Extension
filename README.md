# ClerkFlow-Secure-Auth-Browser-Extension

![GitHub Actions Build Status](https://img.shields.io/github/actions/workflow/status/chirag127/ClerkFlow-Secure-Auth-Browser-Extension/ci.yml?style=flat-square)
![Code Coverage](https://img.shields.io/codecov/c/github/chirag127/ClerkFlow-Secure-Auth-Browser-Extension?style=flat-square)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?style=flat-square)
![Frameworks](https://img.shields.io/badge/Frameworks-React%20%7C%20Vite-F15A29?style=flat-square)
![License](https://img.shields.io/badge/License-CC%20BY--NC%204.0-blue?style=flat-square)
![GitHub Stars](https://img.shields.io/github/stars/chirag127/ClerkFlow-Secure-Auth-Browser-Extension?style=flat-square)

**[⭐ Star ⭐ this Repo if you find it useful!]**

## :sparkles: Project Overview

ClerkFlow is a production-ready Manifest V3 browser extension boilerplate engineered for absolute security and data integrity. It integrates Clerk for secure user authentication and session management, leveraging a dedicated MongoDB backend for persistent, encrypted data storage within the extension context.

This repository serves as the definitive foundation for building robust, data-driven web extensions adhering to modern browser security standards.

## :dna: Architecture & Structure

This project utilizes a modern **Feature-Sliced Design (FSD)** methodology within a **TypeScript/React** ecosystem, managed by **Vite**. The core is a fully contained, security-hardened extension bundle.

mermaid
graph TD
    subgraph Browser Environment
        A[Service Worker / Background] --> C(State Manager / Session Store)
        B[Content Scripts / UI] --> D(React Client / Pop-up)
    end
    D -- Authenticated Fetch --> E(Clerk API Gateway)
    E --> F{Backend Adapter}
    F -- Encrypted Data --> G[(MongoDB Atlas)]
    C -- Session Token --> F

    style A fill:#f9f,stroke:#333,stroke-width:2px
    style B fill:#ccf,stroke:#333,stroke-width:2px


## :books: Table of Contents

1.  [Project Overview](#-project-overview)
2.  [Architecture & Structure](#-architecture--structure)
3.  [Tech Stack & Compliance](#-tech-stack--compliance)
4.  [🤖 AI Agent Directives](#-ai-agent-directives)
5.  [Development Setup](#-development-setup)
6.  [Contribution Guidelines](#-contribution-guidelines)
7.  [Security & Licensing](#-security--licensing)

---

## :zap: Tech Stack & Compliance

This extension is built to the highest standards enforced by the Apex Technical Authority, prioritizing performance, strict typing, and modern browser policies (Manifest V3).

| Category | Technology | Rationale |
| :--- | :--- | :--- |
| **Core Language** | TypeScript 5.x | Strict typing enforces contract correctness. |
| **Build Tool** | Vite 5+ | Rapid development, optimized bundling for extensions. |
| **UI/Components** | React 18+ (Hooks) | Declarative UI management. |
| **Styling** | TailwindCSS v4 (JIT) | Utility-first, highly efficient styling pipeline. |
| **Authentication** | Clerk SDK | Secure, managed OAuth/SSO authentication. |
| **Data Persistence** | MongoDB | Scalable, flexible document store for user session data. |
| **Linter/Formatter** | Biome | Unifying linting, formatting, and testing speed (replacing ESLint/Prettier). |
| **Testing** | Vitest (Unit) / Playwright (E2E) | Comprehensive quality assurance suite. |

## 🤖 AI Agent Directives

<details>
<summary>Click to expand Apex Agent Configuration</summary>

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
    *   **No Guessing:** Do not hallucinate APIs. Do not assume libraries are installed if not specified in dependency files.
    *   **Research First:** Use `linkup`/`brave` to search for **December 2025 Industry Standards**, **Security Threats (e.g., XSS in MV3 Contexts)**, and **2026 UI Trends**.
    *   **Validation:** Use `docfork` to verify *every* external API signature (Clerk, MongoDB Node Driver).
    *   **Reasoning:** Engage `clear-thought-two` to architect complex flows *before* writing code, especially regarding Service Worker isolation and secure token storage.

---

## 3. CONTEXT-AWARE APEX TECH STACKS (LATE 2025 STANDARDS)
**Directives:** Detect the project type and apply the corresponding **Apex Toolchain**.

*   **PRIMARY SCENARIO: WEB / APP / EXTENSION (TypeScript)**
    *   **Stack:** This project demands **TypeScript 6.x** (Strict Mode Enforced), **Vite 7** (for bundling and dev server), and **Tauri v2.x** (if migrating to native; otherwise standard MV3 build). For extension building, **WXT** is the preferred abstraction layer for Manifest V3 compliance.
    *   **Lint/Test:** **Biome** (for speed and unification across lint/format) + **Vitest** (Unit/Component Testing) + **Playwright** (E2E testing covering pop-up interactions and background service worker connectivity).
    *   **Architecture:** Enforce **Feature-Sliced Design (FSD)** across `src/features`, `src/entities`, `src/pages` (or layers like `ui`, `services`).
    *   **Security Focus:** All Clerk session management must strictly follow background service worker isolation protocols. Sensitive data MUST use `chrome.storage.local` only for encrypted tokens, never plaintext JWTs.

## 4. VERIFICATION COMMANDS

| Action | Command | Notes |
| :--- | :--- | :--- |
| **Install Dependencies** | `npm install` | Ensure all base dependencies are resolved. |
| **Run Linter/Formatter** | `npx @biomejs/biome check --apply .` | Enforce style and catch structural errors. |
| **Unit Tests** | `npx vitest` | Run module-level component and logic tests. |
| **E2E Tests** | `npx playwright test` | Simulate full user journeys via browser simulation. |
| **Build Extension** | `npm run build` | Generates production-ready MV3 artifacts in `/dist`. |

## 5. ARCHITECTURAL PRINCIPLES

1.  **SOLID:** Applied strictly to service/data layers. Services must adhere to Single Responsibility.
2.  **DRY:** Functions and configuration must be centralized. Avoid hardcoding Clerk keys.
3.  **YAGNI:** Do not implement features beyond authentication and data persistence scaffolding until required by specification.
4.  **MV3 Compliance:** All long-running tasks must be managed via event listeners in the Service Worker; avoid persistent background pages.

</details>

## :construction: Development Setup

This boilerplate assumes Node.js (v18+) and npm/uv are installed. This repository uses TypeScript and React for the UI layer.

1.  **Clone Repository:**
    bash
    git clone https://github.com/chirag127/ClerkFlow-Secure-Auth-Browser-Extension.git
    cd ClerkFlow-Secure-Auth-Browser-Extension
    

2.  **Install Dependencies (Using npm):**
    bash
    npm install
    

3.  **Environment Configuration:**
    Create a `.env` file in the root directory with your Clerk and MongoDB connection details:
    env
    VITE_CLERK_PUBLISHABLE_KEY="pk_live_..."
    MONGODB_URI="mongodb+srv://user:pass@cluster.mongodb.net/extension_data?retryWrites=true&w=majority"
    

4.  **Run Development Server:**
    bash
    npm run dev
    

### Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| `dev` | `npm run dev` | Starts Vite dev server with HMR for extension components. |
| `build` | `npm run build` | Compiles and bundles the extension for production/testing. |
| `lint` | `npx @biomejs/biome check .` | Runs static analysis and formatting checks. |
| `test:unit` | `npx vitest` | Executes unit and component tests. |
| `test:e2e` | `npx playwright test` | Executes end-to-end browser automation tests. |

## :handshake: Contribution Guidelines

Please see the dedicated [CONTRIBUTING.md](./.github/CONTRIBUTING.md) for detailed instructions on submitting pull requests, reporting bugs, and setting up your development environment.

## :lock: Security & Licensing

### Security

Security is paramount. All authentication tokens related to Clerk sessions are handled exclusively within the isolated Service Worker context. Data persistence in MongoDB must use parameterized queries to mitigate injection risks.

Please review our security policy at [.github/SECURITY.md](./.github/SECURITY.md).

### License

This project is licensed under the **Creative Commons Attribution-NonCommercial 4.0 International License (CC BY-NC 4.0)**. See the [LICENSE](./LICENSE) file for details.

---

*Built with Apex Authority standards by Chirag127.*