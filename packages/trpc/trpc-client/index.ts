import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../trpc-server';


const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:8000',
    }),
  ],
}); 

async function main() {
  let response = await trpc.userCreate.mutate({
    email: "swarajrballal@gmail.com",
    hashedPassword: "dfdsfd",
    firstName: "Swaraj",
    lastName: "Ballal"
  })

  console.log(response);
}


