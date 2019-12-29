const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config({ path: 'variables.env' });
const Recipe = require('./server/models/Recipe');
const User = require('./server/models/User');
const jwt = require('jsonwebtoken');

const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const { typeDefs } = require('./server/schema/schema');
const { resolvers } = require('./server/resolvers');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const PORT = process.env.PORT || 5000;

//connects to database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to mongoDB'))
  .catch(error => console.error(error));

//initialises
const app = express();

// const corsOptions = {
//   origin: 'http://localhost:3000',
//   credentials: true
// };
app.use(cors("*"));

//Setup jwt authentication middleware
app.use(async (req, res, next) => {
  const token = req.headers['authorization'];

  if (token !== 'null') {
    try {
      const currentUser = await jwt.verify(token, process.env.SECRET);
      req.currentUser = currentUser;
    } catch (err) {
      console.error(err);
    }
  }
  next();
});

//Create GraphiQL application
// app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

//Connect schemas with GraphQL
app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(({ currentUser }) => ({
    schema,
    context: {
      Recipe,
      User,
      currentUser
    }
  }))
);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});