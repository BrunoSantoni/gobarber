export default {
  jwt: {
    secret: process.env.JWT_SECRET || 'default',
    expiresIn: process.env.JWT_EXPIRATION_TIME || '1d',
  },
};
