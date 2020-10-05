import express from 'express'
import Badge from '../badge.js'
import Utils from '../utilities.js'

export default class MatrixRoute {
  constructor() {
    this.name = 'matrix'
    this.router_ = express.Router()
  }

  register() {
    this.router_.use(this.validation.bind(this))
    this.router_.get('/', this.handler.bind(this))
    return this.router_
  }

  async validation(request, response, next) {
    const { id, padding, cache } = request.query
    if (!id) {
      return response.status(400).send('Invalid id')
    }
    if (padding && isNaN(+`${padding}`)) {
      return response.status(400).send('Padding is not a number.')
    }
    if (cache && +`${cache}` < 3600) {
      return response.status(400).send('Cache must be at least 3600')
    }
    next()
  }

  async handler(request, response) {
    const { id, padding, cache } = request.query
    const badge = new Badge(Utils.readAsset('matrix-logo.svg'), id, padding).build()
    response.type('image/svg+xml')
    response.setHeader('Cache-Control', `public, max-age=${cache || 3600}`)
    response.send(badge)
  }
}
