import dotenv from 'dotenv';

dotenv.config({ silent: true });

const { JWT_SECRET } = process.env;

export default JWT_SECRET;
