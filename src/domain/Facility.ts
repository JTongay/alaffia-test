import { Facilities } from "@/db/types";
import { Selectable } from "kysely";

export class Facility {
    id: string;
    name: string;
    createdAt: Date;

    constructor(response: Selectable<Facilities>) {
        this.id = response.id;
        this.name = response.name;
        this.createdAt = response.created_at;
    }
}