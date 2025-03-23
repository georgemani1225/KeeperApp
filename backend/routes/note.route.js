import express from 'express';
import { createNote, deleteNote, getNotes, updateNote } from '../controllers/note.controller.js';
import { ensureAuthenticated } from '../middlewares/noteAuth.js';

const router = express.Router();

router.get("/", ensureAuthenticated, getNotes)
router.post("/",ensureAuthenticated, createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
