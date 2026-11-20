const safeMethods = ["GET", "HEAD", "OPTIONS"];

const isSameOrigin = (req) => {
  const site = req.headers["sec-fetch-site"];

  if (site !== undefined) {
    return site === "same-origin" || site === "none";
  }

  const { origin } = req.headers;

  if (origin === undefined) {
    return true;
  }

  return URL.canParse(origin) && new URL(origin).host === req.headers.host;
};

export default  function (app, opts) {
 app.addHook("onRequest", async (req, res) => {
    if (safeMethods.includes(req.method) || isSameOrigin(req)) {
      return;
    }

    res.code(403);
    res.send("Cross-site request is not allowed");

    return res;
  });

  app.post('/', (request, reply) => {
    const name = request.body
    return reply.view('src/views/hello',name)
  })
}
