import { BaseResolver } from "./BaseResolver";
import { BaseContext } from "@apollo/server";

type ResolverFn = (parent: any, args: any, context: BaseContext) => any;

export interface FieldOutput {
    [field: string]: ResolverFn;
}

export interface ResolverMapOutput {
    [parent: string]: FieldOutput;
}

export interface ResolverMapInput {
    [parent: string]: {
        [field: string]: BaseResolver;
    };
}


export const resolverMap = (resolverInput: ResolverMapInput): ResolverMapOutput => {
    let output: ResolverMapOutput = {};

    Object.keys(resolverInput).forEach((resolverParentName) => {
        let parentOutput: FieldOutput = {};

        const resolverParent = resolverInput[resolverParentName];

        Object.keys(resolverParent).forEach((resolverField) => {
            const value = resolverParent[resolverField];

            parentOutput[resolverField] = value.resolve;
        });

        output[resolverParentName] = parentOutput;
    });

    return output;
};
