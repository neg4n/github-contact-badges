import dotenv from 'dotenv'
dotenv.config()
import { envVars } from './env-vars.js'
import express from 'express'
import validation from './validation.js'
import Discord from 'discord.js'
import Badge from './badge.js'
import Utils from './utilities.js'
import { once } from 'events'

const port = 3001
const app = express()
const discordClient = new Discord.Client()

app.use(validation)

app.get('/', (request, response) => {
  response.redirect('https://github.com/neg4n/github-contact-badges/blob/master/README.md')
})

app.get('/discord', async (request, response) => {
  const { id, padding } = request.query
  let userTag

  if (discordClient.readyAt === null) {
    discordClient.login(envVars.DISCORD_TOKEN)
    await once(discordClient, 'ready')
  }

  try {
    const { username, discriminator } = await discordClient.users.fetch(id)
    userTag = `${username}#${discriminator}`
  } catch (error) {
    return response.send('Discord user not found.')
  }

  const discordBadge = new Badge(
    Utils.readAsset('discord-logo-color.svg'),
    userTag,
    padding
  ).build()

  response.type('image/svg+xml')
  response.send(discordBadge)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
