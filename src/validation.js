export default function (request, response, next) {
  if (Object.keys(request.query).length === 0) {
    return response.status(400).send('No query provided')
  }

  switch (request.path) {
    case '/discord':
      const { id, padding } = request.query
      if (id && id.length !== 18) {
        return response.status(400).send('Invalid ID.')
      }
      if (padding && isNaN(+`${padding}`)) {
        return response.status(400).send('Padding is not a number.')
      }
      break
  }

  next()
}
