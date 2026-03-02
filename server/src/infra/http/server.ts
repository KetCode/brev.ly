import fastifyCors from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import scalarUI from '@scalar/fastify-api-reference'
import fastify from 'fastify'
import {
  hasZodFastifySchemaValidationErrors,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

import { env } from '@/env'
import { createLinkRoute } from './routes/create-link'
import { deleteLinkByShortcodeRoute } from './routes/delete-link-by-shortcode'
import { exportLinksRoute } from './routes/export-links'
import { getLinksRoute } from './routes/get-links'
import { redirectToOriginalUrlRoute } from './routes/redirect-to-original-url'

const app = fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.setErrorHandler((error, request, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    const validation = error.validation as any[]

    // console.log(error.validation)
    return reply.status(400).send({
      message: validation,
    })
  }

  // Envia o erro para alguma ferramenta de monitoramento, como Sentry, LogRocket, Datadog, Grafana OTel, etc.
  console.log(error)

  return reply.status(500).send({ message: 'Internal server error' })
})

app.register(fastifyCors, {
  origin: '*',
  methods: ['GET', 'POST', 'DELETE'],
})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Brev.ly API',
      description: 'API para encurtar links',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})

app.get('/openapi.json', () => app.swagger())

app.register(scalarUI, {
  routePrefix: '/docs',
  configuration: {
    layout: 'modern',
  },
})

app.register(createLinkRoute)
app.register(getLinksRoute)
app.register(exportLinksRoute)
app.register(deleteLinkByShortcodeRoute)

app.register(redirectToOriginalUrlRoute)

app.listen({ port: env.PORT, host: '0.0.0.0' }).then(() => {
  console.log('HTTP server running!')
})
