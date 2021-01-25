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
