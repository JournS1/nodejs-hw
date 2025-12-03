export const errorHandler = (err, req, res, _next) => {
  req.log?.error(err);

  const status = err.status || 500;

  res.status(status).json({
    message: err.message || "Server error",
  });
};
