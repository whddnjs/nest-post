import { createParamDecorator, ExecutionContext, SetMetadata } from "@nestjs/common";

export const IS_PUBLIC_KEY = 'IS_PUBLIC';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const User = createParamDecorator<string>((key: string, ctx: ExecutionContext) => {
  const user = ctx.switchToHttp().getRequest()?.user;
  return key ? user?.[key] : user;
});
