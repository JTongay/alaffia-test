import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import {GraphQLFileLoader} from "@graphql-tools/graphql-file-loader";
import {loadSchemaSync} from "@graphql-tools/load";
import path from "path";
import { QueryResolvers } from "@/graphql/resolvers/Query";

function loadAlaffiaSchema() {
    return loadSchemaSync(path.join("src", "graphql", "Schema.graphql"), {
        loaders: [new GraphQLFileLoader()]
    });
}

const server = new ApolloServer({
    introspection: true, // Turn off in production
    typeDefs: loadAlaffiaSchema(), // Load from schema directory
    resolvers: {
        ...QueryResolvers
    },
    plugins: []
})

const { url } = await startStandaloneServer(server, {
    listen: {
        port: 8080
    }
});

console.log(`Listening on ${url}`);