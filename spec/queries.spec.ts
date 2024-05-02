import { ApolloServer } from "@apollo/server";
import { QueryResolvers } from "@/graphql/resolvers/Query";
import { UserResolvers } from "@/graphql/resolvers/User";
import { FacitilityResolvers } from "@/graphql/resolvers/Facility";
import { LocationResolvers } from "@/graphql/resolvers/Location";
import { EnumResolvers } from "@/graphql/resolvers/RoleEnum";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import path from "path";
import { UserDatasource } from "@/db/datasources/User.datasource";
import { FacilityDatasource } from "@/db/datasources/Facility.datasource";
import { LocationDatasource } from "@/db/datasources/Location.datasource";
import { db } from "@/db";

/**
 * Full Disclaimer. None of this in this is test is standard.
 * All of these calls should be mocked and tested in isolation.
 * I am just showcasing that the query works without having to call the
 * query manually
 */

describe("getUserAndFacilitiesQuery", () => {
    const contextValue = {
        userDatasource: new UserDatasource(),
        facilityDatasource: new FacilityDatasource(),
        locationDatasource: new LocationDatasource()
    }
    const testServer = new ApolloServer({
        typeDefs: () => {
            return loadSchemaSync(path.join("src", "graphql", "Schema.graphql"), {
                loaders: [new GraphQLFileLoader()]
            });
        },
        resolvers: {
            ...QueryResolvers,
            ...UserResolvers,
            ...FacitilityResolvers,
            ...LocationResolvers,
            ...EnumResolvers
        },
    });
    it("makes sure the test suite is set up properly", () => {
        expect(true).toBe(true);
    });

    it("should return a user and their facilities", async () => {
        const userId = await db.selectFrom('users').select(['id']).executeTakeFirstOrThrow();

        const query = `
        query Query($userId: ID!) {
            user(id: $userId) {
            id
            firstName
            lastName
            email
            role
            createdAt
            facilities {
                id
                name
                createdAt
                locations {
                    id
                    state
                    zip
                    address
                }
            }
        }
        }`;
        const response = await testServer.executeOperation({
            query,
            variables: {
                userId: userId.id
            }
        }, { contextValue });
        if (response.body.kind == "single") {
            const responseBody = response.body.singleResult;
            console.log(responseBody.data, "Full Response Body");
            expect(responseBody.data).toBeTruthy();
            expect(responseBody.data.user).toBeTruthy();
        }
    });

    it("should return a Users by Location", async () => {
        const locationId = await db.selectFrom('locations').select(['id']).executeTakeFirstOrThrow();

        const query = `
        query Location($input: UsersByLocationInput!) {
            location(input: $input) {
                id
                state
                zip
                address
                addressFull
                facility {
                    id
                    name
                    createdAt
                }
                users {
                    id
                    firstName
                    lastName
                    email
                    role
                    createdAt
                }
            }
          }`;
        const response = await testServer.executeOperation({
            query,
            variables: {
                input: {
                  locationId: locationId.id
                }
              }
        }, { contextValue });
        if (response.body.kind == "single") {
            const responseBody = response.body.singleResult;
            console.log(responseBody.data, "Full Response Body");
            expect(responseBody.data).toBeTruthy();
            expect(responseBody.data.location).toBeTruthy();
        }
    });
})