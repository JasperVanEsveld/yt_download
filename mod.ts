export * from "./src/mod.ts";
import { main } from "./src/cli.ts";
import { startApp } from "./app.ts";

if ("webview" in window) {
  startApp();
} else if (import.meta.main) {
  await main();
}
