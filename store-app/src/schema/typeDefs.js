import {gql} from 'apollo-server';


export const typeDefs = gql `
    type Product {
        id: ID!,
        name: String!,
        price: Float!,
        quantity: Int!,
        imgLink: String
    }
    input ProductInput {
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

    type Query {
        products: [Product],
        customers(id: ID): [Customer],
        order(id: ID): [Order]
    }

    type Mutation {
        addProduct(name: String!, price: Float!, quantity: Int!, imgLink: String): Product
        addCustomer(customerInput: CustomerInput!, addressInput: AddressInput!): RegisterCustomer
        addOrder(orderInput: OrderInput!): Order
    }
`