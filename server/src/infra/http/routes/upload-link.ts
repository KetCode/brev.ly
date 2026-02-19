import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

export const uploadLinkRoute: FastifyPluginAsyncZod = async app => {
  app.post('/uploads', () => {
    return 'Hello!'
  })
}
