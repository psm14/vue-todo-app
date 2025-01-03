# Vue Todo App

A simple todo list application built with Vue.js that allows you to:
- View all todo items
- Add new todo items
- Mark items as completed
- Remove items from the list
- Edit item text
- Set due dates for items

The app uses localStorage for data persistence, so your todos will be saved even after closing the browser.

## Features
- Vue 3 with Composition API
- TypeScript support
- Vite for fast development and building
- Vitest for testing
- Local storage persistence

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build

## Docker

You can run the application using Docker:

```bash
# Build the Docker image
docker build -t vue-todo-app .

# Run the container
docker run -p 8080:80 vue-todo-app
```

Then visit http://localhost:8080 in your browser.

## Testing
The app includes comprehensive tests for all features using Vitest and Testing Library. Run the tests with:

```bash
npm test
```