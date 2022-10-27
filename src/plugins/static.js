'use strict'

const fp = require('fastify-plugin')

const path = require('path')

module.exports = fp(async (app) => {
  app.register(require('@fastify/static'), {
    root: path.resolve('public'),
    prefix: '/public'
  })
})