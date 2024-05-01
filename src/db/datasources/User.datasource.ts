import DataLoader from "dataloader";
import { db } from "@/db";
import { Users } from "../types";
import { Selectable } from "kysely";
import { User } from "@/domain/User";

export class UserDatasource {
    private batchUsers = new DataLoader(async (ids: string[]) => {
        const users = await db.selectFrom('users').where('id', 'in', ids).selectAll().execute();
        const userIdsToUserMap = users.reduce((mapping, user) => {
            mapping[user.id] = user;
            return mapping;
          }, {} as { [key: string]: Selectable<Users> });
          return ids.map((id) => userIdsToUserMap[id]);
    });

    async getUserById(id: string): Promise<User> {
        const userBatch = await this.batchUsers.load(id);
        return new User(userBatch);
    }

    async getUsers(): Promise<User[]> {
        const users = await db.selectFrom('users').selectAll().execute();
        return users.map(user => new User(user));
    }

    async getUserRole(roleId: string): Promise<string> {
        const response = await db
            .selectFrom('roles')
            .where("roles.id", "=", roleId)
            .select("name")
            .executeTakeFirstOrThrow();
        return response.name;
    }
}