import fastifyCors from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import scalarUI from '@scalar/fastify-api-reference'
import fastify from 'fastify'
import {
  hasZodFastifySchemaValidationErrors,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { env } from '@/env'
import { uploadLinkRoute } from './routes/upload-link'

const app = fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.setErrorHandler((error, request, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    reply.status(400).send({
      message: 'Validation error',
      issues: error.validation,
    })
  } else {
    reply.status(500).send({
      message: 'Internal server error',
    })
  }

  // Envia o erro para alguma ferramenta de monitoramento, como Sentry, LogRocket, Datadog, Grafana OTel, etc.
  console.log(error)

  return reply.status(500).send({ message: 'Internal server error' })
})

app.register(fastifyCors, {
  origin: '*',
})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Brev.ly API',
      description: 'API para encurtar links',
      version: '1.0.0',
    },
  },
})

app.get('/openapi.json', () => app.swagger())

app.register(scalarUI, {
  routePrefix: '/docs',
  configuration: {
    layout: 'modern',
  },
})

app.register(uploadLinkRoute)

app.listen({ port: env.PORT, host: '0.0.0.0' }).then(() => {
  console.log('HTTP server running!')
})
