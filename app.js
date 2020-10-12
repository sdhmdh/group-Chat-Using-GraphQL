import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectToDB from './db/Connection';
import checkAuth from './middleware/checkAuth';
import { ApolloServer } from 'apollo-server-express';
import { PubSub } from 'apollo-server';
import typeDefs from './schema/schema';
import resolvers from './resolvers';


const startServer = async () => {
  const PORT = 4000;
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

  const pubsub = new PubSub();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req, connection }) => {
      if(connection){
        return {req, pubsub}
      }else{
        try{
          const token = req.headers.authorization;
          const authObj = checkAuth(token);
          return {...authObj, pubsub}
        }catch(e){
          console.log(e)
        }
      }
    },
  });

  await connectToDB();
  server.applyMiddleware({ app });
  const httpServer = http.createServer(app);
  server.installSubscriptionHandlers(httpServer);

  httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
    console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
  })
};

startServer();

