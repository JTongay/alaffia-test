import { FacilityDatasource } from "@/db/datasources/Facility.datasource";
import { LocationDatasource } from "@/db/datasources/Location.datasource";
import { UserDatasource } from "@/db/datasources/User.datasource";

export interface AlaffiaContext {
    userDatasource: UserDatasource;
    facilityDatasource: FacilityDatasource;
    locationDatasource: LocationDatasource;
}