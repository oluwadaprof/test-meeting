import { pool } from "../index";

// GET all meeting
export const getMeetings = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    const result = await pool.query("SELECT * FROM meetings LIMIT $1 OFFSET $2", [limit, offset]);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

// GET meeting
export const getMeeting = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM meetings WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Meeting not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

// POST meeting
export const createMeeting = async (req, res, next) => {
  try {
    const { title, date, time, duration, attendees, description } = req.body;
    if (!title || !date || !time) {
      return res.status(400).json({ error: "Title, date, and time are required" });
    }
    const result = await pool.query(
      "INSERT INTO meetings (title, date, time, duration, attendees, description) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [title, date, time, duration, attendees, description],
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

// EDIT meeting
export const editMeeting = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, date, time, duration, attendees, description } = req.body;
    const result = await pool.query(
      "UPDATE meetings SET title = $1, date = $2, time = $3, duration = $4, attendees = $5, description = $6 WHERE id = $7 RETURNING *",
      [title, date, time, duration, attendees, description, id],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Meeting not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

// DELETE meeting
export const deleteMeeting = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM meetings WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Meeting not found" });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
