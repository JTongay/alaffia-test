import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Facilities {
  created_at: Generated<Timestamp | null>;
  id: Generated<string>;
  name: string;
  updated_at: Generated<Timestamp | null>;
}

export interface Locations {
  created_at: Generated<Timestamp | null>;
  facility_id: string;
  id: Generated<string>;
  line1: string;
  line2: string | null;
  state: string;
  updated_at: Generated<Timestamp | null>;
  zip: number;
}

export interface Roles {
  created_at: Generated<Timestamp | null>;
  id: Generated<string>;
  name: string;
  updated_at: Generated<Timestamp | null>;
}

export interface UserFacilities {
  created_at: Generated<Timestamp | null>;
  facility_id: string;
  id: Generated<string>;
  updated_at: Generated<Timestamp | null>;
  user_id: string;
}

export interface Users {
  created_at: Generated<Timestamp | null>;
  email: string;
  first_name: string;
  id: Generated<string>;
  last_name: string;
  role_id: string;
  updated_at: Generated<Timestamp | null>;
}

export interface DB {
  facilities: Facilities;
  locations: Locations;
  roles: Roles;
  user_facilities: UserFacilities;
  users: Users;
}
