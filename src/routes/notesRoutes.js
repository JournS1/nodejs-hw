import { Router } from "express";
import {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/notesController.js";
import {
  getAllNotesSchema,
  noteIdSchema,
  createNoteSchema,
  updateNoteSchema,
} from "../validations/notesValidation.js";
import { celebrate } from "celebrate";

const router = Router();

router.get("/notes", celebrate(getAllNotesSchema), getAllNotes);

router.get("/notes/:noteId", celebrate(noteIdSchema), getNoteById);

router.post("/notes", celebrate(createNoteSchema), createNote);

router.patch("/notes/:noteId", celebrate(updateNoteSchema), updateNote);

router.delete("/notes/:noteId", celebrate(noteIdSchema), deleteNote);

export default router;
