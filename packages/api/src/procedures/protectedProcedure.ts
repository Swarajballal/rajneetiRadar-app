import { t } from "../trpc";
import { enforceUserIsAuthed } from "../middlewares/enforceUserIsAuthed";

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);