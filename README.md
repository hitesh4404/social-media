# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
Features

User Registration and Login

Create and View Posts

Like and Comment on Posts

Explore Posts from Other Users

User Profile Page

View Posts by Specific User

Real-time UI Updates

Responsive Design

Tech Stack

React.js – Frontend Framework

Axios – API Requests

CSS – Styling

JavaScript (ES6) – Logic and Functionality

Project Structure
frontend
│
├── public
│   └── index.html
│
├── src
│   ├── components
│   │   ├── Navbar
│   │   ├── PostCard
│   │   └── CommentSection
│   │
│   ├── pages
│   │   ├── Home
│   │   ├── Explore
│   │   ├── Profile
│   │   ├── Login
│   │   └── Register
│   │
│   ├── pagesCSS
│   ├── App.js
│   └── index.js
│
└── package.json
Installation
1 Clone the repository
git clone https://github.com/your-username/social-media-frontend.git
2 Navigate to the project folder
cd social-media-frontend
3 Install dependencies
npm install
4 Start the development server
npm start

The application will run on:

http://localhost:3000
Backend API

This frontend connects to a backend API built using Node.js and Express.

Make sure the backend server is running before starting the frontend.

Example API base URL:

http://localhost:5000/api
Screens

Home Feed

Explore Page

User Profile

Post View

Login / Register

Future Improvements

Real-time messaging

Notifications system

Image upload for posts

Follow / Unfollow users

Dark mode UI

Author

Hitesh Patil
