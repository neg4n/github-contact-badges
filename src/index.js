import dotenv from 'dotenv'
dotenv.config()
import { envVars } from './envVars.js'
import express from 'express'
import Discord from 'discord.js'
import Badge from './badge.js'
import Utils from './utils.js'

const port = 3001
const app = express()
const discordClient = new Discord.Client()

app.get('/', (request, response) => {
  response.redirect('https://github.com/neg4n/github-contact-badges/blob/master/README.md')
})

app.get('/discord', async (request, response) => {
  const { id, padding } = request.query
  const { username, discriminator } = await discordClient.users.fetch(id)

  const discordBadge = new Badge(
    Utils.readAsset('discord-logo-color.svg'),
    `${username}#${discriminator}`,
    padding
  ).build()

  response.type('image/svg+xml')
  response.send(discordBadge)
})

app.listen(port, () => {
  discordClient.login(envVars.DISCORD_TOKEN)
  console.log(`Example app listening at http://localhost:${port}`)
})
