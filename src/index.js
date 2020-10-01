import dotenv from 'dotenv'
dotenv.config()

import express from 'express'

import DiscordRoute from './routes/discord.js'
import MatrixRoute from './routes/matrix.js'
import EmailRoute from './routes/email.js'

const port = 3000
const app = express()

async function bootstrap() {
  app.get('/', (request, response) => {
    response.redirect('https://github.com/neg4n/github-contact-badges/blob/master/README.md')
  })

  const discordRoute = new DiscordRoute()
  app.use(`/${discordRoute.name}`, discordRoute.register())

  const matrixRoute = new MatrixRoute()
  app.use(`/${matrixRoute.name}`, matrixRoute.register())

  const emailRoute = new EmailRoute()
  app.use(`/${emailRoute.name}`, emailRoute.register())

  app.listen(port, () => {
    console.log(`github-contact-badges listening at http://localhost:${port}`)
  })
}
bootstrap()
