'use strict'

module.exports = async (app) => {

  app.post('/', async (request, reply) => {
    let { nodemailer } = app

    await nodemailer.sendMail({
      from: 'Fastify <email>',
      to: request.body.to,
      subject: request.body.subject,
      text: request.body.text
    })

    reply.send(true)
  })

}