'use strict'

const fp = require('fastify-plugin')

module.exports = fp(async (app) => {

  app.decorate('service', {
    audits: audits
  })

  async function audits (request, reply, payload, done) {
    await app.knex('audits').insert({ 
      user_id: request.user.id,
      object_id: payload.id, 
      type: request.context.config.name
    })
  }
})