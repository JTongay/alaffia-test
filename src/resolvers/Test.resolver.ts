import { BaseResolver } from "./BaseResolver";

export class TestResolver extends BaseResolver {
    protected resolver = async (parent: any, args: any, context: any) => {
        return "Hello, World!";
    }
}