export default async (app, options) => {
  app.get("/users", (req, res) => {
    res.send("GET /users");
  });

  app.post("/users", (req, res) => {
    res.send("POST /users");
  });
};
