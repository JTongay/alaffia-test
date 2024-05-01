import { FacilityDatasource } from "@/db/datasources/Facility.datasource";
import { UserDatasource } from "@/db/datasources/User.datasource";

export interface AlaffiaContext {
    userDatasource: UserDatasource;
    facilityDatasource: FacilityDatasource;
}