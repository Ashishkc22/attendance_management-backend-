const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const inviteUser = require("../../../../services/createUser");
const prisma = new PrismaClient();
const axios = require("axios"); // For calling external APIs

// Add a student
router.post("/", async (req, res) => {
  try {
    const {
      first_name,
      middle_name,
      last_name,
      email,
      departmentId,
      shift,
      classId,
    } = req.body;
    if (!first_name || !last_name || !email) {
      return res
        .status(400)
        .json({ error: "first_name, last_name, and email are required." });
    }
    // Use service to create student user
    const student = await inviteUser({
      first_name,
      middle_name,
      last_name,
      email,
      departmentId,
      shift,
      role: "STUDENT",
    });
    // Optionally update classId if provided
    if (classId) {
      await prisma.userProfile.update({
        where: { id: student.id },
        data: { classId },
      });
    }

    res.status(201).json({ data: student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove a student
router.delete("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Get student data before deletion for rollback
    const studentData = await prisma.userProfile.findUnique({ where: { id: userId } });
    if (!studentData) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Delete from local DB
    let student;
    await prisma.$transaction(async (tx) => {
      student = await tx.userProfile.delete({ where: { id: userId } });
    });

    // Call Auth service outside transaction
    const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL;
    try {
      await axios.delete(`${AUTH_SERVICE_URL}/api/user/${studentData.userId}`);
      res.json({ message: "Student removed", student });
    } catch (authError) {
      // Rollback: restore student in local DB
      await prisma.userProfile.create({
        data: { ...studentData }
      });
      res.status(500).json({ error: `Failed to delete user from Auth service: ${authError.message}. Local DB restored.` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all students
router.get("/", async (req, res) => {
  try {
    const students = await prisma.userProfile.findMany({
      where: { role: "STUDENT" },
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json({ data: students });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
