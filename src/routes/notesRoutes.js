import { Router } from "express";
import { getAllNotes } from "../controllers/notesController.js";

const router = Router();

router.get("/notes", getAllNotes);

export default router;