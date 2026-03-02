import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { deleteLinkByShortcode } from '@/app/functions/delete-link-by-shortcode'
import { isRight, unwrapEither } from '@/shared/either'

export const deleteLinkByShortcodeRoute: FastifyPluginAsyncZod = async app => {
  app.delete(
    '/links/:shortcode',
    {
      schema: {
        summary: 'Delete link by Shortcode',
        description: 'This action is irreversible',
        tags: ['Links'],
        params: z.object({
          shortcode: z.string().describe('Shortcode of the link to be deleted'),
        }),
        body: z.object({}).describe('No body required'),
        response: {
          204: z.undefined().describe('Link deleted successfully'),
          404: z
            .object({
              message: z.string(),
            })
            .describe('Link not found'),
        },
      },
    },
    async (request, reply) => {
      const { shortcode } = request.params

      const result = await deleteLinkByShortcode({ shortcode })

      if (isRight(result)) {
        return reply.status(204).send()
      }

      const error = unwrapEither(result)

      switch (error.constructor.name) {
        case 'InvalidLink':
          return reply.status(404).send({
            message: 'Link not found',
          })
      }
    }
  )
}
