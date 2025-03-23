import express from 'express';
import { createNote, deleteNote, getNotes, updateNote } from '../controllers/note.controller.js';
import { ensureAuthenticated } from '../middlewares/noteAuth.js';

const router = express.Router();

router.get("/", ensureAuthenticated, getNotes)
router.post("/",ensureAuthenticated, createNote);
router.put("/:id", ensureAuthenticated, updateNote);
router.delete("/:id", ensureAuthenticated, deleteNote);

export default router;
