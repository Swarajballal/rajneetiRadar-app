
import { TRPCError } from "@trpc/server";
import { t } from "../trpc";

export const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session?.user || ctx.session?.user.role !== "USER") {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});
    