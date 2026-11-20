export default async function (app, opts) {
  app.get('/', (request, reply) => {
   return reply.view("src/views/courses/new_courses_page")
  })

  
}
