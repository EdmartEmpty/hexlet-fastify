export default async function (app, opts) {
  app.get('/', async function (request, reply) {
    const name = request.query.name || 'World'
    return reply.view('src/views/hello',{name})
  })
}
