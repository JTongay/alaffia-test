import { Users } from "@/db/types";
import { Selectable } from "kysely";

export class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: Date;

    constructor(response: Selectable<Users>) {
        this.id = response.id;
        this.firstName = response.first_name;
        this.lastName = response.last_name;
        this.email = response.email;
        this.createdAt = response.created_at;
    }
}