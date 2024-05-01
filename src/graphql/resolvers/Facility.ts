import { LocationsResolver } from "@/resolvers/Locations.resolver";
import { resolverMap } from "@/resolvers/resolverMap";

export const FacitilityResolvers = resolverMap({
    Facility: {
        locations: new LocationsResolver()
    }
})