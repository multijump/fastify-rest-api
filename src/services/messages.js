'use strict'

const fp = require('fastify-plugin')

module.exports = fp(async (app) => {

  app.decorate('message', {
    token: token,
    login: login,
    permission: permission,
    validation: validation
  })

  function token (reply) {
    return reply.code(401).send('Invalid Token')
  }

  function login (reply) {
    return reply.code(401).send('Please login again!')
  }

  function permission (reply) {
    return reply.code(401).send('You do not have permission to access this route')
  }

  function validation (reply) {
    return reply.code(400).send('All fields are mandatory')
  }
})
