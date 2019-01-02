import Routes, * as nextRoutes from "next-routes";

//@ts-ignore
export const routes = nextRoutes() as Routes;
export const Router = routes.Router;
export const Link = routes.Link;

//buscar el linea y arreglar
// routes.add("repo", "/:owner/:repo");
routes.add("repo", "/:owner/:repo/:branch/:path*");
routes.add("default-repo", "/:owner/:repo", "repo");

// routes.add('blog', '/blog/:slug')
// routes.add('about', '/about-us/:foo(bar|baz)')
