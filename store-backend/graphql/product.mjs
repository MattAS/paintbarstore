import { gql } from 'apollo-server';
import {Product} from '../models/Product.mjs'
import {buildFederatedSchema} from '@apollo/federation';
import {userName, userPassword} from '../config.mjs';
import {ApolloServer} from 'apollo-server-express';
import express from 'express';
import mongoose from 'mongoose';

export const typeDefs = gql`
    type Product {
        id: ID!,
        name: String!,
        price: Float!,
        quantity: Int!,
        imgLink: String
    }
    
    extend type Query {
        products: [Product],
    }

    extend type Mutation {
        addProduct(name: String!, price: Float!, quantity: Int!, imgLink: String): Product
    }
`

export const resolvers = {
    Query: {
        products: () => Product.find(),
    },
    Mutation: {
        addProduct: async (_, { name, price, quantity, imgLink }) => {
            const newProduct = new Product({name, price, quantity, imgLink});
            await newProduct.save();
            return newProduct;
        },
    }
};


const startServer = async () => {
    const port = 4003;
    
    const app = express();

    await mongoose.connect(`mongodb+srv://${userName}:${userPassword}@storecluster.oogf8.mongodb.net/paintbarstore?retryWrites=true&w=majority`, {useNewUrlParser:true});
    
    const server = new ApolloServer({
        schema: buildFederatedSchema([{
            typeDefs,
            resolvers,
        }])});

    server.applyMiddleware({app});


    app.listen({port}, () =>
        console.log(`Server ready at http://localhost:4003${server.graphqlPath}`)
    )
}

startServer();