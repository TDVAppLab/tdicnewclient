import { targetid } from '@/global'

import {
  GetTleFromCelestrackDirect,
  UpdateTleTableFromCelestrack,
} from '../api/tle/GetTleFromCelestrackDirect'
import { procedure, router } from '../trpc'

export const tleRouter = router({
  updateTleTableFromCelestrackTargetOnly: procedure.mutation(async (opt) => {
    if (opt.ctx.session?.user.emailVerified) {
      const start = new Date()

      const temp = await GetTleFromCelestrackDirect(targetid.toString())
      const satellite = {
        //id: '',
        name: temp[0],
        noradCatalogNumber: targetid,
        tleObjectName: temp[0],
        tleLine1: temp[1],
        tleLine2: temp[2],
        syncedAt: new Date(Date.now()),
      }
      try {
        await opt.ctx.prisma.satellite.upsert({
          where: { noradCatalogNumber: satellite.noradCatalogNumber },
          create: satellite,
          update: satellite,
        })
        const finished = new Date()

        await opt.ctx.prisma.applicationLog.create({
          data: {
            key: 'TleUpdateBatch',
            message: `Start : ${start.toString()}Operated : Manually Only Target Satellite`,
            createdAt: finished,
            updatedAt: finished,
          },
        })
      } catch (e) {
        console.log(e)
      }
    }
  }),

  updateTleTableFromCelestrackAll: procedure.mutation(async (opt) => {
    if (opt.ctx.session?.user.emailVerified) {
      const temp2 = await UpdateTleTableFromCelestrack({ db: opt.ctx.prisma })
    }
  }),

  getTleString: procedure.query(async (opt) => {
    const ans = await opt.ctx.prisma.satellite.findUnique({
      where: { noradCatalogNumber: targetid },
    })
    return ans
  }),

  getTleStringAll: procedure.query(async (opt) => {
    const ans = await opt.ctx.prisma.satellite.findMany()
    return ans
  }),
})
