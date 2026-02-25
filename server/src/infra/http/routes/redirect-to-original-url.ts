import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { redirectToOriginalUrl } from '@/app/functions/redirect-to-original-url'
import { isRight, unwrapEither } from '@/shared/either'

export const redirectToOriginalUrlRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/:shortcode',
    {
      schema: {
        summary: 'Redirect to original url',
        params: z.object({
          shortcode: z.string().describe('Shortcode of the original url'),
        }),
        response: {
          302: z.undefined().describe('Redirected to original URL'),
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

      const result = await redirectToOriginalUrl({ shortcode })

      if (isRight(result)) {
        const url = unwrapEither(result)
        return reply.redirect(url)
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
