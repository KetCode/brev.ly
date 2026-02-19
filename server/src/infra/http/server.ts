import fastifyCors from '@fastify/cors'
import fastify from 'fastify'
import { env } from '@/env'

const app = fastify()

app.register(fastifyCors, {
  origin: '*',
})

app.listen({ port: env.PORT, host: '0.0.0.0' }).then(() => {
  console.log('HTTP server running!')
})
