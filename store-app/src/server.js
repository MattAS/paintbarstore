import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import {typeDefs} from './schema/typeDefs.js';
import {resolvers} from './schema/resolvers.js';
import mongoose from 'mongoose';
import {userPassword, userName} from '../config.js'

export const startServer = async () => {
    const app = express();
    const server = new ApolloServer({typeDefs, resolvers, context:({req, res}) => {req,res}});
    
    server.applyMiddleware({
        app,
    });
    
    await mongoose.connect(`mongodb+srv://${userName}:${userPassword}@storecluster.oogf8.mongodb.net/paintbarstore?retryWrites=true&w=majority`, {useNewUrlParser:true});
    
    app.listen({port: 4000}, () =>
        console.log(`Server ready at http://localhost:4000${server.graphqlPath}`) 
    )
}

// import express from 'express';
// import {ApolloServer} from 'apollo-server-express';
// import mongoose from 'mongoose';
// import {userPassword, userName} from '../config.js'
// import {customerTypeDefs, customerResolvers} from './graphql/customer-graph.js'
// import {orderTypeDefs, orderResolvers} from './graphql/order-graph.js'
// import {productTypeDefs, productResolvers} from './graphql/product.js'

// export const startServer = async () => {
//     const app = express();
//     const schema = [customerTypeDefs, orderTypeDefs, productTypeDefs]
//     const resolvers = [customerResolvers, orderResolvers, productResolvers]
//     const server = new ApolloServer({
//         typeDefs: schema,
//         resolver: resolvers,
//         context:({req, res}) => {req,res}});

    
//     server.applyMiddleware({
//         app,
//     });
    
//     await mongoose.connect(`mongodb+srv://${userName}:${userPassword}@storecluster.oogf8.mongodb.net/paintbarstore?retryWrites=true&w=majority`, {useNewUrlParser:true});
    
//     app.listen({port: 4000}, () =>
//         console.log(`Server ready at http://localhost:4000${server.graphqlPath}`) 
//     )
// }
