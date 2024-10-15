# devLinks

A full-stack web application built using the MERN stack (MongoDB, Express, React, Node.js) that allows users to seamlessly manage and share all their social media links in one centralized platform. Features include user authentication, customizable link profiles, image uploads, and responsive design. The platform also supports CRUD operations for easy link management and provides a user-friendly interface optimized for both desktop and mobile users.

## Installation

### Prerequisites

- Node.js and npm
- MongoDB

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Polashahmad01/link-sharing-app
   ```
2. Navigate to the backend folder:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file and add the required environment variables:

   ```bash
   NODE_ENV=development
   PORT=8000
   MONGO_USER=workistiakahmadpolash
   MONGO_PASSWORD=LW0aVm3rhn9li8zu
   MONGO_DATABASE_NAME=link-sharing-app
   ```

5. Start the backend server:
   ```bash
   npm run start:dev
   ```

### Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file and add the required environment variables:

   ```bash
   VITE_APP_BASE_API_URL=http://localhost:8000
   VITE_APP_IMAGEKIT_PUBLIC_KEY=public_L8cHIeHMqg09cgnUL4zk0Ef3n9Q=
   VITE_APP_IMAGEKIT_PRIVATE_KEY=private_EoiA1YxeWn0qf6OmSOI9MyM0PDo=
   VITE_APP_IMAGEKIT_URL_END_POINT=https://ik.imagekit.io/linksharingapp
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### 6. **Usage**

```markdown
1. Open your browser and navigate to `http://localhost:5173/auth/login` for the frontend.
2. The API server runs on `http://localhost:8000`.
```
