'use strict'

const fp = require('fastify-plugin')

module.exports = fp(async (app) => {

  app.register(require('fastify-guard'), {
    errorHandler: (result, request, reply) => {
      return app.message.permission(reply)
    }
  })
})
