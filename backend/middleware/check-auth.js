const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, 'ZErdvygygyf34gujijojnbyfy12AEfyj');
    next();
  } catch (error) {
    res.status(401).json({
      message: "Authentication failed !"
    });
  }
};
