import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getLinks } from '@/app/functions/get-links'
import { unwrapEither } from '@/shared/either'

export const getLinksRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/links',
    {
      schema: {
        summary: 'Get links',
        tags: ['Links'],
        querystring: z.object({
          searchQuery: z.string().optional(),
          sortBy: z.enum(['createdAt']).optional(),
          sortDirection: z.enum(['asc', 'desc']).optional(),
          page: z.coerce.number().optional().default(1),
          pageSize: z.coerce.number().optional().default(20),
        }),
        response: {
          200: z.object({
            links: z.array(
              z.object({
                id: z.uuid(),
                url: z.url(),
                shortcode: z.string().nullable(),
                accessCount: z.number(),
                createdAt: z.date(),
              })
            ),
            total: z.number(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { searchQuery, sortBy, sortDirection, page, pageSize } =
        request.query

      const result = await getLinks({
        searchQuery,
        sortBy,
        sortDirection,
        page,
        pageSize,
      })

      const { links, total } = unwrapEither(result)

      return reply.status(200).send({ links, total })
    }
  )
}
