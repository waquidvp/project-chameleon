import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { mergeSchemas } from 'graphql-tools';

import testSchema from './schema';
import authSchema from './api/auth/schema';
import dbConnect from './api/dbConnector';

const startServer = async () => {
  const app = express();

  const db = await dbConnect();

  const schema = mergeSchemas({
    schemas: [
      testSchema,
      authSchema,
    ],
  });

  app.use('/graphql', bodyParser.json(), graphqlExpress({
    context: { db },
    schema,
  }));

  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
  }));
  
  const PORT = 8080;
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
};

startServer();
