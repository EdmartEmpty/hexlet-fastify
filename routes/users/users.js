export default async (app, options) => {
  app.get("/", (req, res) => {
    res.send("GET /users");
  });

  app.post("/", (req, res) => {
    res.send("POST /users");
  });
  app.get("/:id/post/:postId", (req, res) => {
    res.send(`id:${req.params.id}, postId:${req.params.postId}`);
  });
};

