import DataLoader from "dataloader";
import { db } from "@/db";
import { Facility } from "@/domain/Facility";
import { Location } from "@/domain/Location";

export class FacilityDatasource {
    public async getFacilitiesForUser(userId: string) {
        const response = await db.selectFrom('facilities')
            .innerJoin('user_facilities', 'user_facilities.facility_id', 'facilities.id')
            .where('user_facilities.user_id', '=', userId)
            .select([
                "facilities.id",
                "facilities.name",
                "facilities.created_at",
                "facilities.updated_at"
            ])
            .execute();
        return response.map((facility) => new Facility(facility));
    }

    public async getLocationsForFacility(facilityId: string) {
        const response = await db.selectFrom('locations')
        .innerJoin('facilities', 'facilities.id', 'locations.facility_id')
        .where('facilities.id', '=', facilityId)
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

    public async getFacilityByLocationId(locationId: string) {
        const response = await db.selectFrom('facilities')
            .innerJoin('locations', 'locations.facility_id', 'facilities.id')
            .where('locations.id', '=', locationId)
            .select([
                "facilities.id",
                "facilities.name",
                "facilities.created_at",
                "facilities.updated_at"
            ])
            .executeTakeFirstOrThrow();
        return new Facility(response);
    }
}