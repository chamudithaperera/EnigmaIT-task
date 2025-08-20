## Recipe App (EnigmaIT Task)

A full‑stack recipe explorer with authentication and favorites. Users can register, log in, browse categories and recipes from TheMealDB, search, view details, and manage a favorites list.

### Features
- **Authentication**: Register, login, logout using JWT stored in httpOnly cookies
- **Session persistence**: User is rehydrated on page load via `/api/auth/profile`
- **Recipes**: Browse categories, search recipes, view details (TheMealDB API)
- **Favorites**: Add/remove recipes to personal favorites (stored in MongoDB)

### Demo Video (Screen Recording)
[Watch the demo video](https://drive.google.com/file/d/1CKV06pzefSy18rrzibI7Ca73hlmNj2-Y/view?usp=sharing)

### Tech Stack
- **Frontend**
  - React 19
  - React Router 7
  - Redux Toolkit 2 + React Redux 9
  - Axios
  - Create React App 5
- **Backend**
  - Node.js + Express 5
  - MongoDB + Mongoose 8
  - JWT (jsonwebtoken), bcryptjs
  - cookie-parser, CORS, morgan, dotenv
- **External API**
  - TheMealDB (`https://www.themealdb.com/api/json/v1/1`)

### Project Structure
```
EnigmaIT-task/
│── backend/
│   ├── package.json
│   ├── server.js
│   ├── .env
│   └── src/
│       ├── controllers/
│       │   ├── authController.js
│       │   └── recipeController.js
│       │   └── userController.js
│       ├── middleware/
│       │   └── authMiddleware.js
│       ├── models/
│       │   └── Favorite.js
│       │   └── User.js
│       └── routes/
│           ├── authRoutes.js
│           └── recipeRoutes.js
│           └── userRoutes.js
│
│── frontend/
│   ├── package.json
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── api/
│       │   ├── authApi.js
│       │   ├── recipeApi.js
│       │   └── userApi.js
│       ├── components/
│       │   └── recipes/
│       │       ├── CategoryFilter.js
│       │       ├── RecipeGrid.js
│       │       └── RecipeModal.js
│       ├── features/
│       │   ├── authSlice.js
│       │   └── favoritesSlice.js
│       ├── pages/
│       │   ├── Favorites.js
│       │   ├── Home.js
│       │   ├── Login.js
│       │   └── Register.js
│       ├── store/
│       │   └── store.js
│       ├── App.js
│       ├── index.js
│
│── postman/
│   ├── EnigmaIT-Local.postman_environment.json
│   └── EnigmaIT-RecipeApp.postman_collection.json
│
└── README.md

```

### Getting Started

Prerequisites:
- Node.js 18+
- MongoDB running locally or a connection string (Atlas)

1) Backend
```
cd backend
npm install
cp .env.example .env    # Create and fill if you use this pattern, or create .env directly
# Required env (see below)
npm run dev              # or: npm start
```

2) Frontend
```
cd frontend
npm install
# Create .env and set REACT_APP_API_BASE_URL to your backend URL
npm start
```

Open `http://localhost:3000` in your browser.

### Environment Variables

Backend (`backend/.env`):
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/recipeAppDB
JWT_SECRET=replace-with-a-strong-secret
JWT_EXPIRES_IN=1d
# Comma-separated list of allowed frontend origins
CORS_ORIGIN=http://localhost:3000,http://127.0.0.1:3000
NODE_ENV=development
```

Frontend (`frontend/.env`):
```
REACT_APP_API_BASE_URL=http://localhost:5000
```

Note: The frontend defaults to `http://localhost:5050` if the env var is not set. If your backend runs on 5000 (default), set `REACT_APP_API_BASE_URL` accordingly.

### API Overview

Auth (`/api/auth`):
- `POST /register` → { name, email, password } → creates user and sets cookie
- `POST /login` → { email, password } → logs in and sets cookie
- `GET /profile` (auth) → returns current user
- `POST /logout` (auth) → clears cookie

Users (`/api/users`):
- `GET /favorites` (auth)
- `POST /favorites` (auth) → body: { recipeId, recipeTitle, recipeImage }
- `DELETE /favorites/:recipeId` (auth)

Recipes (client-side only):
- TheMealDB public endpoints are called directly from the frontend

### Auth & Session Notes
- Cookies are httpOnly and require `withCredentials: true` in Axios.
- CORS must allow your frontend origin and `credentials: true`.
- In production, cookies use `sameSite: 'none'` and `secure: true`.
- The frontend dispatches `hydrateUser()` on startup and defers route rendering until hydration completes to avoid redirect flicker.

### Postman Collection
- Collection: `postman/EnigmaIT-RecipeApp.postman_collection.json`
- Environment: `postman/EnigmaIT-Local.postman_environment.json`

How to use:
- Open Postman → Import → select both files.
- Select environment "EnigmaIT Local" and confirm `base_url` (default `http://localhost:5000`).
- Run in order:
  - Auth → Register (optional) → Login
  - Auth → Profile (verifies cookie session)
  - Users → Favorites (GET/POST/DELETE)

### Common Tasks
- Start backend (default port 5000):
```
cd backend && npm run dev
```
- Start frontend (port 3000):
```
cd frontend && npm start
```


### Troubleshooting
- Logout on refresh: ensure frontend uses `REACT_APP_API_BASE_URL` that matches your backend URL and that CORS origins include `http://localhost:3000`. Keep `withCredentials: true` enabled.
- Cookie blocked: in production, serve over HTTPS; set `NODE_ENV=production` and ensure `sameSite: 'none'` and `secure: true` are respected by your hosting.
- 404/Network errors from frontend: double check `REACT_APP_API_BASE_URL` and backend `PORT`.

### License
ISC (see repository license or adjust as needed).


