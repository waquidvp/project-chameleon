import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { mergeSchemas } from 'graphql-tools';
import jwt from 'express-jwt';
import { ObjectID } from 'mongodb';

import authSchema from './api/auth/schema';
import dbConnect from './api/dbConnector';
import JWT_SECRET from './config';

const startServer = async () => {
  const app = express();

  const db = await dbConnect();

  const schema = mergeSchemas({
    schemas: [
      authSchema,
    ],
  });

  app.use('/graphql', bodyParser.json(), jwt({
    secret: JWT_SECRET,
    credentialsRequired: false,
  }), graphqlExpress(async req => ({
    context: {
      db,
      user: req.user ? await db.Users.findOne({ _id: ObjectID(req.user._id) }) : null,
    },
    schema,
  })));

  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
  }));

  const PORT = 8080;
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
};

startServer();
