import { Note } from "../models/note.js";

export const getAllNotes = async (req, res, next) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};


export const getNoteById = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const note = await Note.findById(noteId);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json(note);
  } catch (error) {
    next(error);
  }
};

export const createNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    const newNote = await Note.create({ title, content });

    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

export const updateNoteById = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const { title, content } = req.body;

    const updated = await Note.findByIdAndUpdate(
      noteId,
      { title, content },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const deleteNoteById = async (req, res, next) => {
  try {
    const { noteId } = req.params;

    const deleted = await Note.findByIdAndDelete(noteId);

    if (!deleted) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json({ message: "Note deleted" });
  } catch (error) {
    next(error);
  }
};

