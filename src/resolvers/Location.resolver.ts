import { AlaffiaContext } from "@/domain/AlaffiaContext";
import { BaseResolver } from "./BaseResolver";
import { InputType } from "@/util";
import { Location } from "@/domain/Location";

export class LocationResolver extends BaseResolver {
    protected async resolver(
        parent: unknown,
        args: InputType<{ locationId: string }>,
        context: AlaffiaContext
    ): Promise<Location> {
        return await context.locationDatasource.getLocationById(args.input.locationId);
    }

}