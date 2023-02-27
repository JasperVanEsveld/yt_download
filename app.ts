import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import { getFormats } from "./mod.ts";

type Webview = {
  onMessage: (listener: (message: string) => void) => () => void;
  send: (message: string) => void;
};

export async function startApp() {
  listenToWebview();
  await startProxy();
}

function listenToWebview() {
  const webview: Webview = (window as any).webview;
  webview.onMessage(async (message) => {
    const { options, query } = JSON.parse(message);
    try {
      const formats = await getFormats(query, options);
      webview.send(formats[0].url);
    } catch {
      webview.send("error");
    }
  });
}

async function startProxy() {
  const router = new Router();
  router.get("/download", async (context) => {
    const url = context.request.url.searchParams.get("url")!;
    const youtube = await fetch(url);
    context.response.headers.set(
      "content-type",
      youtube.headers.get("content-type")!
    );
    context.response.headers.set(
      "content-length",
      youtube.headers.get("content-length")!
    );
    context.response.headers.set("content-disposition", "attachment");
    context.response.body = youtube.body;
  });

  const app = new Application();
  app.use(oakCors());
  app.use(router.routes());

  const port = 9339;
  console.log(`Served on port: ${port}`);
  try {
    await app.listen({ port });
  } catch {
    console.log("Already listening...");
  }
}
