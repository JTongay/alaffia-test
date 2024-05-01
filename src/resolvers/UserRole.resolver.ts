import { User } from "@/domain/User";
import { BaseResolver } from "./BaseResolver";
import { AlaffiaContext } from "@/domain/AlaffiaContext";

export class UserRoleResolver extends BaseResolver {
    protected async resolver(
        parent: User,
        args: never,
        context: AlaffiaContext
    ): Promise<String> {
        return await context.userDatasource.getUserRole(parent.roleId);
    }
}