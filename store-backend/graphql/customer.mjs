import {gql} from 'apollo-server';
import {ApolloServer} from 'apollo-server-express';
import {userName, userPassword} from '../config.mjs';
import express from 'express';
import mongoose from 'mongoose';
import {Customer} from '../models/Customer.mjs'
import {buildFederatedSchema} from '@apollo/federation';

export const typeDefs = gql `
    type Address {
        addressLine1: String!,
        addressLine2: String, 
        zip: String!, 
        country: String!, 
        city: String!

    }
    input AddressInput {
        addressLine1: String!,
        addressLine2: String, 
        zip: String!, 
        country: String!, 
        city: String!
    }
    type Customer {
        id: ID!,
        firstName: String!,
        lastName: String!,
        email: String!,
        phoneNumber: String!,
        address: Address!
    }
    input CustomerInput {
        firstName: String!,
        lastName: String!,
        email: String!,
        phoneNumber: String!,
    }
    type RegisterCustomer {
        customer: Customer
        address: Address
    }
    extend type Query {
        customers(id: ID): [Customer],
    }

    extend type Mutation {
        addCustomer(customerInput: CustomerInput!, addressInput: AddressInput!): RegisterCustomer
    }
`

export const resolvers = {
    Query: {
        customers: (parent, {id}) => {
            if(id != null) {
                return Customer.find({'_id': {$in: [id]}}).exec();
            }
            return Customer.find();
        },
    },
    Mutation: {
        addCustomer: async(parent, {customerInput, addressInput}, context, info) => {
            var firstName = customerInput.firstName;
            var lastName = customerInput.lastName;
            var email = customerInput.email;
            var phoneNumber = customerInput.phoneNumber;
            var addressLine1 = addressInput.addressLine1;
            var addressLine2 = addressInput.addressLine2;
            var zip = addressInput.zip;
            var country = addressInput.country;
            var city = addressInput.city;


            const newCustomer = new Customer({firstName, lastName, email, phoneNumber, address:{addressLine1, addressLine2, zip, country, city}});
            await newCustomer.save();
            return newCustomer;
        },
    }
};

const startServer = async () => {
    const port = 4001;
    
    const app = express();

    await mongoose.connect(`mongodb+srv://${userName}:${userPassword}@storecluster.oogf8.mongodb.net/paintbarstore?retryWrites=true&w=majority`, {useNewUrlParser:true});
    
    const server = new ApolloServer({
        schema: buildFederatedSchema([{
            typeDefs,
            resolvers,
        }])});

    server.applyMiddleware({app});


    app.listen({port}, () =>
        console.log(`Server ready at http://localhost:4001${server.graphqlPath}`)
    )
}

startServer();