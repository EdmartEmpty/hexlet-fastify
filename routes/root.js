export default  function (app, opts) {
  const data = {arr:[1,2,3]}
  app.get('/', (request, reply) => reply.view("src/views/index",data))
}
