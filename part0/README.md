# Part 0 — Exercises 0.1–0.6

## 0.1: HTML
- [x] Read Mozilla "HTML tutorial" (reading task only)

## 0.2: CSS
- [x] Read Mozilla "CSS tutorial" (reading task only)

## 0.3: HTML forms
- [x] Read Mozilla "Your first form" (reading task only)

---

## 0.4: New note diagram (classic app)
The user writes a note at `/exampleapp/notes` and clicks **Save**.

```mermaid
sequenceDiagram
    participant browser
    participant server

    Note over browser: User types note and clicks "Save"
    browser->>server: POST /exampleapp/new_note (payload: content, date)
    activate server
    server-->>browser: 302 Found (Location: /exampleapp/notes)
    deactivate server

    Note right of browser: Browser follows redirect
    browser->>server: GET /exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET /exampleapp/main.css
    server-->>browser: CSS

    browser->>server: GET /exampleapp/main.js
    server-->>browser: JavaScript

    Note right of browser: JS runs and fetches updated data
    browser->>server: GET /exampleapp/data.json
    server-->>browser: JSON [..., {"content":"<new note>","date":"..."}]

    Note right of browser: JS renders the updated note list to the DOM
