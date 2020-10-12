
const schema = `
    type Message {
        message: String!
        sentByUserId: ID!
        fromGroupId: ID!
        createdAt: String!
    }

    type User {
        _id: ID!
        name: String!
        email: String!
        password: String
    }

    type Group {
        _id: ID!
        name: String!
        createdAt: String!
    }
    
    type AuthData {
        userId: ID!
        token: String!
    }

    input UserInput {
        name: String!
        email: String!
        password: String!
    }

    type Query {
        login(email: String!, password: String!): AuthData!
        groups: [Group!]!
        groupMessages(groupId: String!): [Message!]!
    }

    type Mutation {
        createUser(userInput: UserInput): User!
        addGroup(name: String!): Group
        sendMessage(message: String!, groupId: ID!): Message
    }

    type Subscription {
        newMessage: Message!
    }
`;

export default schema;
