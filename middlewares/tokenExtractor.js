const tokenExtractor = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) req.token = token.split(" ").pop();
    next();
  };
  
  module.exports = tokenExtractor;