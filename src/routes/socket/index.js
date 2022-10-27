'use strict'

module.exports = async (app) => {

  app.post('/', async (request, reply) => {
    app.io.emit('chat:0001', request.body.message)
    return reply.send('Mensagem enviada')
  })
}
