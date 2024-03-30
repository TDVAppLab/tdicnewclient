import { router } from '../trpc'
import { multiobjectiveTextRouter } from './multiobjectiveTextRouter'
import { tleRouter } from './tleRouter'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = router({
  tleRouter,
  multiobjectiveTextRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
