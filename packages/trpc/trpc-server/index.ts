import { publicProcedure, router } from './trpc';
import { z } from 'zod';

const appRouter = router({
   createUser: publicProcedure
        .input(z.object({
            email: z.string().email(),
            password: z.string().min(8),
            firstName: z.string(),
            lastName: z.string(),
        })
        .mutation
        
        )
});
 
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;