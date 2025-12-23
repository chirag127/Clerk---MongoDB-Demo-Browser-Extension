# Pull Request Checklist & Review Guidance

This template enforces the **Zero-Defect, High-Velocity, Future-Proof** philosophy mandated by the Apex Technical Authority.

Reviewers MUST check all applicable items before merging.

---

## 🚀 Feature/Fix Description

<!-- Briefly describe the change and why it is necessary. Link to the relevant issue if applicable (e.g., Closes #123). -->

## ✅ Checklist for the Author

* [ ] **Code Quality:** Code adheres to strict **TypeScript** best practices (DRY, SOLID principles applied locally).
* [ ] **ClerkFlow Logic:** Authentication flows (Clerk) have been verified for edge cases (e.g., token expiry, session termination).
* [ ] **Data Persistence:** All data is correctly saved to and retrieved from `chrome.storage.local`.
* [ ] **Manifest V3 Compliance:** Verified that the extension respects modern browser security mandates (e.g., service workers, CSP).
* [ ] **Testing:** Unit/Integration tests have been added or updated to cover new logic.
* [ ] **Documentation:** README.md and any relevant internal comments reflect the changes.
* [ ] **Agent Alignment:** Changes do not contradict the directives set in `AGENTS.md`.
* [ ] **Security Review:** No hardcoded secrets, correct usage of user-provided API keys from secure browser storage.

## 🛡️ Reviewer Checklist

**Architecture & Security (Mandatory Focus)**

1.  **State Management:** Is session state managed securely within the extension boundaries (e.g., `chrome.storage.local`)?
2.  **Clerk Integration:** Are tokens securely handled? No sensitive data transmitted over unsecured channels?
3.  **Performance:** Does the extension inject/run efficiently without causing browser lag (critical for Manifest V3 Service Workers)?

**Code Style & Standards**

* [ ] Syntax looks clean and is consistent.
* [ ] Appropriate error handling implemented for external API calls.
* [ ] Naming conventions followed across all new files/functions.

## 🧪 Verification Steps

To test this change locally, follow these steps:

1.  Checkout branch: `git checkout <branch-name>`
2.  Install dependencies: `npm install`
3.  Build/Load Extension:
    *   `npm run build`
    *   Load the `/dist` folder into Chrome/Firefox extensions management panel.
4.  **Manual Test Case:** [Describe the specific user action required to validate this PR.]

---
