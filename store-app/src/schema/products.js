export const product = `
    type Product {
        id: ID!,
        name: String!,
        price: Float!,
        quantity: Int!,
        imgLink: String
    }
`
export const productQuery = ` 
    type Query {
        products: [Product],
    }
`

export const productMutation = `
    type Mutation {
        addProduct(name: String!, price: Float!, quantity: Int!, imgLink: String): Product
    }
`