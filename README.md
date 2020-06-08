![fastro][logo]

![ci][ci] ![deno][deno]

**Fastro** is web framework for developers who are obsessed with clean code, simplicity & performance.

It is inspired by [Express](https://expressjs.com/), [Fastify](https://www.fastify.io/) & [Nest](https://nestjs.com/).

```ts
import { Fastro } from "https://deno.land/x/fastro@v0.8.2/mod.ts";
const server = new Fastro();
server.get("/", (req) => req.send("root"));
await server.listen();
```

## Benchmarks
If performance is **really important** to you, here are the `Hello World` benchmark results. Check [this folder](https://github.com/fastrojs/fastro-server/tree/master/benchmarks) to see the details.

| Framework | Version | Router? | Avg Req |
| :-- | :-- | :--: | --: |
| [Deno http](https://github.com/fastrojs/fastro-server/blob/master/benchmarks/deno_http.ts) | 1.0.5 | &#10007; | [16337.2](https://github.com/fastrojs/fastro-server/blob/master/benchmarks/benchmark_deno.json) |
| [**Fastro**](https://github.com/fastrojs/fastro-server/blob/master/benchmarks/fastro.ts) | **0.8.2** | **&#10003;** | **[14228.8](https://github.com/fastrojs/fastro-server/blob/master/benchmarks/benchmark_fastro.json)**  |
| [Node http](https://github.com/fastrojs/fastro-server/blob/master/benchmarks/node_http.js) | 14.3.0 | &#10007; | [13849.4](https://github.com/fastrojs/fastro-server/blob/master/benchmarks/benchmark_node.json) |
| [Fastify](https://github.com/fastrojs/fastro-server/blob/master/benchmarks/fastify.js) | 2.14.1 | &#10003; | [12228.2](https://github.com/fastrojs/fastro-server/blob/master/benchmarks/benchmark_fastify.json) |
| [Abc](https://github.com/fastrojs/fastro-server/blob/master/benchmarks/abc.ts) | 1.0.0-rc10 | &#10003; | [11760](https://github.com/fastrojs/fastro-server/blob/master/benchmarks/benchmark_abc.json) |
| [Oak](https://github.com/fastrojs/fastro-server/blob/master/benchmarks/oak.ts) | 4.0.0 | &#10003; | [8440.1](https://github.com/fastrojs/fastro-server/blob/master/benchmarks/benchmark_oak.json) |
| [PHP](https://github.com/fastrojs/fastro-server/blob/master/benchmarks/index.php) | 7.3.11 | &#10007; | [6175.1](https://github.com/fastrojs/fastro-server/blob/master/benchmarks/benchmark_php.json) |
| [Express](https://github.com/fastrojs/fastro-server/blob/master/benchmarks/express.js) | 4.17.1 | &#10003; | [5451.3](https://github.com/fastrojs/fastro-server/blob/master/benchmarks/benchmark_express.json) |
| [Python Flask](https://github.com/fastrojs/fastro-server/blob/master/benchmarks/flask_app.py) | 1.1.2 | &#10003; | [509.6](https://github.com/fastrojs/fastro-server/blob/master/benchmarks/benchmark_flask.json) |


## How to use

This module uses the git release. If you want to pick a specific version, for example `0.8.2`, then the full url is [`https://deno.land/x/fastro@v0.8.2/mod.ts`](https://deno.land/x/fastro@v0.8.2/mod.ts). If you do not use the version, it will refer to `master` branch. Breaking changes may be made without warning.

## Middleware

You can add new properties or functions for specific URL to the default `request`. This is similar to the [express middleware](https://expressjs.com/en/guide/writing-middleware.html).
```ts
const middleware = (req: Request, done: Function) => {
  req.oke = () => req.send("oke");
  done();
};

server
  .use(middleware)
  .get("/", (req) => req.oke());
```

## Decorator

Another way to add a new property or function globally to the fastro instance and `request` object is to use a decorator. This is similar to the [fastify decorator](https://www.fastify.io/docs/latest/Decorators/).
```ts
server
  .decorate((instance) => instance.ok = "ok")
  .decorate((instance) => instance.hello = (payload: string) => payload)
  .decorateRequest((req) => req.oke = "oke request");

server
  .get("/", (req) => req.send(server.ok))
  .get("/hello", (req) => req.send(server.hello("hello")))
  .get("/oke", (req) => req.send(req.oke));
```

## Plugin
You can add new properties or functions to the fastro instance. You can also use all default instance functions, include decorator, create routes & middleware. This is similar to the [fastify plugin](https://www.fastify.io/docs/latest/Plugins/).
```ts
const routes = function (fastro: Fastro, done: Function) {
  fastro
    .get("/", (req) => req.send("root"))
    .post("/", (req) => req.send("post"))
    .put("/", (req) => req.send("put"))
    .delete("/", (req) => req.send("delete"));
  done();
};

server.register(routes);

```

## Depedency Injection
With depedency injection you can create complex applications with cleaner code. No longer need to manually import handlers and services. You only make a class and add [typescript decorator](https://www.typescriptlang.org/docs/handbook/decorators.html) to define `gateway`, `controller`, `service`  and `route`. Fastro will automatically load, register and create them for you. This is similar to [nest](https://nestjs.com/).

```ts
import { Controller, Get, Request } from "https://deno.land/x/fastro@v0.8.2/mod.ts";

@Controller()
class Greet {

  @Get()
  handler(req: Request) {
    req.send("root");
  }
}
```

## Examples

Check [this folder](https://github.com/fastrojs/fastro-server/tree/master/examples) to find out how to:
- [create hello world app](https://github.com/fastrojs/fastro-server/blob/master/examples/hello.ts)
- [change default port & add optional listen callback](https://github.com/fastrojs/fastro-server/blob/master/examples/main.ts#L34)
- [send simple text & json data](https://github.com/fastrojs/fastro-server/blob/master/examples/main.ts#L5)
- [get url parameters](https://github.com/fastrojs/fastro-server/blob/master/examples/main.ts#L20)
- [get payload from post method](https://github.com/fastrojs/fastro-server/blob/master/examples/main.ts#L30)
- [set custom http headers & status](https://github.com/fastrojs/fastro-server/blob/master/examples/main.ts#L9)
- [change the request object by creating a middleware](https://github.com/fastrojs/fastro-server/blob/master/examples/use_middleware.ts#L6)
- [create simple jwt auth](https://github.com/fastrojs/fastro-server/blob/master/examples/simple_jwt_auth.ts)
- [create middleware](https://github.com/fastrojs/fastro-server/blob/master/examples/middleware.ts)
- [create decorator to add new property](https://github.com/fastrojs/fastro-server/blob/master/examples/decorate.ts)
- [create router with plugin](https://github.com/fastrojs/fastro-server/blob/master/examples/plugin.ts)
- [create nested plugin](https://github.com/fastrojs/fastro-server/blob/master/examples/nested_plugin.ts)
- [create simple REST API](https://github.com/fastrojs/fastro-server/blob/master/examples/crud_postgres.ts)
- [create simple REST API with JWT](https://github.com/fastrojs/fastro-server/blob/master/examples/rest_api_jwt)
- [create dependency injection](https://github.com/fastrojs/fastro-server/blob/master/examples/di)

[logo]: https://repository-images.githubusercontent.com/264308713/3e9d0600-a974-11ea-9b0e-c4f1a85d98d9 "Fastro"
[ci]: https://github.com/fastrojs/fastro-server/workflows/ci/badge.svg "ci"
[deno]: https://img.shields.io/badge/deno-1.0.5-blue "deno"

