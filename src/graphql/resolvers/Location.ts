import { FacilityResolver } from "@/resolvers/Facility.resolver";
import { resolverMap } from "@/resolvers/resolverMap";

export const LocationResolvers = resolverMap({
    Location: {
        facility: new FacilityResolver()
    }
})