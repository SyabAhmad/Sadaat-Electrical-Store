const loginAttempts = new Map();

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of loginAttempts) {
    if (now - record.firstAttempt > 30 * 60 * 1000) {
      loginAttempts.delete(key);
    }
  }
}, 5 * 60 * 1000);

export const checkRateLimit = (req, maxAttempts = 5, windowMs = 15 * 60 * 1000) => {
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim()
    || req.headers['x-real-ip']
    || 'unknown';

  const key = `login:${ip}`;
  const now = Date.now();
  const record = loginAttempts.get(key);

  if (record && now - record.firstAttempt < windowMs && record.attempts >= maxAttempts) {
    const remainingMs = record.firstAttempt + windowMs - now;
    const remainingMin = Math.ceil(remainingMs / 60000);
    return { blocked: true, remainingMin, ip };
  }

  if (!record || now - record.firstAttempt >= windowMs) {
    loginAttempts.set(key, { attempts: 1, firstAttempt: now });
  } else {
    record.attempts++;
  }

  return { blocked: false, ip };
};

export const resetRateLimit = (ip) => {
  loginAttempts.delete(`login:${ip}`);
};
