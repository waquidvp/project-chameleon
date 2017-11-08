import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { mergeSchemas } from 'graphql-tools';

import testSchema from './schema';
import authSchema from './api/auth/schema';

const app = express();

const schema = mergeSchemas({
  schemas: [
    testSchema,
    authSchema,
  ],
});

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

const PORT = 8080;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
