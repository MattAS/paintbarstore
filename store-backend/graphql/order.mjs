import {gql} from 'apollo-server';
import {Order} from '../models/Order.mjs'
import {ApolloServer} from 'apollo-server-express';
import {buildFederatedSchema} from '@apollo/federation';
import {userName, userPassword} from '../config.mjs';
import express from 'express';
import mongoose from 'mongoose';

export const typeDefs = gql `
    type Order {
        id: String!
        product_id: ID!
        status: Int!,
        customer_id:ID!
    }
    input OrderInput {
        id: String!
        product_id: ID!
        status: Int!,
        customer_id:ID!
    }

    extend type Query {
        order(id: ID): [Order]
    }

    extend type Mutation {
        addOrder(orderInput: OrderInput!): Order
    }
`

export const resolvers = {
    Query: {
        order: (parent, {id}) => {
            if (id != null) {
                return Order.find({customer_id: id}).exec();
            }
            return Order.find()
        }
    },
    Mutation: {
        addOrder: async(parent, {orderInput}) => {
            var id = orderInput.id;
            var product_id = orderInput.product_id;
            var customer_id = orderInput.customer_id;
            var status = orderInput.status;
            
            const newOrder = new Order({id, product_id, status, customer_id});
            await newOrder.save();
            return newOrder;
        }
    }
};


const startServer = async () => {
    const port = 4002;
    
    const app = express();

    await mongoose.connect(`mongodb+srv://${userName}:${userPassword}@storecluster.oogf8.mongodb.net/paintbarstore?retryWrites=true&w=majority`, {useNewUrlParser:true});
    
    const server = new ApolloServer({
        schema: buildFederatedSchema([{
            typeDefs,
            resolvers,
        }])});

    server.applyMiddleware({app});


    app.listen({port}, () =>
        console.log(`Server ready at http://localhost:4002${server.graphqlPath}`)
    )
}

startServer();
