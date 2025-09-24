const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Mark attendance for a student
router.post('/mark', async (req, res) => {
  try {
    const { userId, date, status } = req.body;
    if (!userId || !date || !status) {
      return res.status(400).json({ error: 'userId, date, and status are required.' });
    }
    const attendance = await prisma.attendance.create({
      data: {
        userId,
        date: new Date(date),
        status,
      },
    });
    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get attendance for a student
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const attendances = await prisma.attendance.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    });
    res.json(attendances);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
