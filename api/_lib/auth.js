import jwt from 'jsonwebtoken';

export const verifyToken = (req) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) return null;

  try {
    return jwt.verify(auth.split(' ')[1], process.env.JWT_SECRET);
  } catch {
    return null;
  }
};

export const authenticate = (req, res) => {
  const user = verifyToken(req);
  if (!user) {
    res.status(401).json({ error: 'Unauthorized' });
    return null;
  }
  return user;
};
