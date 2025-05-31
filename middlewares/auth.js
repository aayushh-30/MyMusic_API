const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  
  const token = req.cookies.token;
  //console.log(req.cookies.token)

  if (!token) return res.status(401).json({ message: 'No token, access denied' });

  try {
    const decoded = await jwt.verify(token, process.env.JWT_TokenKey);
    console.log(decoded)
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = auth;
