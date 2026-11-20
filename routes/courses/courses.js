import formbody from "@fastify/formbody";
import yup from 'yup'
import reversePlugin from "../../plugins/reverse.js";

export default async function (app, opts) {
  let todo = ''
  await app.register(formbody)
 
  

  app.get('/',{ name: 'courses'}, (request, reply) => {
    const term = request.query.term || 'Введите запрос'
    const data = {todo, term}
   return reply.view("src/views/courses/courses_page", data)
  })

  app.post('/',  {
    
    attachValidation: true,
    schema: {
      body: yup.object({
        name: yup.string().min(2, "Имя должно быть не меньше двух символов"),
        email: yup.string().email(),
        password: yup.string().min(5),
        passwordConfirmation: yup.string().min(5),
      }),
    },
    validatorCompiler:
      ({ schema, method, url, httpPart }) =>
      (data) => {
        if (data.password !== data.passwordConfirmation) {
          return {
            error: Error("Password confirmation is not equal the password"),
          };
        }
        try {
          const result = schema.validateSync(data);
          return { value: result };
        } catch (e) {
          return { error: e };
        }
      },
  },(request, reply) => {
  const { name, email, password, passwordConfirmation } = request.body;

    if (request.validationError) {
      const body = {
        name,
        email,
        password,
        passwordConfirmation,
        error: request.validationError,
      };

      reply.view("src/views/courses/new_courses_page", body);
      return;
    }
    let body = {
      name,
      email,
      password,
    };

      todo = body
   return reply.redirect(app.reverse('courses'))
  })
}
