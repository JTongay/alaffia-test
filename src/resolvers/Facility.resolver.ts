import { AlaffiaContext } from "@/domain/AlaffiaContext";
import { BaseResolver } from "./BaseResolver";
import { Location } from "@/domain/Location";
import { Facility } from "@/domain/Facility";

export class FacilityResolver extends BaseResolver {
    protected async resolver(
        parent: Location,
        args: unknown,
        context: AlaffiaContext
    ): Promise<Facility> {
        try {
            return await context.facilityDatasource.getFacilityByLocationId(parent.id);
        } catch (error) {
            throw new Error(error);
        }
    }

}