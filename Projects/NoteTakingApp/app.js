
import express from "express";
import pkg from "express-openid-connect";
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import connectDB from "./config/db.js";
import favicon from "serve-favicon";
import dotenv from "dotenv";
import router from "./routes/routes.js";
import Note from "./models/Note.js";
import methodOverride from "method-override";

const { auth, requiresAuth } = pkg;

//Set up environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//file paths
const __filename = fileURLToPath(import.meta.url); //finds the directory name in which the file app.js is in
const __dirname = path.dirname(__filename); //sets the path to the directory

//connect to MongoDB
connectDB();

//Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For URL-encoded form data
app.use(methodOverride("_method"));
//this is where the static (unchanging) elements of our project will be
app.use(express.static(path.join(__dirname, "public")));
// Serve the favicon
app.use(favicon(path.join(__dirname, "public", "scrollApp.png")));

//Auth0 config
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

//setting EJS as the template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); //joining the name of the directory with the subfolder and setting it to views

//Routes
app.use("/", router);

// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
  res.render("index", { authenticated: req.oidc.isAuthenticated() });
});

app.get("/profile", requiresAuth(), async (req, res) => {
  const notes = await Note.find({ createdBy: req.oidc.user.sub });
  res.render("profile", { user: req.oidc.user, notes });
});

app.get("/notes", requiresAuth(), async (req, res) => {
  try {
    const notes = await Note.find({ createdBy: req.oidc.user.sub });
    res.render("notes", { user: req.oidc.user, notes });
  } catch(error) {
    res.status(500).send("Error loading notes");
  }
});

//Global Error handling middleware
app.use((err, req, res, next) => {

  console.error(err.stack);
  res.status(500).json({ status: "error", message: "Internal Server Error"});

});

//Start Server
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);

});