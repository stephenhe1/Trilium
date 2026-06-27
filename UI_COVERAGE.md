# UI Coverage (Progress: 0/42)
Legend: [ ] not yet tested  -  [x] test written and passing  -  [~] intentionally skipped (reason)

## Setup Wizard (client-side SPA, first-run only)
- [ ] Language selection slide - dropdown list of locales, Continue button
- [ ] "Get started" slide - 3 options: New KB / Connect to server / Connect desktop
- [ ] New KB → With demo content option
- [ ] New KB → Empty option → Set password step
- [ ] Connect to existing server slide - server URL + password + proxy inputs
- [ ] Connect a desktop app slide - IP addresses list, waiting spinner

## Auth Pages (server-rendered)
- [ ] Login page (`/login`) - password field, Remember me, Login button
- [ ] Login with wrong password - error message shown
- [ ] Set password page (`/set-password`) - two password fields, submit
- [ ] Logout - clears session, redirects to login
- [ ] Redirect unauthenticated users to login

## Main App Layout
- [ ] Main app loads after login - note tree, launcher bar, tab bar, note editor all visible
- [ ] Note tree shows root note and Hidden Notes
- [ ] Launcher bar 9 buttons rendered (create note, search, jump, note map, recent changes, journal, protected session, settings)
- [ ] Right pane (sidebar) shows Table of Contents and Highlights
- [ ] Tab bar renders active tab

## Note Tree Interactions
- [ ] Click note in tree → note loads in editor
- [ ] Right-click note → context menu appears (open in tab, insert child, cut/copy/paste/delete, etc.)
- [ ] Insert child note from context menu (text type)
- [ ] Delete note from context menu
- [ ] Expand/collapse tree nodes

## Note Editor - Text Note
- [ ] Text note editor loads with CKEditor (shows formatting toolbar)
- [ ] Type text content into note
- [ ] Note actions menu opens (search in note, attachments, note map, share, protect, type switch, etc.)
- [ ] Switch note type from Text → Code
- [ ] Switch note type from Text → Markdown
- [ ] Switch note type from Text → Canvas
- [ ] Note revisions dialog opens

## Note Types
- [ ] Code note type - shows CodeMirror editor with language selector
- [ ] Markdown note type - shows markdown editor

## Launcher Bar Flows
- [ ] Create note into inbox (bx-file-blank button)
- [ ] Search notes (bx-search button) - opens search panel
- [ ] Jump to note (bx-send button) - opens note autocomplete
- [ ] Recent changes (bx-history button) - opens recent changes dialog
- [ ] Protected session (bx-shield-quarter button) - opens password prompt

## Settings Dialog
- [ ] Open settings via cog button
- [ ] Appearance page - theme, color scheme, layout style, fonts, performance
- [ ] Shortcuts page - keyboard shortcuts list
- [ ] Text Notes page
- [ ] Code Notes page
- [ ] Security / Password & Auth page - change password
- [ ] ETAPI page - API token management
- [ ] Backup page
- [ ] Sync page
- [ ] AI/LLM page
- [ ] Language & Region page

## Note Operations (via Note Actions menu)
- [ ] Search in note - opens find/replace panel
- [ ] Note attachments dialog
- [ ] Export note dialog
- [ ] Note revisions dialog
- [ ] Save revision

## Tab Management
- [ ] Add new tab
- [ ] Switch between tabs
- [ ] Close tab (not last tab)

## Mobile Layout
- [~] Mobile layout - requires setting `trilium-device=mobile` cookie; deprioritized vs desktop flows
