import { publicProcedure, router } from './trpc';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { z } from 'zod';

const appRouter = router({
   createUser: publicProcedure
        .input(z.object({
            email: z.string().email(),
            password: z.string().min(8),
            firstName: z.string(),
            lastName: z.string(),
        }))
        .mutation(async (opts) => {
            const { email, password, firstName, lastName } = opts.input;

            // do db stuff

            return {
                id: '123',
                email,  
                firstName,
                lastName,
            }
        
        })
          
});
 

const server = createHTTPServer({
    router: appRouter,
  });
   
  server.listen(3000);

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;