import { BaseContext } from "@apollo/server";
import { BaseResolver } from "./BaseResolver";
import { db } from "@/db";
import { User } from "@/domain/User";
import { AlaffiaContext } from "@/domain/AlaffiaContext";

export class UserResolver extends BaseResolver {
    protected async resolver(
        parent: unknown,
        args: { id: string },
        context: AlaffiaContext
    ): Promise<User> {
        try {
           return await context.userDatasource.getUserById(args.id);
        } catch (error) {
            throw new Error(error);
        }
    }

}