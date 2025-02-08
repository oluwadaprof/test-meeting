import { Router } from "express";
import { createMeeting, deleteMeeting, editMeeting, getMeeting, getMeetings } from "../controllers/meeting";

const router = Router();

// GET /meetings
router.get("/", getMeetings);

// GET /meetings
router.get("/", getMeeting);

// POST /meeting
router.post("/", createMeeting);

// PUT /meetings/:id
router.put("/:id", editMeeting);

// DELETE /meetings/:id
router.delete("/:id", deleteMeeting);

export default router;
