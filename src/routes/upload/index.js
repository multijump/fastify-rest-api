'use strict'

const fs = require('fs')
const path = require('path')
const util = require('util')

const { pipeline } = require('stream')

const pump = util.promisify(pipeline)

module.exports = async (app) => {

  app.post('/', async (request, reply) => {

    let protocol = request.protocol
    let address = app.server.address().address
    let port = app.server.address().port

    let data = await request.file()
    await pump(data.file, fs.createWriteStream(path.resolve('public/uploads', data.filename)))

    return reply.send(`${protocol}://${address}:${port}/public/uploads/${data.filename}`)
  })
}
