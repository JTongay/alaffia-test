import { BaseResolver } from "./BaseResolver";
import { AlaffiaContext } from "@/domain/AlaffiaContext";
import { User } from "@/domain/User";
import { Location } from "@/domain/Location";

export class UsersResolver extends BaseResolver {
    protected async resolver(
        parent: Location,
        args: unknown,
        context: AlaffiaContext
    ): Promise<User[]> {
        if (parent) {
            return await context.userDatasource.getUsersByLocation(parent.id);
        }
        return await context.userDatasource.getUsers();
    }

}