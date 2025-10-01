const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'dev_secret_key';

function authMiddleware(req, res, next){
  try{
    const auth = req.headers.authorization;
    if(!auth) return res.status(401).json({ error: 'no token provided' });
    const token = auth.split(' ')[1];
    const payload = jwt.verify(token, SECRET);
    req.user = payload;
    next();
  }catch(err){
    return res.status(401).json({ error: 'invalid token' });
  }
}

module.exports = authMiddleware;
