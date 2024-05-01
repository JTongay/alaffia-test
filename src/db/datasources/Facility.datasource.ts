import DataLoader from "dataloader";
import { db } from "@/db";
import { Facility } from "@/domain/Facility";

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
}