import escape from 'escape-html'

export default async (app, options) => {
  app.get("/", (req, res) => {
    res.send("GET /users");
  });

  app.post("/", (req, res) => {
    const typeBody = typeof req.body
    res.send(`This my response : ${req.body.name}, & this age: ${req.body.age}, type of Body ${typeBody}`);
  });
  app.get("/:id/post/:postId", (req, res) => {
    const site = req.headers["sec-fetch-site"]
     const { origin } = req.headers;
     const safeParam = escape(req.params.id)
    res.send(`id:${safeParam}, postId:${req.params.postId}, ${site}, ${origin}`);
  });
};

