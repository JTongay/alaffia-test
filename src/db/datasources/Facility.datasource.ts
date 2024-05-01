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
        .innerJoin('facility_locations', 'facility_locations.location_id', 'locations.id')
        .where('facility_locations.facility_id', '=', facilityId)
        .select([
            "locations.id",
            "locations.line1",
            "locations.line2",
            "locations.state",
            "locations.zip",
            "locations.created_at",
            "locations.updated_at"
        ])
        .execute();

        return response.map((location) => new Location(location));
    }
}