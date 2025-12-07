import { Note } from '../models/note.js';
import createHttpError from 'http-errors';

export const getAllNotes = async (req, res, next) => {
  try {
    const { tag, search, page = 1, perPage = 10 } = req.query;

    const filter = { userId: req.user._id };

    if (tag) {
      filter.tag = tag;
    }

    if (search) {
      filter.$text = { $search: search };
    }

    const pageNumber = Number(page);
    const limitNumber = Number(perPage);
    const skip = (pageNumber - 1) * limitNumber;

    const totalNotes = await Note.countDocuments(filter);

    const notes = await Note.find(filter).skip(skip).limit(limitNumber);

    const totalPages = Math.ceil(totalNotes / limitNumber);

    res.status(200).json({
      page: pageNumber,
      perPage: limitNumber,
      totalNotes,
      totalPages,
      notes,
    });
  } catch (error) {
    next(error);
  }
};

export const getNoteById = async (req, res, next) => {
  try {
    const { noteId } = req.params;

    const note = await Note.findOne({
      _id: noteId,
      userId: req.user._id,
    });

    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const createNote = async (req, res, next) => {
  try {
    const { title, content, tag } = req.body;

    const newNote = await Note.create({
      title,
      content,
      tag,
      userId: req.user._id,
    });

    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;

    const updated = await Note.findOneAndUpdate({ _id: noteId, userId: req.user._id }, req.body, {
      new: true,
    });

    if (!updated) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;

    const deleted = await Note.findOneAndDelete({
      _id: noteId,
      userId: req.user._id,
    });

    if (!deleted) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(200).json(deleted);
  } catch (error) {
    next(error);
  }
};
