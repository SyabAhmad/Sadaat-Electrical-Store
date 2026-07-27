export const errorHandler = (err, req, res, next) => {
  const isDev = process.env.NODE_ENV === 'development';
  if (isDev) console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    ...(isDev && { stack: err.stack }),
  });
};
