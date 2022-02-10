const jwt = require('jsonwebtoken')

const userExtractor = (req, res, next) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  req.user = decodedToken.id;
  next();
};

module.exports = userExtractor;