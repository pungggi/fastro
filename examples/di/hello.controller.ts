import { Controller, Get, Request } from "../../mod.ts";
@Controller({ prefix: "v1" })
class Hello {
  @Get()
  hello(req: Request) {
    req.send("hello");
  }

  @Get({ url: "/hi" })
  hi(req: Request) {
    req.send("hi");
  }
}
