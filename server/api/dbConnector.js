import { MongoClient } from 'mongodb';

const MONGO_URL = 'mongodb://admin:admin@ds251435.mlab.com:51435/chameleon';

const dbConnect = async () => {
  const db = await MongoClient.connect(MONGO_URL);
  return {
    Users: db.collection('users'),
  };
};

export default dbConnect;
