'use strict'

const fp = require('fastify-plugin')

module.exports = fp(async (app) => {

  app
    .decorate('verifyUser', async (request, reply, done) => {
      let user = await app.knex('users').where('name', request.body.name).first()

      if (user) {
        let password = app.bcrypt.decrypt(request.body.password, user.password)

        if (password) {
          request.user = { id: user.id }

          return done()
        }
      }

      reply.code(404).send('Usuário ou senha incorreto')

    })
    .decorate('registerToken', (request, reply, done) => {
      if (request.user)
        request.token = app.jwt.sign(request.user.id)

      done()
    })
    .decorate('saveConnection', async (request, reply, done) => {
      if (request.token)
        await app.knex('tokens').insert({ user_id: request.user.id })

      done()
    })
    .register(require('@fastify/auth'))
})
