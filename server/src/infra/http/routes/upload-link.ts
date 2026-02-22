import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const uploadLinkRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/upload-link',
    {
      schema: {
        summary: 'Save a new shortened link',
        tags: ['Links'],
        body: z.object({
          url: z.url().describe('The original URL to be shortened'),
          customAlias: z
            .string()
            .optional()
            .describe('Optional custom alias for the shortened link'),
        }),
        response: {
          201: z
            .object({ shortenedLink: z.string() })
            .describe('Link created successfully'),
          400: z
            .object({
              errors: z.array(
                z.object({
                  name: z.string(),
                  error: z.string(),
                })
              ),
            })
            .describe('Validation failed'),
          409: z
            .object({
              message: z.string(),
            })
            .describe('Shortened link already exists'),
        },
      },
    },
    async (request, reply) => {
      return reply.status(201).send({
        shortenedLink: 'https://brev.ly/abc123',
      })
    }
  )
}
