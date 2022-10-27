'use strict'

const path = require('path')
const autoload = require('@fastify/autoload')

const fastify = require('fastify')

const app = fastify({
  logger: true
})

app.register(autoload, {
  dir: path.join(__dirname, 'src/plugins')
})

app.register(autoload, {
  dir: path.join(__dirname, 'src/hooks')
})

app.register(autoload, {
  dir: path.join(__dirname, 'src/services')
})

app.register(autoload, {
  dir: path.join(__dirname, 'src/routes')
})

app.listen({ host: '0.0.0.0', port: 3000 })
