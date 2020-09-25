import dotenv from 'dotenv'
dotenv.config()

import { envVars } from './envVars.js'
import express from 'express'
import exphbs from 'express-handlebars'
import Discord from 'discord.js'
import Utils from './utils.js'

const port = 3001
const app = express()
const discordClient = new Discord.Client()

app.engine('handlebars', exphbs({}))
app.set('view engine', 'handlebars')

app.get('/discord', async (request, response) => {
  const { username, discriminator } = await discordClient.users.fetch(request.query.id)
  response.render('badge', {
    layout: false,
    // ------------
    type: 'Discord',
    padding: 8,
    icon: Utils.readAsset('discord-logo-color.svg'),
    label: `${username}#${discriminator}`,
  })
})

app.listen(port, () => {
  discordClient.login(envVars.DISCORD_TOKEN)
  console.log(`Example app listening at http://localhost:${port}`)
})
