import { Upload } from '@aws-sdk/lib-storage'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { uploadLink } from '@/app/functions/upload-link'
import { env } from '@/env'
import { r2 } from '@/infra/storage/client'
import { isRight, unwrapEither } from '@/shared/either'

export const uploadLinkRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/upload-link',
    {
      schema: {
        summary: 'Save a new shortened link',
        tags: ['Links'],
        body: z.object({
          url: z.url().describe('The original URL to be shortened'),
          shortcode: z
            .string()
            .regex(
              /^[a-zA-Z0-9_-]+$/,
              'Shortcode can only contain letters, numbers, underscores, and hyphens'
            )
            .optional()
            .describe('Optional custom shortcode for the shortened link'),
        }),
        response: {
          201: z
            .object({ id: z.string() })
            .describe('Link created successfully'),
          400: z
            .object({
              message: z.string(),
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
      const result = await uploadLink(request.body)

      if (isRight(result)) {
        const { id } = unwrapEither(result)

        const upload = new Upload({
          client: r2,
          params: {
            Key: `${id}.json`,
            Bucket: env.CLOUDFLARE_BUCKET,
            Body: JSON.stringify({
              id,
              url: request.body.url,
              shortcode: request.body.shortcode,
            }),
            ContentType: 'text/plain',
          },
        })

        await upload
          .done()
          .then(data => console.log('Upload concluído:', data.ETag))

        return reply.status(201).send({ id })
      }

      const error = unwrapEither(result)

      switch (error.constructor.name) {
        case 'DuplicatedShortcode':
          return reply
            .status(409)
            .send({ message: 'Shortened link already exists' })
        case 'ShortcodeGenerationFailed':
          return reply.status(400).send({
            message: 'Failed to generate a unique shortcode, please try again',
          })
      }
    }
  )
}
