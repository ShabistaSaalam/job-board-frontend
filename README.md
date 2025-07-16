# Job Board Frontend

React + TypeScript frontend for the Job Board Mini-App.

## Features

- Browse job listings with filtering by job type (Full-time, Part-time, Remote)
- View detailed job descriptions
- Submit job applications through a form
- Admin view to list all submitted applications (protected by login)
- Responsive design for mobile and desktop

## Tech Stack

- React with TypeScript  
- React Router v6  
- Axios for API calls  
- Vite for build and dev server  
- CSS for styling  

## Prerequisites

- Node.js v14 or above  
- Backend API running (see backend README)  

## Installation

1. Clone the repository and navigate to the frontend directory:

```bash
git clone https://github.com/shabistasaalam/job-board-frontend.git
cd job-board-frontend/
```

2. Install dependencies:

```npm install```

3.Create a .env file in the frontend folder with the following content:

```VITE_API_BASE_URL=http://localhost:5000```

4.Running the Development Server

```npm run dev```
Open http://localhost:5173 in your browser.