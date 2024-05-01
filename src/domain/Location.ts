import { Locations } from "@/db/types";
import { Nullable } from "@/util";
import { Selectable } from "kysely";

export class Location {
    id: string;
    state: string;
    zip: number;
    line1: string;
    line2: Nullable<string>;
    createdAt: Date;
    updatedAt: Date;

    constructor(response: Selectable<Locations>) {
        this.id = response.id;
        this.state = response.state;
        this.zip = response.zip;
        this.line1 = response.line1;
        this.line2 = response.line2;
        this.createdAt = response.created_at;
        this.updatedAt = response.updated_at;
    }

    addressFull() {
        return `${this.address()}, ${this.state} ${this.zip}`;
    }

    address() {
        return `${this.line1}${this.line2 ? `, ${this.line2}` : ""}`;
    }
}