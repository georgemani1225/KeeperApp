import mongoose from "mongoose";
import Note from "../models/note.model.js";

export const getNotes = async (req, res) => {

    try {
        const notes = await Note.find({ user: req.user.id });
        res.status(200).json({ success: true, data: notes });
    } catch (error) {
        console.log("Error in fetching notes:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const createNote = async (req, res) => {

    const note = req.body;
    if (!note.title) {
        return res.status(400).json({ success: false, message: "Please enter the title" })
    }

    const newNote = new Note({...note, user: req.user.id});

    try {
        await newNote.save();
        res.status(201).json({ success: true, data: newNote });
    } catch (error) {
        console.log("Error in Create note", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const updateNote = async (req, res) => {
    const { id } = req.params;
    const note = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Note not found" });
    }

    try {
        const updatedNote = await Note.findByIdAndUpdate(id, note, { new: true });
        res.status(200).json({ success: true, data: updatedNote });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }

}

export const deleteNote = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Note not found" });
    }

    try {
        await Note.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Note is deleted successfully" })
    } catch (error) {
        console.log("Error in deleting note:", error.message);
        res.status(404).json({ success: false, message: "Server Error" });
    }
}
