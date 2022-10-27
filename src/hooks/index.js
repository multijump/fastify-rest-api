'use strict'

const fp = require('fastify-plugin')
const fs = require('fs')

module.exports = fp(async (app) => {

  app.addHook('preHandler', async (request, reply) => {
    let token = request.headers['x-access-token']
  
    if (token) {
  
      await app.jwt.verify(token, async (error) => {
        if (error)
          return app.message.token(reply)
      })
  
      let [user] = await app.knex('users')
                            .select('users.id', 'users.role', 'tokens.is_revoked')
                            .innerJoin('tokens', 'users.id', 'tokens.user_id')
                            .where('users.id', app.jwt.decode(token))
                            .orderBy('tokens.id', 'desc')
                            .limit(1)
      
      if (user)
        if (user.is_revoked)
          return app.message.login(reply)
        else
          request.user = { id: user.id, role: [user.role] }
    }
  })

  app.addHook('onError', (request, reply, error, done) => {
    fs.appendFileSync('error.log', JSON.stringify(error.message) + '\n')
    done()
  })
})
