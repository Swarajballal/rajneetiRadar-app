
import { TRPCError } from "@trpc/server";
import { t } from "../trpc";

export const enforceAdminIsAuthed = t.middleware(({ ctx, next }) => {
    if (!ctx.session?.user || ctx.session?.user.role !== "ADMIN") {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next({
      ctx: {
    
        session: { ...ctx.session, user: ctx.session.user },
      },
    });
  });
  