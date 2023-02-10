export * from "./src/mod.ts";
import { main } from "./src/cli.ts";

if (import.meta.main) {
  await main();
}
