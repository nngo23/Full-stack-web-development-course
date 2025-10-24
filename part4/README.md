# Phonebook backend

This project provides the backend service for the Full Stack Open Phonebook application. It’s built with Express and Node.js to handle basic CRUD operations for managing contacts.

## Live server:

Access the deployed backend here:
https://phonebook-backend-7ar1.onrender.com

## API routes:

- `GET /api/persons` — returns all phonebook entries
- `GET /info` — displays general information about the phonebook
- `GET /api/persons/:id` — fetches a specific entry by ID
- `POST /api/persons` — creates a new phonebook entry
- `DELETE /api/persons/:id` — deletes a contact by ID

## Deployment:

The backend is deployed using Render (https://render.com)

## How to run locally:

- Clone the repository
- Install dependencies:
(bash)
npm install
- Start the development server:
(bash)
npm run dev
- Open your browser at http://localhost:3001
