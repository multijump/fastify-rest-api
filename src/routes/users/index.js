'use strict'

module.exports = async (app) => {
  
  app.route({
    method: 'POST',
    url: '/',
    schema: {
      body: {
        type: 'object',
        required: ['name', 'role', 'password']
      }
    },
    attachValidation: true,
    preHandler: (request, reply, done) => {
      request.body.password = app.bcrypt.encrypt(request.body.password)
      done()
    },
    handler: async (request, reply) => {

      if (request.validationError) {
        return app.message.validation(reply)
      }

      let [data] = await app.knex('users')
                            .insert(request.body)
                            .returning('*')

      return reply.send(data)
    }
  })

  app.get('/', async (request, reply) => {
    let data = await app.knex('users')
                        .orderBy('id', 'asc')

    return reply.send(data)
  })

  app
  .put('/:id/edit', {
    preHandler: [app.guard.role('admin')],
    
    preSerialization: app.service.audits,

    config: { name: 'edit_user' }
  }, 
  
  async (request, reply) => {
    if (request.body.password)
      request.body.password = app.bcrypt.encrypt(request.body.password)

    let [data] = await app.knex('users')
                          .update(request.body)
                          .where(request.params)
                          .returning('*')

    return reply.send(data)
  })

  app.get('/:id/show', async (request, reply) => {
    let [data] = await app.knex('users')
                          .where(request.params)

    return reply.send(data)
  })  

  app.delete('/:id/delete', {
    preHandler: [app.guard.role('admin')]
  },

  async (request, reply) => {
    await app.knex('users')
             .where(request.params)
             .delete()

    return reply.send(true)
  })
}
