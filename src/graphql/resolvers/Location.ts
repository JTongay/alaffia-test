import { FacilityResolver } from "@/resolvers/Facility.resolver";
import { UsersResolver } from "@/resolvers/Users.resolver";
import { resolverMap } from "@/resolvers/resolverMap";

export const LocationResolvers = resolverMap({
    Location: {
        facility: new FacilityResolver(),
        users: new UsersResolver()
    }
})