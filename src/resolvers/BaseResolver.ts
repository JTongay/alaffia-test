import type { AlaffiaContext } from "@/domain/AlaffiaContext";

export abstract class BaseResolver<
    ParentType = unknown,
    ArgsType = unknown,
    ReturnType = unknown
> {
  public resolve = async (
      parent: ParentType,
      args: ArgsType,
      context: AlaffiaContext
  ): Promise<ReturnType> => {
    return await this.authCheck(parent, args, context);
  };

  private authCheck = async (
    parent: ParentType,
    args: ArgsType,
    context: AlaffiaContext
  ): Promise<ReturnType> => {
    return this.resolver(parent, args, context);
  };


  protected abstract resolver(
    parent: ParentType,
    args: ArgsType,
    context: AlaffiaContext
  ): Promise<ReturnType>
}

