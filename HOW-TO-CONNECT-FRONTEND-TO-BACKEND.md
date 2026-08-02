# How to Connect the Frontend to the Backend

This project has a separate React frontend and Express backend. To make it fully work, both parts must be started and connected to the same local API URL.

## 1) Install dependencies

Open two terminals.

### Backend

```bash
cd server
npm install
```

### Frontend

```bash
cd client
npm install
```

## 2) Create backend environment file

Create a file named `.env` inside the `server` folder.

Example:

```env
PORT=8000
MONGODB_URI=mongodb://127.0.0.1:27017
CORS_ORIGIN=http://localhost:5173
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_EXPIRY=10d
FRONTEND_URL=http://localhost:5173

# Optional but required for email verification/reset emails
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Optional for payment features
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret

# Optional for file upload features
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Important notes

- `MONGODB_URI` must point to a running MongoDB instance.
- If you do not want to use email/payment features yet, you can still start the app if those env values are missing, but some features may not work.

## 3) Start the backend

From the `server` folder:

```bash
npm run dev
```

If everything is correct, the backend should start on:

```text
http://localhost:8000
```

The API routes will be available under:

```text
http://localhost:8000/api/v1/...
```

## 4) Create frontend environment file

Create a file named `.env` inside the `client` folder.

Example:

```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

This matches the frontend API setup in [client/src/api/axios.js](client/src/api/axios.js).

## 5) Start the frontend

From the `client` folder:

```bash
npm run dev
```

Vite will usually open the app at:

```text
http://localhost:5173
```

## 6) Verify the connection

Open the frontend in the browser and try a simple action such as:

- login/register
- view books
- open categories
- add an item to cart

If the frontend is not loading data, check these points:

### Common issues

- Backend is not running
- `VITE_API_BASE_URL` is wrong
- `CORS_ORIGIN` does not include `http://localhost:5173`
- MongoDB is not running
- Missing required environment variables in the backend

## 7) Where the connection is configured

- Frontend API client: [client/src/api/axios.js](client/src/api/axios.js)
- Backend API setup: [server/src/app.js](server/src/app.js)
- Backend database connection: [server/src/db/index.js](server/src/db/index.js)

## 8) Quick troubleshooting

### CORS error

If you see a CORS error in the browser console, update the backend `.env` file:

```env
CORS_ORIGIN=http://localhost:5173
```

### API calls fail with 404 or 500

- Make sure the backend is running
- Check whether the route exists in the `server/src/routes` folder
- Confirm that the backend port is `8000`

### MongoDB connection error

Make sure MongoDB is installed and running locally, or use a cloud MongoDB connection string.

## 9) Recommended full startup order

1. Start MongoDB
2. Start backend
3. Start frontend
4. Open the app in the browser

If you want, I can also create a ready-to-use `.env.example` file for both the frontend and backend.
