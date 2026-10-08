const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'sri_amar_crackers_jwt_secret_2026_festive',
    { expiresIn: '30d' }
  );
};

module.exports = generateToken;
