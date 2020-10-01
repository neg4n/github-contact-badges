export default function (request, response, next) {
  if (Object.keys(request.query).length === 0) {
    return response.status(400).send('No query provided')
  }

  switch (request.path) {
    case '/discord':
      const { manual, name, discriminator, id, padding } = request.query
      const manualBoolean = manual ? manual.toLocaleLowerCase() === 'true' : false
      if (manualBoolean) {
        if (!name || name.length > 32) {
          return response.status(400).send('Invalid name.')
        }
        if (!discriminator || discriminator.length > 4) {
          return response.status(400).send('Invalid discriminator')
        }
      } else {
        if (!id || id.length !== 18) {
          return response.status(400).send('Invalid ID.')
        }
        if (!padding || isNaN(+`${padding}`)) {
          return response.status(400).send('Padding is not a number.')
        }
      }
      break
  }

  next()
}
