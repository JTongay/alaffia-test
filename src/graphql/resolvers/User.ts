import { FacilitiesResolver } from "@/resolvers/Facilities.resolver";
import { UserRoleResolver } from "@/resolvers/UserRole.resolver";
import { resolverMap } from "@/resolvers/resolverMap";

export const UserResolvers = resolverMap({
    User: {
        role: new UserRoleResolver(),
        facilities: new FacilitiesResolver()
    }
})