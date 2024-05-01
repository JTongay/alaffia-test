import { AlaffiaContext } from "@/domain/AlaffiaContext";
import { BaseResolver } from "./BaseResolver";
import { Facility } from "@/domain/Facility";
import { Location } from "@/domain/Location";

export class LocationsResolver extends BaseResolver {
    protected async resolver(
        parent: Facility,
        args: unknown,
        context: AlaffiaContext
    ): Promise<Location[]> {
        if (parent) {
            return await context.facilityDatasource.getLocationsForFacility(parent.id);
        }
        return await context.locationDatasource.getLocations();
    }

  
}