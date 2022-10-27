'use strict'

const fp = require('fastify-plugin')

module.exports = fp(async (app) => {
  app.register(require('fastify-nodemailer'), {
    host: '',
    port: 587,
    secure: false,
    auth: {
      user: '',
      pass: ''
    }
  })
})