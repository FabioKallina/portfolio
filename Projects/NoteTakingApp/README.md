
# Note Taking App

This is a simple **Note-Taking App** built with **Node.js, Express, MongoDB, and Auth0 authentication**.

The app allows users to **create**, **read**, **update**, and **delete** notes, ensuring that each user can only interact with their own notes through personalized authentication.

## File Structure
```
NoteTakingApp/
│
├── config/
│   └── db.js
├── controllers/
│   └── notesController.js
├── docs/
│   ├── API_Documentation.md
│   └── README.md
├── models/
│   └── Note.js
├── public/
│   ├── css/
│   │   ├── header.css
│   │   ├── new-note.css
│   │   ├── note-editor.css
│   │   ├── notes.css
│   │   ├── profile.css
│   │   └── styles.css  
│   ├── img/
│   │   └── owl-note-taking.png
│   └── js/
│   │   ├── dark-mode.js
│   │   ├── new-note.js
│   │   └── note-editor.js
│   └── scrollApp.png
├── routes/
│   └── routes.js
├── views/
│   ├── partials/
│   │   ├── header.ejs
│   │   └── footer.ejs 
│   ├── index.ejs
│   ├── new-note.ejs
│   ├── note-editor.ejs
│   ├── notes.ejs
│   └── profile.ejs 
├── .gitignore
├── app.js
├── README.md
├── package-lock.json
└── package.json
```

## How to Run the App

### **1 Clone the Repository**
```sh
git clone https://github.com/FabioKallina/NoteTakingApp.git
cd project
```

### **2 Install Dependencies**
```sh
npm install
```

### **3 Set Up Environment Variables**
1. Copy `.env.example` to `.env`:
   ```sh
   cp .env.example .env
   ```
2. Open `.env` and update the following values:
   ```ini
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/NoteTakingApp
   SECRET=your_random_generated_secret_here
   BASE_URL=http://localhost:3000
   CLIENT_ID=your_auth0_client_id_here
   ISSUER_BASE_URL=https://your-auth0-domain-here.auth0.com
   ```
   - **Replace `your_random_generated_secret_here`** with a secure random string (`openssl rand -hex 32`).
   - **Replace `your_auth0_client_id_here`** with your Auth0 Client ID.
   - **Replace `your-auth0-domain-here.auth0.com`** with your Auth0 domain.

### **4 Set Up Auth0 Authentication**
This app uses **Auth0** for authentication. To run it locally, you need to set up your own Auth0 credentials.

#### **Create an Auth0 Application**
1. Go to [Auth0](https://auth0.com/) and **sign up** (or log in if you already have an account).
2. In the **Dashboard**, go to **Applications** → **Create Application**.
3. Choose **Regular Web Application** and click **Create**.

#### **Get Your Credentials**
1. In the **Application Settings**, find:
   - **Client ID** → Copy this into your `.env` file as `CLIENT_ID`.
   - **Domain** → Copy this and format it as `https://YOUR-DOMAIN.auth0.com`, then set it as `ISSUER_BASE_URL`.
2. Scroll down to **Application URIs** and set:
   - Allowed Callback URLs → `http://localhost:3000/callback`
   - Allowed Logout URLs → `http://localhost:3000`
   - Allowed Web Origins → `http://localhost:3000`

### **5 Run with Nodemon (for development)**
```sh
npm run dev
```
The server will run at `http://localhost:3000`.

## 📜 API Endpoints
| Method | Endpoint         | Description                  |
|--------|-----------------|------------------------------|
| GET    | `/notes`        | Get all notes               |
| GET    | `/notes/:id`    | Get a note by ID            |
| POST   | `/notes`        | Create a new note           |
| PUT    | `/notes/:id`    | Update a note               |
| DELETE | `/notes/:id`    | Delete a note               |

## 🛠 Technologies Used
- **Node.js & Express.js** for backend
- **MongoDB & Mongoose** for database
- **Auth0** for authentication
- **EJS** for templating
- **Morgan** for logging
- **Method-Override** for HTTP methods