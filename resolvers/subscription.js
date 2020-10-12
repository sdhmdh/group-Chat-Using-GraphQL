import { NEW_MESSAGE } from './subscriptionConstants';

const subscription = {
    newMessage: {
        subscribe(parent, args, {pubsub}){
            return pubsub.asyncIterator(NEW_MESSAGE);
        }
      }
}
export default subscription;
