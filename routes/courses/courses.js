import formbody from "@fastify/formbody";
import yup from 'yup'


const coursesStorage = [{title:'Enemy', text:'Test text', id: 1}]

export default async function (app) {
  
  
  await app.register(formbody)
 
  
app.get('/new',{ name: 'create_articul' }, (request, reply) => {
   return reply.view("src/views/courses/new_courses_page")
  })


  app.get('/',{ name: 'courses'}, (request, reply) => {
    const term = request.query.term

    if(term){
      const tryFindArticules = coursesStorage.find(courses => courses.title.includes(term)) 
      const data = {term, coursesStorage:[tryFindArticules]}
       return reply.view("src/views/courses/courses_page", data)
    }
    const data = { coursesStorage }

   return reply.view("src/views/courses/courses_page", data)
  })

  app.post('/',  {
    
    attachValidation: true,
    schema: {
      body: yup.object({
        title: yup.string().min(2, "Имя должно быть не меньше двух символов"),
        text: yup.string().min(10),
        id:  yup.number()
      }),
    },
    validatorCompiler:
      ({ schema }) =>
      (data) => {
       
        try {
          const result = schema.validateSync(data);
          return { value: result };
        } catch (e) {
          return { error: e };
        }
      },
  },(request, reply) => {
  const { title, text,id } = request.body;

    if (request.validationError) {
      const body = {
        title,
        text,
        id,
        error: request.validationError,
      };

      reply.view("src/views/courses/new_courses_page", body);
      return;
    }
    let body = {
      title,
      text,
      id,
    };

     coursesStorage.push(body)
   return reply.redirect(app.reverse('courses'))
  })

app.get('/:id',{name:'cours'},(req,res) =>{
        const courseId = req.params.id
       
        try {
             const cours = coursesStorage.find(cours => cours.id === Number(courseId))
             if(!cours){
              throw new Error(`no course, param id ${courseId}`)
             }

               return  res.view("src/views/courses/course_one_page",cours)
        } catch (error) {
               throw new Error(error.message, { cause: error })
        }
})


app.get('/:id/edit',(request,response) => {
     const courseId = request.params.id
        try {
             const cours = coursesStorage.find(cours => cours.id === Number(courseId))
             if(!cours){
              throw new Error(`no course, param id ${courseId}`)
             }

               return  response.view("src/views/courses/one_edit_page", cours)
        } catch (error) {
               throw new Error(error.message, { cause: error })
        }   
})
  
}
