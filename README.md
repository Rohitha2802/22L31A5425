React URL Shortener
🔹 Overview

A responsive React URL Shortener Web App that allows users to:

Shorten up to 5 URLs concurrently.

Specify validity period (default = 30 minutes).

Provide an optional custom shortcode.

View statistics such as expiry date, total clicks, and detailed click data.

Fully client-side with persistence via LocalStorage.

Built exclusively with React + Material UI as per given constraints.

🔹 Features (as per requirements)

✅ Mandatory Logging Integration – custom logging middleware used for tracking actions.

✅ No Authentication – app assumes pre-authorized access.

✅ Short Link Uniqueness – ensures no duplicate shortcodes.

✅ Default Validity – defaults to 30 minutes if not provided.

✅ Custom Shortcodes – users can specify their own if valid.

✅ Redirection – visiting a short URL redirects to the original.

✅ Error Handling – invalid URLs, shortcode collisions, and expired links handled gracefully.

✅ Material UI Styling – clean, responsive design.

🔹 Tech Stack

Frontend: React (CRA / Vite)

UI Library: Material UI (MUI)

State Management: React hooks + LocalStorage

Routing: React Router

Persistence: LocalStorage (for short URLs + stats)<img width="1894" height="789" alt="image" src="https://github.com/user-attachments/assets/b3f59d7f-dcca-4bc0-8c31-085d61418b2f" />
