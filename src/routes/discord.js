import express from 'express'
import discord from 'discord.js'
import { once } from 'events'
import { envVars } from '../env-vars.js'
import Badge from '../badge.js'
import Utils from '../utilities.js'

export default class DiscordRoute {
  constructor() {
    this.client_ = new discord.Client()
    this.name = 'discord'
    this.router_ = express.Router()
  }

  register() {
    this.router_.use(this.validation.bind(this))
    this.router_.get('/', this.handler.bind(this))
    return this.router_
  }

  async validation(request, response, next) {
    const { manual, tag, id, padding, cache } = request.query
    const manualBoolean = manual ? manual.toLocaleLowerCase() === 'true' : false
    if (manualBoolean) {
      if (!tag || tag.length > 39) {
        return response.status(400).send('Invalid tag.')
      }
    } else {
      if (!id || id.length !== 18) {
        return response.status(400).send('Invalid ID.')
      }
    }
    if (cache && +`${cache}` < 3600) {
      return response.status(400).send('Cache must be at least 3600')
    }
    if (padding && isNaN(+`${padding}`)) {
      return response.status(400).send('Padding is not a number.')
    }
    next()
  }

  async handler(request, response) {
    let userTag
    const { manual, tag, id, padding, cache } = request.query
    const manualBoolean = manual ? manual.toLocaleLowerCase() === 'true' : false

    if (manualBoolean) {
      userTag = tag
    } else {
      try {
        if (this.client_.readyAt === null) {
          this.client_.login(envVars.DISCORD_TOKEN)
          await once(this.client_, 'ready')
        }

        const { username, discriminator } = await this.client_.users.fetch(id)
        userTag = `${username}#${discriminator}`
      } catch (error) {
        console.error(error)
        return response.send('Discord user not found.')
      }
    }

    const badge = new Badge(Utils.readAsset('discord-logo-color.svg'), userTag, padding).build()

    response.type('image/svg+xml')
    response.setHeader('Cache-Control', `public, max-age=${cache || 3600}`)
    response.send(badge)
  }
}
