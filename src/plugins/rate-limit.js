'use strict'

const fp = require('fastify-plugin')

module.exports = fp(async (app) => {

  app.register(require('@fastify/rate-limit'), {
    max: 100,
    ban: 10,
    timeWindow: '10m',
    errorResponseBuilder: () => (
      { statusCode: 429, error: 'Muitos pedidos', message: 'Limite de taxa excedido' }
    )
  })

})
