'use strict'

module.exports = async (app) => {

  app.route({
    method: 'POST',
    url: '/',
    preHandler: app.auth([
      app.verifyUser,
      app.registerToken,
      app.saveConnection
    ], { run: 'all' }),

    handler: (request, reply) => {
      return reply.send({ token: request.token })
    }
  })

}
