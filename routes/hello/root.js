export default async function (app, opts) {
  app.get('/:id', async function (request, reply) {
    const name = request.query.name || 'World'
    return `Hello,${name}`
  })
}
