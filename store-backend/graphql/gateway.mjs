import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { ApolloGateway } from '@apollo/gateway'

export const startServer = async () => {
    const port = 4000;

    const app = express();

    const gateway = new ApolloGateway({
        serviceList: [
            { "name": "customer", url: "http://localhost:4001/graphql" },
            {"name": "order", url: "http://localhost:4002/graphql"},
            {"name": "product", url: "http://localhost:4003/graphql"}
        
        ]
    });

    const server = new ApolloServer({
        gateway,
        subscriptions: false});

    server.applyMiddleware({app});


    app.listen({port: 4000}, () =>
        console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
    )
    
}
startServer();