# Chat SDK Integration Roadmap

This roadmap outlines the steps to add a global Chat SDK to all third-party integrations (API Sandbox) within the application. The goal is to provide unified conversational capabilities, support context, and interactive commands across all API views (e.g., Twitch, Steam, GitHub).

## Phase 1: Planning and Architecture

- [ ] **Evaluate Chat SDK Providers**: Select a suitable Chat SDK (e.g., Stream, Sendbird, Twilio Conversations) that fits the existing Node.js + Express + Pug architecture and supports multi-channel integrations.
- [ ] **Data Modeling**: Design the MongoDB schema extensions needed to store chat metadata (e.g., user preferences, unified channel mappings, message history syncing).
- [ ] **Authentication Integration**: Update `config/passport.js` to automatically sync users or issue SDK-specific JWT tokens upon successful OAuth authentication.

## Phase 2: Core Infrastructure Setup

- [ ] **SDK Initialization**: Add the backend Chat SDK package and initialize it in `app.js` or a dedicated `config/chat.js` module.
- [ ] **Frontend Client Setup**: Integrate the client-side Chat SDK library into `public/js/main.js` and include necessary CSS/JS assets.
- [ ] **Global UI Component**: Create a shared Pug partial (e.g., `views/partials/chat_widget.pug`) that can be included globally or toggled on specific integration views.

## Phase 3: Integration-Specific Enhancements

- [ ] **Twitch Integration**: Sync Twitch chat streams into the unified SDK widget on `/api/twitch`, or allow cross-posting.
- [ ] **Steam Integration**: Add "LFG (Looking For Group)" chat rooms linked to the user's recently played Steam games on `/api/steam`.
- [ ] **GitHub Integration**: Implement a repository-specific chat or issue-discussion sync for the GitHub API view.
- [ ] **General API Views**: For other APIs (e.g., NYT, Last.fm), implement topical discussion channels (e.g., "music-discussion", "news-discussion").

## Phase 4: Testing and Performance Verification

- [ ] **Unit & Integration Testing**: Ensure token exchange, message sending, and webhook handling are covered by automated tests.
- [ ] **Performance (Bolt) Review**:
  - Ensure the Chat SDK does not introduce render-blocking scripts.
  - Defer the loading of the chat widget until after the main content load (using `defer` or `async` tags).
  - Add indexing to new MongoDB chat collections if storing custom data locally.

## Phase 5: Deployment

- [ ] **Environment Setup**: Add necessary Chat SDK API Keys and Webhook Secrets to `.env.example` and production secrets.
- [ ] **Rollout**: Enable the chat widget progressively across the API sandbox views.
