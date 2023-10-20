import { t } from "../trpc";
import { enforceAdminIsAuthed } from "../middlewares/enforceAdminIsAuthed";

export const protectedProcedure = t.procedure.use(enforceAdminIsAuthed);