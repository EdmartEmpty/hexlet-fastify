import fp from "fastify-plugin";
import view from "@fastify/view";
import { Eta } from "eta";

export default fp(async (app) => {
  const eta = new Eta();
  const route = (name, params) => app.reverse(name, params);
  await app.register(view, {
        engine: { eta },
        defaultContext: {
          route,
        },
      });
});