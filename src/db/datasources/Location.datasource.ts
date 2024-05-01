import { db } from "@/db";
import { Location } from "@/domain/Location";

export class LocationDatasource {
    public async getLocationById(locationId: string): Promise<Location> {
        const response = await db.selectFrom('locations')
            .where('locations.id', '=', locationId)
            .select([
                "locations.id",
                "locations.line1",
                "locations.line2",
                "locations.state",
                "locations.zip",
                "locations.created_at",
                "locations.updated_at",
                "locations.facility_id"
            ])
            .executeTakeFirstOrThrow();

        return new Location(response);
    }

    public async getLocations() {
        const response = await db.selectFrom('locations')
            .select([
                "locations.id",
                "locations.line1",
                "locations.line2",
                "locations.state",
                "locations.zip",
                "locations.created_at",
                "locations.updated_at",
                "locations.facility_id"
            ])
            .execute();
        return response.map((location) => new Location(location));
    }
}