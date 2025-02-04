
import express from "express";
import { 
    getAllNotes,
    getNoteById, 
    createNote, 
    updateNote, 
    deleteNote, 
} from "../controllers/notesController.js";

import pkg from 'express-openid-connect';
const { auth, requiresAuth } = pkg;

const router = express.Router();

//Routes

//GET all notes
router.get("/notes", requiresAuth(), getAllNotes);

router.get("/notes/new", (req, res) => {
    res.render("new-note");
});

//GET note by id
router.get("/notes/:id", requiresAuth(), getNoteById);

//POST a new note
router.post("/notes", requiresAuth(), createNote);

//PUT (update) a note
router.put("/notes/:id", requiresAuth(), updateNote);

//DELETE a note
router.delete("/notes/:id", requiresAuth(), deleteNote);

export default router;