const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();

const SECRET = process.env.JWT_SECRET || 'dev_secret_key';

// demo user (no DB): admin / 1234 (password hashed)
const demoUser = { id: 'u1', username: 'admin', passwordHash: '' };

(async ()=>{
  demoUser.passwordHash = await bcrypt.hash('1234', 10);
})();

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'username and password required' });
    if (username !== demoUser.username) return res.status(401).json({ error: 'invalid credentials' });
    const ok = await bcrypt.compare(password, demoUser.passwordHash);
    if (!ok) return res.status(401).json({ error: 'invalid credentials' });
    const token = jwt.sign({ id: demoUser.id, username: demoUser.username }, SECRET, { expiresIn: '4h' });
    res.json({ token });
  } catch (err) { next(err); }
});

module.exports = router;
