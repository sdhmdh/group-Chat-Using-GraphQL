import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const groupSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  messages: [
      {
          message:{
            type: String
          },
          sentByUserId:{
            type: String,
            ref: 'User'
          },
          createdAt: {type: String}
      }
  ]
},
{ timestamps: true });

export default mongoose.model('Group', groupSchema);