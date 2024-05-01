import { AlaffiaContext } from "@/domain/AlaffiaContext";
import { BaseResolver } from "./BaseResolver";
import { User } from "@/domain/User";
import { Facility } from "@/domain/Facility";

export class FacilitiesResolver extends BaseResolver {
    protected async resolver(
        parent: User,
        args: unknown,
        context: AlaffiaContext
    ): Promise<Facility[]> {
        try {
            return await context.facilityDatasource.getFacilitiesForUser(parent.id);
        } catch (error) {
            throw new Error(error);
        }
    }

}