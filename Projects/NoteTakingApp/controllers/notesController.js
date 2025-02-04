
import Note from "../models/Note.js";

//Get all notes
export const getAllNotes = async (req, res) => {

    try {

        const notes = await Note.find({ createdBy: req.oidc.user.sub });
        res.render("notes", { notes });

    } catch(error) {
        res.status(500).json({ 
            status: "error",
            message: "Failed to fetch notes", 
            error: error.message 
        });
    }

};

//Get individual notes
export const getNoteById = async(req, res) => {

    try {
        const note = await Note.findOne({ _id: req.params.id, createdBy: req.oidc.user.sub });

        if (!note) {
          return res.status(404).send("Note not found");
        }

        res.render("note-editor", { note });

      } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error loading note",
            error: error.message

        });
      }

};

//Create a new note
export const createNote = async (req, res) => {

    const { text, title } = req.body;

    try {

        await Note.create({ 
            text, 
            title, 
            createdBy: req.oidc.user.sub 
        });

        res.redirect("/notes");

    } catch(error) {

        res.status(400).json({ 
            status: "error",
            message: "Failed to create note", 
            error: error.message 
        });

    }

};

//Update a note
export const updateNote = async (req, res) => {

    const { id } = req.params;
    const { text, title } = req.body;
    
    try {


        const updatedNote = await Note.findByIdAndUpdate(
            id,
            { text, title },
            { new: true, runValidators: true}
        );

        if(!updatedNote) {
            return res.status(404).json({ 
                status: "error",
                message: "Note not found or you do not have permission to update it" 
            });
        }

        res.status(200).json({ message: "Note updated successfully" });

    } catch(error) {

        res.status(400).json({ 
            status: "error",
            message: "Failed to update note", 
            error: error.message
        });

    }

};

//Delete a note
export const deleteNote = async (req, res) => {

    const { id } = req.params;

    try {

        const deletedNote = await Note.findByIdAndDelete(id);

        if (!deletedNote) {
            return res.status(404).json({ 
                status: "error",
                message: "Could not find note or you do not have permisson to delete it" 
            });
        }

        res.redirect("/notes")

    } catch(error) {

        res.status(500).json({ 
            status: "error", 
            message: "Failed to delete note", 
            error: error.message 
        });

    }

};