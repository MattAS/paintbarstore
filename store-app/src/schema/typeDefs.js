import {gql} from 'apollo-server';

export const typeDefs = gql `
    type Product {
        id: ID!,
        name: String!,
        price: Float!,
        quantity: Int!,
        imgLink: String
    }
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
    type Query {
        products: [Product],
        customers: [Customer],
        GetCustomerAddress(id: ID!): [Address]
    }

    type Mutation {
        addProduct(name: String!, price: Float!, quantity: Int!, imgLink: String): Product
        addCustomer(customerInput: CustomerInput!, addressInput: AddressInput!): Customer
    }
`