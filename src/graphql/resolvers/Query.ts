import { TestResolver } from "../../resolvers/Test.resolver";
import { resolverMap } from "../../resolvers/resolverMap";

export const QueryResolvers = resolverMap({
    Query: {
        test: new TestResolver()
    }
});