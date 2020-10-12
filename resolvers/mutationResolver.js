import {ObjectID} from 'mongodb';
import User from '../db/models/user';
import Group from '../db/models/group';
import bcrypt from 'bcryptjs';
import { NEW_MESSAGE } from './subscriptionConstants';

const mutationResolver = {
    createUser: async (parent, args, {isAuth, userId}, info) => {
        try {
          const { name, email, password } = args.userInput;
          const userExists = await User.findOne({ email: email });
          if (userExists) {
            throw new Error("User Exists Already!");
          }
          return bcrypt
            .hash(password, 12)
            .then((hashedPassword) => {
              const user = new User({
                name,
                email,
                password: hashedPassword,
              });
              return user.save();
            })
            .catch((err) => {
              throw err;
            });
        } catch (e) {
            throw e
        }
      },
  
      addGroup: (parent, {name}, {isAuth, userId}, info) => {
        if(!isAuth){
          throw new Error('Unauthenticated!');
        }
        if(user.email !== 'admin@yellowclass.com'){
          throw new Error('You are not allowed to create a group!');
        }
        const group = new Group({name, messages: []})
        return group.save()
      },
  
      sendMessage: async (parent, {message, groupId}, {isAuth, userId, pubsub}, info) => {
        if(!isAuth){
          throw new Error('Unauthenticated!');
        }
    
        const createdAt = new Date().toISOString()
        const newMessage = {
          message,
          sentByUserId: userId.toString(),
          fromGroupId: groupId,
          createdAt
        }
        const group = await Group.findOne({_id: ObjectID(groupId)});
        if(!group){
          throw new Error('Group not found! Try again later.')
        }
        pubsub.publish(NEW_MESSAGE, {  newMessage });

        group.messages.push(newMessage);
        await group.save();
        return {
          message,
          sentByUserId: userId.toString(),
          fromGroupId: groupId,
          createdAt
        }
      }
}

export default mutationResolver;