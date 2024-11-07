

// POST /login - Login a user
//router.post('/login', login);

export default router;
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';  // Assuming you have a User model
const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Find user by username
  const user = await User.findOne({ where: { username } });
  if (!user) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  // Create JWT token
  const token = jwt.sign(
    { userId: user.id, username: user.username },
    process.env.JWT_SECRET_KEY as string,
    { expiresIn: process.env.JWT_EXPIRATION_TIME || '1h' }
  );

  // Send the token back to the client
  res.json({ token });
});

export default router;
