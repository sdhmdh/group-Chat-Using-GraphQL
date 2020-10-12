import queryResolver from './queryResolver';
import mutationResolver from './mutationResolver';
import subscription from './subscription';

const resolvers = {
  Query: queryResolver,
  Mutation: mutationResolver,
  Subscription: subscription
}


export default resolvers;