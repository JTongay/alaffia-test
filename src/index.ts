import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import {GraphQLFileLoader} from "@graphql-tools/graphql-file-loader";
import {loadSchemaSync} from "@graphql-tools/load";
import path from "path";
import { QueryResolvers } from "@/graphql/resolvers/Query";
import { AlaffiaContext } from "./domain/AlaffiaContext";
import { UserDatasource } from "./db/datasources/User.datasource";
import { UserResolvers } from "./graphql/resolvers/User";
import { EnumResolvers } from "./graphql/resolvers/RoleEnum";
import { FacilityDatasource } from "./db/datasources/Facility.datasource";
import { FacitilityResolvers } from "./graphql/resolvers/Facility";
import { LocationDatasource } from "./db/datasources/Location.datasource";
import { LocationResolvers } from "./graphql/resolvers/Location";

export function loadAlaffiaSchema() {
    return loadSchemaSync(path.join("src", "graphql", "Schema.graphql"), {
        loaders: [new GraphQLFileLoader()]
    });
}

const server = new ApolloServer<AlaffiaContext>({
    introspection: true, // Turn off in production
    typeDefs: loadAlaffiaSchema(), // Load from schema directory
    resolvers: {
        ...QueryResolvers,
        ...UserResolvers,
        ...FacitilityResolvers,
        ...LocationResolvers,
        ...EnumResolvers
    },
    plugins: [],
})

const api = await startStandaloneServer(server, {
    listen: {
        port: 8080
    },
    context: async ({req, res}) => ({
        userDatasource: new UserDatasource(),
        facilityDatasource: new FacilityDatasource(),
        locationDatasource: new LocationDatasource()
    })
});

console.log(`Listening on ${api.url}`);