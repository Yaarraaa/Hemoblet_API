const jwt = require('jsonwebtoken')

export function generateJwtToken(id) {
   return jwt.sign(id, getJwtSecret(), { expiresIn: '5d' });
}

export function verifyJwt(token) {
   return jwt.verify(token, getJwtSecret());
}

function getJwtSecret() {
   const secret = process.env.JWT_SECRET;
   if (!secret) {
      console.log('Missing jwt secret');
      process.exit(1);
   }
   return secret;
}
