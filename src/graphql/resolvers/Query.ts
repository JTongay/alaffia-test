import { UserResolver } from "@/resolvers/User.resolver";
import { TestResolver } from "@/resolvers/Test.resolver";
import { resolverMap } from "@/resolvers/resolverMap";
import { UsersResolver } from "@/resolvers/Users.resolver";
import { LocationResolver } from "@/resolvers/Location.resolver";
import { LocationsResolver } from "@/resolvers/Locations.resolver";

export const QueryResolvers = resolverMap({
    Query: {
        test: new TestResolver(),
        user: new UserResolver(),
        users: new UsersResolver(),
        location: new LocationResolver(),
        locations: new LocationsResolver()
    }
});