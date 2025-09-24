const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Delete user except Admin
router.delete('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    // Find user
    const user = await prisma.users.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (user.role === 'ADMIN') {
      return res.status(403).json({ error: 'Cannot delete Admin users' });
    }
    await prisma.users.delete({ where: { id:userId } });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
