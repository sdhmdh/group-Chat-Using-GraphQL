import {ObjectID} from 'mongodb';
import jwt from 'jsonwebtoken';
import User from '../db/models/user';
import Group from '../db/models/group';
import bcrypt from 'bcryptjs';

const queryResolver = {
    login: async (parent, { email, password },context, info) => {
        const user = await User.findOne({ email: email });
        if (!user) {
          throw new Error('User does not exist!');
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
          throw new Error('Password is incorrect!');
        }
        const token = jwt.sign(
          { userId: user.id, email: user.email },
          'yellowclasssecretkey',
          {
            expiresIn: '1h'
          }
        );
        return { userId: user.id, token: token };
      },
  
      groups: (parent, args, {isAuth, userId} , info) => {
        if(!isAuth){
          throw new Error('Unauthenticated!');
        }
        return Group.find({});
      },
  
      groupMessages : async (parent, {groupId}, {isAuth, userId} , info) => {
        if(!isAuth){
          throw new Error('Unauthenticated!');
        }
        const group = await Group.findOne({_id: ObjectID(groupId)});
        if(!group){
          throw new Error('No such group found!');
        }
        return group.messages
      }
}

export default queryResolver;