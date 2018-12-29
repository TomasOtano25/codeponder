import Routes, * as nextRoutes from "next-routes";

//@ts-ignore
export const routes = nextRoutes() as Routes;

routes.add("repo", "/:owner/:repo");
// routes.add('blog', '/blog/:slug')
// routes.add('about', '/about-us/:foo(bar|baz)')
