
import mongoose from "mongoose";

const notesSchema = new mongoose.Schema(
    
    {
    
    title: {type: String, required: true, minlength: 1, maxlength: 100},
    text: {type: String, required: true, minlength: 1},
    createdBy: {type: String, required: true},
    
    }, 
    {timestamps: true} //Automatically adds createdAt and updatedAt

);

const Note = mongoose.model("Note", notesSchema);

export default Note;