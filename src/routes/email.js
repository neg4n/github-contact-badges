import express from 'express'
import Badge from '../badge.js'
import Utils from '../utilities.js'

export default class EmailRoute {
  constructor() {
    this.name = 'email'
    this.router_ = express.Router()
  }

  register() {
    this.router_.use(this.validation.bind(this))
    this.router_.get('/', this.handler.bind(this))
    return this.router_
  }

  async validation(request, response, next) {
    const { address, padding, cache } = request.query
    if (!address) {
      return response.status(400).send('Address is invalid')
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
    const { address, padding, cache } = request.query
    const badge = new Badge(Utils.readAsset('email.svg'), address, padding).build()
    response.type('image/svg+xml')
    response.setHeader('Cache-Control', `public, max-age=${cache || 3600}`)
    response.send(badge)
  }
}
