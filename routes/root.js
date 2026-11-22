export default  function (app) {
  const data = { arr:[1,2,3] }
  app.get('/', (request, reply) => reply.view("src/views/index",{ data }))
}
