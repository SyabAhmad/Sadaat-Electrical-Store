import jwt from 'jsonwebtoken';

const sendUnauthorized = (res) => {
  if (res.headersSent) return false;
  res.status(401).json({ error: 'No token provided' });
  return false;
};

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return sendUnauthorized(res);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    if (next) return next();
    return true;
  } catch (err) {
    if (res.headersSent) return false;
    res.status(401).json({ error: 'Invalid or expired token' });
    return false;
  }
};
