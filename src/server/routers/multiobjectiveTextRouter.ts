import { z } from 'zod'

import { MultiobjectiveTextTypeUpdates } from '@/global'

import { procedure, router } from '../trpc'

export const multiobjectiveTextRouter = router({
  create: procedure
    .input(
      z.object({
        type: z.string(),
        titleEn: z.string(),
        titleJp: z.string(),
        scriptEn: z.string(),
        scriptJp: z.string(),
        status: z.string(),
        displayDate: z.string(),
      }),
    )
    .mutation(async (opt) => {
      // セッション情報を取得し、存在する場合のみ登録を実行する
      if (opt.ctx.session && opt.ctx.session.user.emailVerified) {
        const newItem = await opt.ctx.prisma.multiobjectiveText.create({
          data: {
            type: opt.input.type,
            titleEn: opt.input.titleEn,
            titleJp: opt.input.titleJp,
            scriptEn: opt.input.scriptEn,
            scriptJp: opt.input.scriptJp,
            status: opt.input.status,
            displayDate: opt.input.displayDate,
          },
        })

        return newItem //追加されたアイテムの内容を返す
      }
    }),

  update: procedure
    .input(
      z.object({
        id: z.string(),
        type: z.string(),
        titleEn: z.string(),
        titleJp: z.string(),
        scriptEn: z.string(),
        scriptJp: z.string(),
        status: z.string(),
        displayDate: z.string(),
      }),
    )
    .mutation(async (opt) => {
      // セッション情報を取得し、存在する場合のみ登録を実行する
      if (opt.ctx.session && opt.ctx.session.user.emailVerified) {
        const ans = await opt.ctx.prisma.multiobjectiveText.update({
          where: {
            id: opt.input.id,
          },
          data: {
            type: opt.input.type,
            titleEn: opt.input.titleEn,
            titleJp: opt.input.titleJp,
            scriptEn: opt.input.scriptEn,
            scriptJp: opt.input.scriptJp,
            status: opt.input.status,
            displayDate: opt.input.displayDate,
          },
        })

        return ans //追加されたアイテムの内容を返す
      }
    }),

  delete: procedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async (opt) => {
      // セッション情報を取得し、存在する場合のみ処理する
      if (opt.ctx.session && opt.ctx.session.user.emailVerified) {
        const deletedTask = await opt.ctx.prisma.multiobjectiveText.delete({
          where: {
            id: opt.input.id,
          },
        })

        return deletedTask //削除したアイテムの内容を返す
      }
    }),

  listForPublic: procedure.query(async (opt) => {
    const ans = await opt.ctx.prisma.multiobjectiveText.findMany({
      where: { type: MultiobjectiveTextTypeUpdates, status: 'approved' },
      orderBy: { displayDate: 'desc' },
    })

    return ans
  }),

  list: procedure.query(async (opt) => {
    if (opt.ctx.session && opt.ctx.session.user.emailVerified) {
      const ans = await opt.ctx.prisma.multiobjectiveText.findMany({
        where: { type: MultiobjectiveTextTypeUpdates },
      })

      return ans
    }
  }),

  get: procedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async (opt) => {
      if (opt.ctx.session && opt.ctx.session.user.emailVerified) {
        const ans = await opt.ctx.prisma.multiobjectiveText.findUnique({
          where: { id: opt.input.id },
        })

        return ans
      }
    }),
})
