import { BaseContext } from "@apollo/server";
import { BaseResolver } from "./BaseResolver";
import { AlaffiaContext } from "@/domain/AlaffiaContext";
import { User } from "@/domain/User";

export class UsersResolver extends BaseResolver {
    protected async resolver(
        parent: unknown,
        args: unknown,
        context: AlaffiaContext
    ): Promise<User[]> {
        return await context.userDatasource.getUsers();
    }

}