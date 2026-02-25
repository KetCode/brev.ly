import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { deleteLinkById } from '@/app/functions/delete-link-by-id'
import { isRight, unwrapEither } from '@/shared/either'

export const deleteLinkByIdRoute: FastifyPluginAsyncZod = async app => {
  app.delete(
    '/links/:id',
    {
      schema: {
        summary: 'Delete link by ID',
        description: 'This action is irreversible',
        tags: ['Links'],
        params: z.object({
          id: z.string().describe('ID of the link to be deleted'),
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
      const { id } = request.params

      const result = await deleteLinkById({ id })

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
